module.exports = (grunt) ->

    grunt.initConfig
        pkg: grunt.file.readJSON('package.json')
        concurrent:
            dev:
                tasks: ['nodemon', 'watch'],
                options:
                    logConcurrentOutput: true
        nodemon:
            dev:
                script: 'app.js'
        compass:
            dist:
                options:
                    sassDir: 'public/sass'
                    cssDir: 'public/stylesheets'
        coffee:
            compile:
                files:
                    'public/javascripts/main.js': 'public/javascripts/main.coffee'
                    'routes/index.js': 'routes/index.coffee'
                    'routes/customer.js': 'routes/customer.coffee'
        watch:
            coffeeCompile:
                files: ['**/*.coffee']
                tasks: ['coffee']
                options:
                    spawn: false
            compass:
                files: ['public/sass/*.sass']
                tasks: ['compass']
                options:
                    spawn: false
                    livereload: true

    grunt.loadNpmTasks('grunt-contrib-coffee')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-compass')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.registerTask('default', ['concurrent', 'nodemon', 'compass', 'coffee', 'watch'])
