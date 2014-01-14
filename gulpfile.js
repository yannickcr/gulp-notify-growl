'use strict';

var
  fs      = require('fs'),
  gulp    = require('gulp'),
  notify  = require('gulp-notify'),
  growl   = require('./lib/gulp-notify-growl.js')
;

var growlNotifier = growl({
  hostname: '192.168.0.10',
  icon    : fs.readFileSync(__dirname + '/lib/gulp.png')
});

gulp.task('default', function() {
  gulp.src('./package.json')
  .pipe(notify({
    title: 'Very glup',
    message: 'So notification',
    notifier: growlNotifier
  }));
});
