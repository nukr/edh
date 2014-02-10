module.exports = (grunt) ->

    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        watch:
            jade:
                files: ['public/views/**']
                options:
                    livereload: true
            coffeeNodejs:
                files: ['routes/**/*.coffee']
                tasks: ['coffee:nodejs']
                options:
                    spawn: false
                    livereload: true
            coffeeF2e:
                files: ['public/**/*.coffee']
                tasks: ['coffee:f2e']
                options:
                    spawn: false
                    livereload: true
            compass:
                files: ['public/sass/*.sass']
                tasks: ['compass']
                options:
                    spawn: false
                    livereload: true
        nodemon:
            dev:
                options:
                    file: 'app.js'
                    args: []
                    ignoredFiles: ['public/**']
                    watchedExtensions: ['js']
                    nodeArgs: ['--debug']
                    delayTime: 1
                    env:
                        PORT: 4000
                    cwd: __dirname
        compass:
            dist:
                options:
                    sassDir: 'public/sass'
                    cssDir: 'public/stylesheets'
        coffee:
            nodejs:
                files:
                    'routes/index.js': 'routes/index.coffee'
                    'routes/customer.js': 'routes/customer.coffee'
            f2e:
                files:
                    'public/javascripts/main.js': 'public/javascripts/main.coffee'
        concurrent:
            tasks: ['nodemon', 'watch']
            options:
                logConcurrentOutput: true

    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-compass')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.registerTask('default', ['compass', 'coffee', 'concurrent'])
