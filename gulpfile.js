/*
* Dependencias
*/
var gulp    = require('gulp'),
  uglify    = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  changed = require('gulp-changed'),
  minifyHTML = require('gulp-minify-html'),
  stripDebug = require('gulp-strip-debug'),
  rename = require('gulp-rename');

/*
* Configuración de la tarea 'demo'
*/
 gulp.task('js', function () {
    gulp.src('./js/bundle.js')
        .pipe(stripDebug())
	.pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public/js'));   
 });


gulp.task('css',function(){
	gulp.src('./css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/css'));
 	gulp.src('./font-awesome-4.5.0/**/*.*')
    .pipe(gulp.dest('./public/font-awesome-4.5.0'));
});


gulp.task('images',function(){
    var imgSrc = './images/**/*',
        imgDst = './public/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(gulp.dest(imgDst));
    gulp.src('./css/search-white.png')
        .pipe(gulp.dest('./public/css'));
});

gulp.task('html',function(){
    var htmlSrc = './index.html',
        htmlDst = './public';

    gulp.src(htmlSrc)
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

gulp.task('default', ['css','images','html','js',]);
