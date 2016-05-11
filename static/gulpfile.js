var gulp = require('gulp'),

// jade
    jade = require('gulp-jade'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    jadeInheritance = require('gulp-jade-inheritance'),
    filter = require('gulp-filter'),

// stylus
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    prefix = require('gulp-autoprefixer'),

// svg
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),

//sprite
    spritesmith = require('gulp.spritesmith'),

//clean
    clean = require('gulp-clean'),

    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    coffee = require('gulp-coffee'),
    header = require('gulp-header'),
    ngAnnotate = require('gulp-ng-annotate'),
    pkg = require('./package.json'),
    ngHtml2Js = require("gulp-ng-html2js"),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.homepage %>',
        ' * @version v<%= pkg.version %>',
        ' * @author <%= pkg.author %>',
        ' */',
        ''].join('\n');

// Set some defaults
var isDev = true;
var isProd = false;

// If "production" is passed from the command line then update the defaults
if (gutil.env.type === 'production') {
    isDev = false;
    isProd = true;
}

gulp.task('svgstore', function () {
    return gulp
        .src('source/assets/svg/*.svg')
        .pipe(gulpif(isProd, svgmin()))
        .pipe(svgstore())
        .pipe(gulp.dest('img/svg/'));
});

gulp.task('sprite', function () {
    return gulp
        .src('build/images/icons/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '../../../source/stylus/ui/sprite/sprite.styl',
            imgPath: '../images/sprite/sprite.png'
        }))
        .pipe(gulp.dest('build/images/sprite'));
});

gulp.task('stylus', function () {
    gulp.src(['source/stylus/*.styl'])
        .pipe(stylus())
        .pipe(prefix())
        .pipe(gulpif(isProd, csso()))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('jade', ['svgstore'], function() {
    gulp.src(['source/jade/**/**/*.jade'])
        .pipe(changed('html', {extension: '.html'}))
        .pipe(gulpif(global.isWatching, cached('jade')))
        .pipe(jadeInheritance({basedir: 'source/jade'}))
        .pipe(filter(function (file) {
            return !/partials/.test(file.path);
        }))
        .pipe(jade({
            pretty: true
        })
        .on('error', console.log))
        .pipe(gulp.dest('build'));
});

    gulp.task('setWatch', function () {
        global.isWatching = true;
    });

//gulp.task('angular-views-jade2html', function() {
//    return gulp.src(['source/coffee/**/**/**/*.jade'])
//        .pipe(jade({
//            pretty: true
//        }))
//        .pipe(gulp.dest('./views'));
//});

//gulp.task('angular-views-html2js', ['angular-views-jade2html'], function() {
//    //run task synchronously after angular-views-jade2html
//    gulp.src("views/**/**/**/*.html")
//        .pipe(ngHtml2Js({
//            moduleName: "app.templates",
//            prefix: "/static/views/"
//        }))
//        .pipe(concat("app-tpls.js"))
//        .pipe(gulpif(isProd, uglify()))
//        .pipe(gulp.dest("js"));
//});

    gulp.task('js-coffee', function () {
        gulp.src(['source/app/**/**/**/*.+(coffee|js)'])
            .pipe(gulpif(/[.]coffee$/, coffee())).on('error', console.log)
            .pipe(ngAnnotate())
            .pipe(gulpif(isProd, uglify({
                compress: {
                    drop_console: true
                }
            })))
            .pipe(concat('app.js'))
            .pipe(header(banner, {pkg: pkg}))
            .pipe(gulp.dest('build/js'));
    });

    gulp.task('webserver', function () {
        gulp.src('..')
            .pipe(webserver({
                //livereload: true,
                open: true,
                fallback: '/static/html/index.html',
                port: 8000
            }));
    });


    gulp.task('vendor', function () {
        gulp.src([
            // add some extend vendors, user `bower install vendor --save`
            //'vendor/jquery/jquery.min.js',
            //'vendor/zoom/zoomsl-3.0.js',
            //'vendor/jquery-ui/jquery-ui.js',
            //'vendor/slick/slick.min.js',
            //'vendor/social/social-likes.min.js',
            //'vendor/jquery.formstyler/index.js'
        ])
            .pipe(concat('app-common.js'))
            .pipe(gulpif(isProd, uglify({
                mangle: false,
                compress: {
                    drop_console: true
                }
            })))
            .pipe(gulp.dest('build/js'));
    });

    gulp.task('watch', function () {
        gulp.watch('source/app/**/**/**/*.+(js|coffee)', ['js-coffee']);
        gulp.watch('source/stylus/**/*.styl', ['stylus']);
        gulp.watch('source/jade/**/**/*.jade', ['setWatch', 'jade']);
        gulp.watch('source/assets/svg/*.svg', ['setWatch', 'jade']);
        gulp.watch('build/images/icons/*.png', ['setWatch', 'sprite']);
        //gulp.watch('source/coffee/**/**/**/*.jade', ['setWatch', 'angular-views-html2js']);
    });

    gulp.task('build', ['js-coffee', 'stylus', 'jade', /*'angular-views-html2js', 'vendor', */'sprite']);
    gulp.task('default', ['build', 'watch', 'webserver']);