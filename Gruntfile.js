module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            std: {
                options: {
                    appDir: "www",
                    baseUrl: 'js',
                    mainConfigFile: "www/js/main.js",
                    dir: 'www-built',
                }
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['www/bower_components']
                },
                files: {
                    'www/css/app.css': 'www/sass/app.scss'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                nomen: true,
                globals: {
                    define: true,
                    requirejs: true,
                    require: true
                }
            },
            all: ['www/js/**/*.js']
        },
        
        clean: ["www/css", "www-built"]
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-requirejs');


    grunt.registerTask('build', ['clean', 'sass', 'requirejs']);
    grunt.registerTask('default', ['jshint']);
}

/*


*/