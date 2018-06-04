var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var runsequence = require('run-sequence');
var browsersync = require('browser-sync').create();
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer')


gulp.task('sass', function(){

  return gulp.src('./css/main.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer())
  	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/'))
    .pipe(browsersync.stream());
});

gulp.task('browser-sync', function () {
    browsersync.init({
        port: 3002,
        server: {
          baseDir: './'
        }
    });
});

gulp.task('bundle-css', function () {
  return gulp.src(bundleConfig.bundle.main.styles)
    .pipe(cleanCSS({
      keepSpecialComments: 0
    }))
    .pipe(concat('./styles.css'))
    .pipe(gulp.dest('./css/'))
});

gulp.task('bundle-js', function () {
  gulp.src(bundleConfig.bundle.vendor.scripts)
    .pipe(babel({
      presets: ['es2015'],
      minified: true,
      compact: true,
      sourceMaps: true
    }))
    .pipe(concat('./vendors.js'))
    .pipe(gulp.dest('./js/'))

  gulp.src(bundleConfig.bundle.main.scripts)
    .pipe(babel({
      presets: ['es2015'],
      minified: true,
      compact: true,
      sourceMaps: true
    }))
    .pipe(concat('./main.js'))
    .pipe(gulp.dest('./js/'))
})

gulp.task('default', function() {
	runsequence('sass', 'browser-sync');

  gulp.watch('css/main.scss',['sass']);
  gulp.watch('index.html').on('change', browsersync.reload);
});
