(function () {
	var CSC = {};

	CSC.globals = {};
	CSC.globals.loadjs = function () {
		var srcs = '',
			map = {},
			urls = [],
			callbacks = [],
			isIE9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9.";
		function process (args) {
			var len = args.length, i = 0,
				temp;

			for (; i < len; i++) {
				temp = args[i];
				if (typeof temp === 'string') {
					if (!map[temp]) {
						urls.push(temp);
						map[temp] = true;
					} else {
						continue;
					}
				} else if (Object.prototype.toString.call(temp) === '[object Array]') {
					process(temp);
				} else if (typeof temp === 'function') {
					callbacks.push(temp);
				} else {
					continue;
				}
			}
		}
		function createScript (url) {
			var s = document.createElement('script');
			s.src = url;
			document.body.appendChild(s);
			function callback () {
				for (var i = 0, len = callbacks.length; i < len; i++) {
					callbacks[i].call(this);
				}
			}
			if (isIE9) {
				s.onreadystatechange = function () {
					if (this.readyState === 'loaded') {
						callback.call(CSC);
					} else if (this.readyState === 'complete') {
						this.onreadystatechange = null;
					}
				}
			} else {
				s.onreadystatechange = function () {
					if (this.readyState === 'loaded') {
						callback.call(CSC);
					} else if (this.readyState === 'complete') {
						this.onreadystatechange = null;
					}
				}
				s.onload = function () {
					callback.call(CSC);
				}
			}
		}
		process(arguments);
		for (var i = 0, len = urls.length; i < len; i++ ) {
			var temp = urls[i];
			// 1.别名形式 abc
			// 2.绝对路径形式 http://zcodes.com/***.js
			if ( /^[a-zA-Z_]+\w*$/.test(temp) ) {
				urls[i] = this.alias[temp] + this.main;
			} else if ( /^(\/)?.*\.js$/.test(temp) ) {
				urls[i] = /^\/?(.*\.js)$/.exec(temp)[1];
			} else {
				urls.splice(i, 1);
			}
		}
		createScript(this.host + urls.join(','));
	}
	CSC.globals.addCss = function (path) {
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }
	CSC.globals.host = '//zcodes.com/';
	CSC.globals.main = 'main.js';
	CSC.globals.alias = {
	}
	window.CSC = CSC;
})();