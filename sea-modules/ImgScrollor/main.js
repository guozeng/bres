!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},define("sea-modules/ImgScrollor/build/template",[],function(){return a})}(),define("sea-modules/ImgScrollor/build/tpl",["./template"],function(a){return a("./template")("tpl",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.imgScrollorId,e=b.$each,f=a.imgList,g=(a.v,a.i,a.target),h=a.scrollIndex,i=a.indexArr,j=a.prevNext,k="";return k+='<style id="imgScrollorStyleId"> .imgScrollor{position: relative;} .imgScrollorWrap{position: relative; overflow: hidden;} .imgScrollor-ul{padding: 0; position: absolute; left: 0; top: 0;} .imgScrollor-ul li{list-style: none; float: left;} .imgScrollor-ul a, .imgScrollor-ul img{display: block;} .imgScrollor-index{text-align: center; margin-top: 10px;} .imgScrollor-index a{display: inline-block; width: 12px; height: 12px; background: #ccc;margin: 0 5px;} .imgScrollor-index a.hover{background: #f00;} .imgScrollor-sw-btn{position: absolute;cursor: pointer;} .imgScrollor-sw-btn:hover{color: #000;} .imgScrollor-sw-btn-default{font-size: 30px; color: #333;} .imgScrollor-sw-btn-default:hover{color: #000;} .imgScrollor-prev{left: 0;} .imgScrollor-next{right: 0;} </style> <div class="imgScrollor" id="',k+=c(d),k+='"> <div class="imgScrollorWrap"> <ul class="imgScrollor-ul c"> ',e(f,function(a,b){k+=' <li><a href="',k+=c(a.href),k+='" data-index="',k+=c(b),k+='" target="',k+=c(g),k+='"><img src="',k+=c(a.imgUrl),k+='"></a></li> '}),k+=" </ul> </div> ",h&&(k+=' <div class="imgScrollor-index"> ',e(i,function(a,b){k+=" ",k+=0===b?' <a href="javascript:;" class="hover"></a> ':' <a href="javascript:;"></a> ',k+=" "}),k+=" </div> "),k+=" ",j&&(k+=' <span class="imgScrollor-sw-btn imgScrollor-sw-btn-default imgScrollor-prev iconfont">&#xe602;</span> <span class="imgScrollor-sw-btn imgScrollor-sw-btn-default imgScrollor-next iconfont">&#xe601;</span> '),k+=" </div> ",new String(k)})}),define("sea-modules/ImgScrollor/main",["./build/tpl","./build/template"],function(a,b,c){function d(a){a=a||{};var b=a.imgWidth||235,c=a.imgHeight||155,d=a.imgMargin||10,e=a.wrapPadding||30,f=a.displayImgNumber||4,g=f*(d+b),h=c,i=g,j=a.imgScrollorId||"imgScrollor"+(new Date).getTime(),k=a.animateTime||500;return{imgScrollorId:j,imgWidth:b,imgHeight:c,imgMargin:d,wrapPadding:e,displayImgNumber:f,_rootWidth:g,_rootHeight:h,_wrapWidth:i,animateTime:k,autoScroll:a.autoScroll||!0,interval:a.interval||3e3,scrollIndex:a.scrollIndex||!1,prevNext:a.prevNext||!0,prevNextClassName:a.prevNextClassName||null,target:a.target||"_blank",imgList:a.imgList||null,onClickImg:a.onClickImg||null}}function e(a,b){if($.isArray(b)?(this.imgList=b,this.options=d(),this.options.imgList=b):(this.options=d(b),this.imgList=b.imgList),null===this.imgList||0===this.imgList.length)throw new Error("图片数量为0");this.container=$(document.getElementById(a)),this.init(),this.setStyle(),this.scroll()}var f=a("./build/tpl");e.prototype={init:function(){var a=this.options.displayImgNumber,b=this.imgList.length;a>=b?(this.options.prevNext=!1,this.options.scrollIndex=!1,this.options.autoScroll=!1):a>b/2&&(this.options.scrollIndex=!1);for(var c=[],d=Math.ceil(b/a),e=0;d>e;e++)c.push(e);this.options.indexArr=c,this.options.totalPage=d;var g=f(this.options),h=g.indexOf("</style>")+8,i=g.substring(0,h),j=g.substring(h);null===document.getElementById("imgScrollorStyleId")&&$("head").append(i),this.container.html(j),this.DOM.rootDOM=$(document.getElementById(this.options.imgScrollorId)),this.DOM.scrollorWrap=this.DOM.rootDOM.find(".imgScrollorWrap"),this.DOM.scrollorUl=this.DOM.rootDOM.find(".imgScrollor-ul"),this.DOM.scrollorIndex=this.DOM.rootDOM.find(".imgScrollor-index"),this.DOM.scrollorPrev=this.DOM.rootDOM.find(".imgScrollor-prev"),this.DOM.scrollorNext=this.DOM.rootDOM.find(".imgScrollor-next");var k=this;this.DOM.scrollorUl.find("img").click(function(){var a=k.options.onClickImg;"function"==typeof a&&a.call(this,$(this).parent().data("index"))})},setStyle:function(){var a=this.DOM,b=this.options;a.rootDOM.css({paddingLeft:b.wrapPadding,paddingRight:b.wrapPadding,width:b._wrapWidth}),a.scrollorWrap.css({width:b._rootWidth,height:b._rootHeight}),a.scrollorUl.css({width:this.imgList.length*(b.imgWidth+b.imgMargin)}),a.scrollorUl.find("li").css({marginLeft:b.imgMargin/2,marginRight:b.imgMargin/2}),a.scrollorUl.find("img").css({width:b.imgWidth,height:b.imgHeight}),a.scrollorPrev.css({top:(b._rootHeight-a.scrollorPrev.outerHeight())/2}),a.scrollorNext.css({top:(b._rootHeight-a.scrollorNext.outerHeight())/2}),b.prevNextClassName&&(a.scrollorPrev.removeClass(".imgScrollor-sw-btn-default").addClass(b.prevNextClassName),a.scrollorNext.removeClass(".imgScrollor-sw-btn-default").addClass(b.prevNextClassName))},scroll:function(){function a(a,b){if(q)return!1;if(q=!0,1===a)b.animate({left:-d*e},f,function(){b.children().slice(0,e).appendTo(b),b.css("left",0),o++,o===p&&(o=0),c.scrollIndex&&m.children("a").removeClass("hover").eq(o).addClass("hover"),q=!1});else if(2===a){var i=b.clone();i.prependTo(g),i.css("width",d*h),i.css("top",0),i.css("left",-d*h),b.animate({left:d*e},f,function(){b.children().slice(-4).prependTo(b),b.css("left",0),o--,-1===o&&(o=p-1),c.scrollIndex&&m.children("a").removeClass("hover").eq(o).addClass("hover"),q=!1}),i.animate({left:-d*h+d*e},f,function(){i.remove(),q=!1})}}function b(){r=setInterval(function(){a(1,i)},n)}var c=this.options,d=c.imgWidth+c.imgMargin,e=c.displayImgNumber,f=c.animateTime,g=this.DOM.scrollorWrap,h=this.imgList.length,i=this.DOM.scrollorUl,j=this.DOM.rootDOM,k=this.DOM.scrollorPrev,l=this.DOM.scrollorNext,m=this.DOM.scrollorIndex,n=c.interval,o=0,p=c.totalPage,q=!1,r=null;c.imgList.length/2<c.displayImgNumber&&(e=1),c.autoScroll&&(b(),j.hover(function(){clearInterval(r)},function(){b()})),c.prevNext&&(k.click(function(){a(2,i)}),l.click(function(){a(1,i)}))},DOM:{}},c.exports=e});