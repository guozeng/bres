/**
 * artDialog
 * anthor: guoz
 * date: 2016-01-07
 * desc: 基于jquery.artDialog.js 库的对话框组件
 */
define(function(require, exports, module) {
	var artDialog = require('./artDialog/jquery.artDialog.source');
	
	(function(config) {
		config['path'] = seajs.imgroot + 'dialog';
	}(artDialog.defaults));

	module.exports = artDialog;

	artDialog.tip = function(msg, callback, closeTime) {
		this({
			id: 'cscTip',
			content: msg || '提示信息',
			fixed: true,
			title: false,
			icon: 'mem-w',
			time: closeTime || 1.5,
			close: callback || null
		});
	};

	artDialog.alert = function(msg, fun) {
		this({
			id: 'cscAlert',
			content: msg || '警告信息',
			fixed: true,
			title: false,
			icon: 'mem-w',
			ok: fun || null
		});
	};

	artDialog.confirm = function(msg, okFun, cancelFun) {
		this({
			id: 'cscConfirm',
			content: msg || '请确认操作？',
			fixed: true,
			title: false,
			icon: 'mem-w',
			ok: okFun || function() {},
			cancel: cancelFun || function() {}
		});
	};

	artDialog.error = function(msg, okfun, closeTime) {
		this({
			id: 'cscError',
			content: msg || '错误提示',
			fixed: true,
			title: false,
			icon: 'mem-e',
			ok: okfun || true,
			time: closeTime || 86400
		});
	};

	artDialog.success = function(msg, callback, closeTime) {
		this({
			id: 'cscSuccess',
			content: msg || '成功提示',
			fixed: true,
			title: false,
			icon: 'mem-c',
			time: closeTime || 1.5,
			close: callback || null
		});
	};

	artDialog.loading = function(msg) {
		var d = this({
			id: 'cscLoading',
			content: msg || '处理中……',
			fixed: true,
			lock: true,
			opacity: .3,
			title: false,
			icon: 'csc-loading',
			init: function() {
				$(this.DOM.close).hide();
				$(this.DOM.iconBg).css('background-image', 'url(' + this.config.path + '/skins/icons/csc-loading.gif)');
			},
			close: function () {
				$(this.DOM.close).show();
				$(this.DOM.iconBg).css('background-image', '');
			}
		});
		return d;
	};
});
