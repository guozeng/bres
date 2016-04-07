define(function(require, exports, module) {
    var tpl = require('./build/tpl');

    /**
     * 获取组件配置
     * @param  object options 用户自定义配置
     * @return object         合并后的自定义配置和默认配置
     */
    function getDefaultsOptions (options) {
      options = options || {};
      var imgWidth = options.imgWidth || 235,
          imgHeight = options.imgHeight || 155,
          imgMargin = options.imgMargin || 10,
          wrapPadding = options.wrapPadding || 30,
          displayImgNumber = options.displayImgNumber || 4,
          rootWidth = displayImgNumber * (imgMargin + imgWidth),
          rootHeight = imgHeight,
          wrapWidth = rootWidth,
          imgScrollorId = options.imgScrollorId || "imgScrollor" + new Date().getTime(),
          animateTime = options.animateTime || 500;

      return {
        imgScrollorId: imgScrollorId,  // 默认id
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        imgMargin: imgMargin,
        wrapPadding: wrapPadding,
        displayImgNumber: displayImgNumber,
        _rootWidth: rootWidth,   
        _rootHeight: rootHeight,
        _wrapWidth: wrapWidth,
        animateTime: animateTime, // 滚动时间

        autoScroll: options.autoScroll || true,  // 是否自动滚动
        interval: options.interval || 3000,    // 时间间隔
        scrollIndex: options.scrollIndex || false,  // 导航按钮
        prevNext: options.prevNext || true,     // 上一页下一页
        prevNextClassName: options.prevNextClassName || null,  // 上一页下页按钮样式类
        target: options.target || '_blank',  // 新窗口打开链接
        imgList: options.imgList || [],      // imgList [{imgUrl: '', href: ''}, ...]
        onClickImg: options.onClickImg || null    // 点击图片callback
      };
    }
    /**
     * 图片滚动类
     * @param string container 图片滚动类html的父容器的ID，由调用者提供
     * @param object/array options   初始化图片滚动类的配置
     */
    function ImgScrollor (container, options) {
      // options 为数组时，表示是 imgList
      if ( $.isArray(options) ) {
        this.imgList = options;
        this.options = getDefaultsOptions();
        this.options.imgList = options;
      } else {
        this.options = getDefaultsOptions(options);
        this.imgList = this.options.imgList;
      }
      
      this.container = $(document.getElementById(container));

      // 判断container 中有没有定义图片列表的html，若有取html中定义的图片列表
      var imgs = this.container.find('a'),
          len = imgs.length,
          _this = this,
          imgWidth,
          imgHeight;
      if (len > 0) {
        imgs.each(function (index, el) {
          _this.imgList.push({
            href: el.href,
            imgUrl: el.children[0].src
          });
        });
        imgWidth = imgs[0].children[0].width || 0;
        imgHeight = imgs[0].children[0].height || 0;
        // 去img标签属性width 和height
        if (imgHeight != 0) {
          this.options.imgHeight = imgHeight;
        }
        if (imgWidth != 0) {
          this.options.imgWidth = imgWidth;
        }
      }

      if (this.imgList === null || this.imgList.length === 0) {
        throw new Error('图片数量为0');
      }
      // process
      this.init();
      this.setStyle();
      this.scroll();
    }
    ImgScrollor.prototype = {
      init: function () {
        var displayImgNumber = this.options.displayImgNumber;
        var imgListLength = this.imgList.length;
        // displayImgNumber >= imgList.length
        if (imgListLength <= displayImgNumber) {
          this.options.prevNext = false;
          this.options.scrollIndex = false;
          this.options.autoScroll = false;
        } else if (imgListLength / 2 < displayImgNumber) {  // 图片数量少，不出现 scrollIndex
          this.options.scrollIndex = false;
        }
        // setup scrollorIndex
        var indexArr = [];
        var page = Math.ceil( imgListLength / displayImgNumber );
        for (var i = 0; i < page; i ++) {
          indexArr.push(i);
        }
        this.options.indexArr = indexArr;
        this.options.totalPage = page;
        
        // ===========================================
        var html = tpl(this.options);
        var spIndex = html.indexOf('</style>') + 8;
        var styleStr = html.substring(0, spIndex);
        var rawHtml = html.substring(spIndex);

        // 创建多个ImgScrollor对象时，style标签只插入一次
        if (document.getElementById('imgScrollorStyleId') === null) {
          $('head').append(styleStr);
        }
        this.container.empty().html(rawHtml);

        // create DOM
        this.DOM.rootDOM = $(document.getElementById( this.options.imgScrollorId ));
        this.DOM.scrollorWrap = this.DOM.rootDOM.find('.imgScrollorWrap');
        this.DOM.scrollorUl = this.DOM.rootDOM.find('.imgScrollor-ul');
        this.DOM.scrollorIndex = this.DOM.rootDOM.find('.imgScrollor-index');
        this.DOM.scrollorPrev = this.DOM.rootDOM.find('.imgScrollor-prev');
        this.DOM.scrollorNext = this.DOM.rootDOM.find('.imgScrollor-next');

        // event
        var _this = this;
        this.DOM.scrollorUl.find('img').click(function () {
          var callback = _this.options.onClickImg;
          if (typeof callback === 'function') {
            callback.call(this, $(this).parent().data('index'));
          }
        });
      },
      setStyle: function () {
        var DOM = this.DOM;
        var opt = this.options;
        DOM.rootDOM.css({
          paddingLeft: opt.wrapPadding,
          paddingRight: opt.wrapPadding,
          width: opt._wrapWidth
        });
        DOM.scrollorWrap.css({
          width: opt._rootWidth,
          height: opt._rootHeight
        });
        DOM.scrollorUl.css({
          width: this.imgList.length * (opt.imgWidth + opt.imgMargin)
        });
        DOM.scrollorUl.find('li').css({
          marginLeft: opt.imgMargin / 2,
          marginRight: opt.imgMargin / 2
        });
        DOM.scrollorUl.find('img').css({
          width: opt.imgWidth,
          height: opt.imgHeight
        });
        DOM.scrollorPrev.css({
          top: (opt._rootHeight - DOM.scrollorPrev.outerHeight()) / 2
        });
        DOM.scrollorNext.css({
          top: (opt._rootHeight - DOM.scrollorNext.outerHeight()) / 2
        });
        if (opt.prevNextClassName) {
          DOM.scrollorPrev.removeClass('.imgScrollor-sw-btn-default').addClass(opt.prevNextClassName);
          DOM.scrollorNext.removeClass('.imgScrollor-sw-btn-default').addClass(opt.prevNextClassName);
        }
      },
      scroll: function () {
        var options = this.options;
        var itemWidth = options.imgWidth + options.imgMargin;
        var num = options.displayImgNumber;
        var animateTime = options.animateTime;
        var scrollWrap = this.DOM.scrollorWrap;
        var itemLen = this.imgList.length;
        var scrollUl = this.DOM.scrollorUl;
        var rootDOM = this.DOM.rootDOM;
        var scrollorPrev = this.DOM.scrollorPrev;
        var scrollorNext = this.DOM.scrollorNext;
        var scrollorIndex = this.DOM.scrollorIndex;
        var interval = options.interval;
        var current = 0;
        var page = options.totalPage;
        var animating = false;  
        function scroll ( fx, ul ) {
          if (animating) {
            return false;
          }
          animating = true;

          if ( fx === 1) { // next
            ul.animate({
              left: - itemWidth * num
            }, animateTime, function () {
              ul.children().slice(0, num).appendTo( ul );
              ul.css("left", 0);
              current ++;
              if (current === page) {
                current = 0;
              }
              if (options.scrollIndex) {
                scrollorIndex.children('a').removeClass('hover').eq(current).addClass('hover');
              }
              animating = false;
            });
          } else if ( fx === 2 ) { // prev
            var clone = ul.clone();
            clone.prependTo( scrollWrap );
            clone.css("width", itemWidth * itemLen);
            clone.css("top", 0);
            clone.css("left", - itemWidth * itemLen);

            ul.animate({
              left: itemWidth * num
            }, animateTime, function () {
              ul.children().slice(-4).prependTo( ul );
              ul.css("left", 0);

              current --;
              if (current === -1) {
                current = page - 1;
              }
              if (options.scrollIndex) {
                scrollorIndex.children('a').removeClass('hover').eq(current).addClass('hover');
              }
              animating = false;
            });
            clone.animate({
              left: - itemWidth * itemLen + itemWidth * num
            }, animateTime, function () {
              clone.remove();
              animating = false;
            });
          }
        }
        var timer = null;
        function setTimer () {
          timer = setInterval(function () {
            scroll(1, scrollUl);
          }, interval);
        }
        // 图片数量少，1张张滚动
        if (options.imgList.length / 2 < options.displayImgNumber) {
          num = 1;
        }
        // 自动滚动
        if (options.autoScroll) {
          setTimer();
          rootDOM.hover(function (){
            clearInterval(timer);
          }, function (){
            setTimer();
          });
        }
        if (options.prevNext) {
          scrollorPrev.click(function () {
            scroll(2, scrollUl);
          });
          scrollorNext.click(function () {
            scroll(1, scrollUl);
          });
        }
      },
      DOM: {}
    }
    module.exports = ImgScrollor;
});