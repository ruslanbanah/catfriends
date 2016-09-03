var gulp = require('gulp');
var rename = require('gulp-rename');
var assets  = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

var config = {
  dist: 'dist/'
};

gulp.task('scripts', function() {
  return gulp.src(
      [
        'src/app/**/*.js'
      ])
      .on('error', notify.onError('<%= error.message %>'))
      .pipe(concat('main.js'))
      .pipe(rename({
              suffix: '.min'
          }))
      // .pipe(uglify())
      .pipe(gulp.dest(config.dist + 'app/'));
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
      .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function() {
  gulp.src('src/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        // outputStyle: 'compressed',
        // errLogToConsole: true
      }))
      .on('error', notify.onError('<%= error.message %>'))
      // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(rename({
        suffix: '.min'
      }))
      // .pipe(csso())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dist + '/app/css/'));
});

gulp.task('bower', function () {
  return gulp.src(mainBowerFiles({
        filter: '**/*.js',
        paths: {
          bowerDirectory: './bower_components',
          bowerJson: './bower.json'
        }
      }))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(config.dist + 'app/'));
});

gulp.task('bower:css', function() {
  gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/angular-loading-bar/src/loading-bar.css'
      ])
      .pipe(concat('vendor.css'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(config.dist + 'app/css/'));
});


gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: config.dist
    }
  });
  gulp.watch("app/**/*.js", ['scripts']);
  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("app/index.html", ['copy']);
  gulp.watch("bower.json", ['bower']);

  gulp.watch(config.dist + '**').on("change", browserSync.reload);
});


gulp.task('default', ['scripts', 'sass', 'copy', 'bower', 'bower:css', 'browser-sync']);