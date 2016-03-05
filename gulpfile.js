var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  precss = require('precss'),
  colorfunctions = require('postcss-color-function'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  gulpConcat = require('gulp-concat'),
  browserify = require('gulp-browserify'),
  minifyHTML = require('gulp-minify-html'),
  animation = require('postcss-animation'),
  gulpJade = require('gulp-jade'),


  source = 'process/',
  dest = 'builds/dest/';

  var env = "development";

gulp.task('jade', function() {
  gulp.src(source + 'jade/*.jade')
      .pipe(gulpJade())
      .on('error', gutil.log)
      .pipe(gulp.dest(dest));
});

gulp.task('css', function() {
  gulp.src(source + 'css/style.css')
  .pipe(postcss([
    autoprefixer(),
    colorfunctions(),
    precss()
  ]))
  .on('error', gutil.log)
  .pipe(gulp.dest(dest + 'css'));
});

gulp.task('js', function() {
  gulp.src(source + 'js/*.js')
    .pipe(gulpConcat('script.js'))
    .pipe(browserify())
    .on('error', gutil.log)
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(dest + 'js/'));
});

gulp.task('watch', function() {
  gulp.watch(source + 'css/**/*.css', ['css']);
  gulp.watch(source + 'jade/**/*.jade', ['jade']);
  gulp.watch(source + 'js/**/*.js', ['js']);
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('default', ['jade', 'css', 'webserver','watch']);
