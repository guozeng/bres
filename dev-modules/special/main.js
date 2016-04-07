define(function(require, exports, module){
	var isLogin = require('./isLogin');
	var home = require('./sethome');
	var ph = require('./placeholder');
	var search = require('./search');

	module.exports = {
		isLogin: isLogin,
		setHome: home.setHome,
		addFav: home.addFav,
		placeholder: ph.placeholder,
		search: search.search,
		searchType: search.searchType
	}
})