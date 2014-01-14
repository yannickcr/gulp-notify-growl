'use strict';

var
  fs      = require('fs'),
  gulp    = require('gulp'),
  notify  = require('gulp-notify'),
  growl   = require('./../lib/gulp-notify-growl.js')
;

var growlNotifier = growl({
  hostname: '192.168.0.10',
  icon    : fs.readFileSync(__dirname + '/doge.png')
});

gulp.task('default', function() {
  gulp.src('./package.json')
  .pipe(notify({
    title: 'Very gulp',
    message: 'Such notification. So growl. Wow',
    notifier: growlNotifier
  }));
});

gulp.run();
