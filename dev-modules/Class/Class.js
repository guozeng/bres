define(function (require, exports, module) {
	var Class = (function () {
		var _mix = function (r, s) {
			for (var p in s) {
				if ( s.hasOwnProperty(p) ) {
					r[p] = s[p];
				}
			}
		}

		var _extend = function () {
			this.initPrototype = true;
			var prototype = new this();
			this.initPrototype = false;

			var items = Array.prototype.slice.call(arguments) || [];
			var item;
			/*for (var i = 0, len = items.length; i < len; i ++) {
				item = items[i];
				_mix(prototype, item.prototype || item);
			}*/
			// 参数可以是 Function or {}
			while ( item = items.shift() ) {
				_mix(prototype, item.prototype || item);
			}

			function Subclass () {
				if (!Subclass.initPrototype && this.init)
        			this.init.apply(this, arguments)//调用init真正的构造函数
			}

			Subclass.prototype = prototype;
			Subclass.prototype.constructor = Subclass;
			Subclass.extend = _extend;
			return Subclass;
		}

		function Class () {}
		Class.extend = _extend;

		return Class;
	})();

	module.exports = Class;
});