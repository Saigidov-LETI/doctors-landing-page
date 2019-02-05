'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss');

const paths = {
    image: {
        src: 'src/img/',
        dest: 'build/img/'
    },

    style: {
        src: 'src/scss/**/*.scss',
        dest: 'build/css/'
    },

    scripts: {
        src: 'src/js/',
        dest: 'build/js/'
    }
};

function fonts() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
}

function script() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest(paths.scripts.dest));
}

function scriptLib() {
    return gulp.src('src/js/libs/*')
        .pipe(gulp.dest(paths.scripts.dest));
}

function indexHtml() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));
}

function image() {
    return gulp.src(paths.image.src + '**/*.*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progessive: true,
            interlaced: true,
            removeViewBox:false,
            removeDimensions: false,
            removeComments:true,
            removeUselessStrokeAndFill:false,
            cleanupIDs:true
        }))
        .pipe(gulp.dest(paths.image.dest));
}

function styles() {
    // let processors = [
    //     autoprefixer({browsers: ['last 6 version']})
    // ];

    return gulp.src('src/scss/main.scss')
        .pipe(plumber())    
        .pipe(sass({outputStyle: 'expanded'}))
        // .pipe(postcss(processors))
        .pipe(gulp.dest(paths.style.dest));
}

function clean() {
    return del('build/');
}

function watch() {
    gulp.watch(paths.style.src, styles);
    // gulp.watch(paths.style.dest, styles);
}
  
function serve() {
    browserSync.init({
        
        server: {
            baseDir: "./",
            index: "src/index.html"
        }
    });
    // browserSync.watch('build/**/*.*', browserSync.reload);
    browserSync.watch('src/**/*.*', browserSync.reload);
}
  
exports.styles = styles;
exports.watch = watch;
exports.image = image;
exports.script = script;
exports.clean = clean;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, fonts, indexHtml, image, script, scriptLib),
    gulp.parallel(watch, serve)
));
  
