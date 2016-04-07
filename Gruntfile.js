module.exports = function(grunt) {
	var gruntOptions = {
		transport: {
			options: {
				debug: false
			}
		},
		concat: {},
		uglify: {
			options: {
				mangle: true
			},
			libscss: {
				src: 'libs/css/base.css',
				dest: 'libs/css/dist/base.min.css'
			}
		},
		clean: {},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'libs/css',
		      src: ['*.css', '!*.min.css'],
		      dest: 'libs/css/dist',
		      ext: '.min.css'
		    }]
		  }
		}
	};
	function createTarget (moduleName) {
		var transport = gruntOptions.transport;
		var concat = gruntOptions.concat;
		var uglify = gruntOptions.uglify;
		var clean = gruntOptions.clean;

		var path_dev = 'dev-modules/';
		var path_sea = 'sea-modules/';

		transport[moduleName] = {
			options: {
				idleading: path_sea + moduleName + '/'
			},
			files: [{
				expand: true,
				cwd: path_dev + moduleName,
				src: '**/*.js',
				dest: path_dev + moduleName + '/.temp/'
			}]
		};
		concat[moduleName] = {
			src: transport[moduleName].files[0].dest + '**/*.js',
			dest: path_dev+ moduleName +'/.ctemp/main.js'
		};
		uglify[moduleName] = {
			src: concat[moduleName].dest,
			dest: path_sea+ moduleName +'/main.js'
		};
		clean[moduleName] = [transport[moduleName].files[0].dest, path_dev + moduleName + '/.ctemp/'];
	}

	// 自动读取目录，添加目标
	createTarget('ajaxpage');
	createTarget('dialog');
	createTarget('ImgScrollor');
	createTarget('special');

	grunt.initConfig(gruntOptions);
 
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-cmd-transport");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['transport', 'concat', 'uglify', 'clean']);
	// grunt build:ajaxpage
	grunt.registerTask('build', function (name) {
		grunt.task.run('transport:' + name);
		grunt.task.run('concat:' + name);
		grunt.task.run('uglify:' + name);
		grunt.task.run('clean:' + name);
	});

	// 压缩 libs/css
	grunt.registerTask('libscss', function (name) {
		grunt.task.run('uglify:libscss');
	});
};