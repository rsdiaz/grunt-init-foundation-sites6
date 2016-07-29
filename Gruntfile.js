module.exports = function(grunt) {
  // Proyect configuration
  grunt.initConfig({
    // Load package.json
    pkg: grunt.file.readJSON('package.json'),
    // Watch Configuration
    watch: {
    	grunt: {
    		files: ["Gruntfile.js"],
    		tasks: ["default"]
    	},

    	sass: {
    		files: "develop/scss/**/*.scss",
    		tasks: ["buildCss"]
    	},

      script: {
    		files: 'develop/js/**/*.js',
    		tasks: ['buildJs']
    	}
    },
    // Sass Configuration
    sass: {
      options: {
        loadPath: ['bower_components/foundation-sites/scss']
      },
      dist: {
        options: {
          sourcemap: 'none',
          style: 'nested'
        },
        files: [{
          expand: true,
          cwd: 'develop/scss',
          src: ['*.scss'],
          dest: 'dist/assets/css/',
          ext: '.css'
        }]
      }
    },
    // Configurate autoprefixer
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
            src: 'dist/assets/css/*.css'
        }
    },
    // Concatenate Configuration
    concat: {
      options: {
        separator: ';'
      },
      script: {
        src: [
          'bower_components/foundation-sites/js/foundation.core.js',
          // ...more foundation JS you might want to add
          // 'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
          // 'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
          // 'bower_components/foundation-sites/js/foundation.util.keyboard.js',
          // 'bower_components/foundation-sites/js/foundation.util.box.js',
          // 'bower_components/foundation-sites/js/foundation.util.nest.js',
          // 'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
          'develop/js/script.js'
        ],
        dest: 'dist/assets/js/script.js'
      }
    },
    // Babel Configuration
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'dist/assets/js/script.js': 'dist/assets/js/script.js'
        }
      }
    },
    // Uglify Configuration
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    	dist: {
    		files: {
    			'dist/assets/js/jquery.min.js': ['bower_components/jquery/dist/jquery.js'],
    			'dist/assets/js/script.min.js': ['dist/assets/js/script.js']
    		}
    	}
    }
  });
  // Load Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Register Grunt tasks
  grunt.registerTask('buildCss', ['sass', 'postcss']);
  grunt.registerTask('buildJs',  ['concat', 'babel', 'uglify']);
  grunt.registerTask('default',  ['buildCss', 'buildJs', 'watch']);
}
