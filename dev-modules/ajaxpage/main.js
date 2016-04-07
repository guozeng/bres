/**
 * ajaxpage
 * anthor: guoz
 * date: 2015-09-24
 * desc: 依赖 ./build/tpl
 */
define(function( require, exports, module ) {
	var tpl_render = require("./build/tpl");
	function _structure (page, totalPage, btnNum) {
		// 容错处理
		btnNum = btnNum < 5 ? 5 : btnNum;
		btnNum = btnNum > totalPage ? totalPage : btnNum;
		if (btnNum % 2 === 0) {
			btnNum += 1;
		};
		if (page > totalPage) {
			page = totalPage;
		};

		var i = 1,
			ret = [],
			btnNum1 = btnNum + 1;

		// 分页算法 
		// 5-5=0---4
		// 7-5=2---5
		// 9-5=4---6
		// 11-5=6---7
		// 13-5=8---8
		// 15-5=10---9
		if (totalPage < btnNum1) {
			for (; i <= totalPage; i++) {
				ret.push(i);
			}
			return ret;
		} else if (totalPage === btnNum1) {
			for (i = 1; i <= totalPage; i++) {
				if (totalPage - page > totalPage / 2) {
					if (i === totalPage - 1) {
						ret.push("span");
					} else {
						ret.push(i);
					}
				} else {
					if (i === 2) {
						ret.push("span");
					} else {
						ret.push(i);
					}
				}
			}
			return ret;
		} else if (totalPage > btnNum1) {
			var start = (btnNum-5)/2 + 4;

			if (page < start) {
				for (i = 1; i <= btnNum -1; i++) {
					ret.push(i);
				}
				ret.push("span");
				ret.push(totalPage);
			} else if (page > totalPage - start + 1) {
				ret.push(1);
				ret.push("span");
				for (i = totalPage - btnNum + 2 ; i <= totalPage; i++) {
					ret.push(i);
				};
			} else {
				ret.push(1);
				ret.push("span");
				for (i = page - (btnNum - 3) / 2; i <= page + (btnNum - 3) / 2; i++) {
					ret.push(i);
				};
				ret.push("span");
				ret.push(totalPage);
			}
			return ret;
		}
	}
	// 生成html
	function _createHtml (options) {
		var data = {
			page: options.currentPage,
			totalPage: options.totalPage,
			structure: _structure(options.currentPage, options.totalPage, options.btnNum),
			prevText: options.prevText,
			nextText: options.nextText,
			theme: options.theme,
			noNextShow: options.noNextShow
		}
		var html = tpl_render(data);
		return html;
	}
	function _render ($container, options) {
		$container.empty();
		$container.html( _createHtml(options) );
		if (typeof options.onPageChange === 'function') {
			options.onPageChange.call(this, options);
		}
	}
	// 调用方式：
	// ap('container1', totalPage, function () {});
	// ap({});
	function ajaxpage() {
		var args = arguments, len = args.length, i = 0;
		// 默认配置
		var options = {
			containerId: '',
			totalPage: 0,
			currentPage: 1,
			btnNum: 7,          // 分页按钮个数，需大于5且为奇数，若为偶数，自动+1
			prevText: "上一页",
			nextText: "下一页",
			theme: "classic",
			noNextShow: true,   // 第一页和最后一页时是否显示上一页或下一页按钮
			onPageChange: null
		};
		if (len === 0) {
			throw new Error('ajaxpage：请传入一个或多个参数');
		}
		if ( $.isPlainObject(args[0]) ) {
			options = $.extend(true, options, args[0]);
		} else {
			options.containerId = args[0];
			options.totalPage = args[1];
			options.onPageChange = args[2];
		}
		var $container = typeof options.containerId === 'string' ? $(document.getElementById(options.containerId)) : $(options.containerId);
		$container.bind('click', function(event) {
			var target = event.target;
			var title = $(target).attr("title");
			if (!title) {
				return false;
			}
			if (title === "prev") {
				if (options.currentPage === 1) {
					return false;
				} else {
					options.currentPage --;
					_render($container, options);
				}
			} else if (title === "next") {
				if (options.currentPage === options.totalPage) {
					return false;
				} else {
					options.currentPage ++;
					_render($container, options);
				}
			} else {
				var page = parseInt(title, 10);
				if (page !== options.currentPage){
					options.currentPage = page;
					_render($container, options);
				}
			}
		});
		_render($container, options);
	}
	module.exports = ajaxpage;
});