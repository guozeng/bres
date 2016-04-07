(function() {
    // 兼容专题 file:协议打开
    seajs.host = location.protocol === 'https:' ? 'https://res.csc86.com/' : 'http://res.csc86.com/';
    seajs.imgroot = seajs.host + 'module-images/';

    if (location.href.indexOf('?cscdev') > 0) {
        seajs.env = '/g/dev-modules';
    } else {
        seajs.env = '/g/sea-modules';
    }
    var env = seajs.env + '/';

    // bres模块之间的依赖，必须基于 base
    // 别名只供外部程序调用，包内都用相当路径
    seajs.config({
        base: seajs.host,
        alias: {
            'jquery': 'g/libs/jquery/1.10.2/jquery.min',

            'ajaxpage': env + 'ajaxpage/main',
            'dialog': env + 'dialog/main',
            'ImgScrollor': env + 'ImgScrollor/main',
            'special': env + 'special/main',
            
            'end': '------------------------'
        },
        debug: 0,
        preload: [ !! window.$ ? '' : 'jquery']
    });

    /* 利用 map,批量更新时间戳是最方便的
    seajs.config({
      'map': [
        [ /^(.*\.(?:css|js))(.*)$/i, '$1?v=20150414' ]
      ]
    });	
    */
})();