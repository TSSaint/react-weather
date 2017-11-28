// define how/where tasks will be executed
// require modules

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

// formatting "readable" error messages
var notify = function(error){
  var message = 'ln: ';
  var title = 'Error: ';

  if(error.description){
    title += error.description;
  }
  else if(error.message){
    title += error.message;
  }

  if(error.lineNumber){
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({
    title: title,
    message: message });
};

// create a Browserify bundler
// add a transformer that takes JSX and reads in JS
// bundle into root of main.js

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle(){
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}
bundler.on('update', bundle);

// the bundler
gulp.task('build', function(){
  bundle()
});

// could use nodemon instead?
// setup a live reloading server
// checks compiled CSS + JS files before reloading
gulp.task('serve', function(done){
  gulp.src('')
    .pipe(server({
      livereload: {
          enable: true,
          filter: function(filePath, cb){
          if(/main.js/.test(filePath)){
            cb(true)
          }
          else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});

// look for changes in SASS
gulp.task('watch', function(){
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// run tasks in this order
gulp.task('default', ['build', 'serve', 'sass', 'watch']);