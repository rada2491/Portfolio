let gulp = require('gulp');
let gutil = require('gulp-util');
let sass = require('gulp-sass');
let webserver = require('gulp-webserver');
let path = require('path');
var uglify = require('gulp-uglify');
var pump = require('pump');

/* script task */
gulp.task('scripts', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/materialize-css/dist/js/materialize.min.js'])
    .pipe(gulp.dest('dist/js'))
})

/* Vendor Script task */
gulp.task('vendor-scripts', () => {
  return gulp.src('src/vendors/js/jquery.waypoints.min.js')
    .pipe(gulp.dest('dist/js/'))
})

/* Styles task */
gulp.task('styles', () => {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({
      includePaths: [
        path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
        path.join(__dirname, 'node_modules/materialize-css/sass'),
        path.join(__dirname, 'src/scss'),
        path.join(__dirname, 'node_modules/font-awesome')]
      , outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('dist/css/'))
})

/* Vendor Styles task */
gulp.task('vendor-styles', () => {
  return gulp.src('src/vendors/css/animate.css')
    .pipe(gulp.dest('dist/css/'))
})

/* HTML task */
gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
})

/* Assets task */
gulp.task('assets', () => {
  return gulp.src('assets/*.png')
    .pipe(gulp.dest('dist/img/'))
});

/* Font task */

gulp.task('font-awesome', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['styles'])
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('assets/*.png', ['assets'], cb => cb)
  gulp.watch('src/js/**/*.js', ['scripts'])
  gulp.watch('src/js/**/*.js', ['compress'])
})

gulp.task('server', () => {
  gulp.src('dist/')
    .pipe(webserver({
      livereload: true,
      open: true
    }))
})

/* Compress task */
gulp.task('compress', function (cb) {
  pump([
    gulp.src('src/js/**/*.js'),
    uglify(),
    gulp.dest('dist/js')
  ],
    cb
  );
});


gulp.task('build', [
  'html',
  'styles',
  'vendor-styles',
  'scripts',
  'vendor-scripts',
  'compress',
  'font-awesome',
  'assets',
  'server',
  'watch'
], cb => cb)

gulp.task('deploy', [
  'html',
  'styles',
  'vendor-styles',
  'scripts',
  'vendor-scripts',
  'compress',
  'font-awesome',
  'assets'
], cb => cb)