define(function (require, exports, module) {
	var Class = require('./Class');
	var Event = require('./Event');

	var BaseClass = Class.extend(Event,{
      init:function(config){
        //自动保存配置项
        this.__config = config
        this.bind()
        this.render()
      },
      //可以使用get来获取配置项
      get:function(key){
        return this.__config[key]
      },
      //可以使用set来设置配置项
      set:function(key,value){
        this.__config[key] = value
      },
      bind:function(){
      },
      render:function() {

      },
      //定义销毁的方法，一些收尾工作都应该在这里
      destroy:function(){
        //去掉所有的事件监听
        this.off()
      }
  });

  module.exports = BaseClass;
});