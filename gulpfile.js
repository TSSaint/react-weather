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
