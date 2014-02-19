# gulp-notify-growl

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][deps-image]][deps-url] [![Coverage Status][coverage-image]][coverage-url] [![Code Climate][climate-image]][climate-url]

A custom notifier for [gulp-notify](https://github.com/mikaelbr/gulp-notify) to send messages to Growl clients using GNTP.

![](http://i.imgur.com/ZX3BczG.png) ![](http://i.imgur.com/gaZwwbt.png)

# Installation

    $ npm install gulp-notify-growl --save-dev

# Usage

In your `gulpfile.js`:

```javascript
var
  gulp  = require('gulp'),
  growl = require('gulp-notify-growl')
;

// Initialize the notifier
var growlNotifier = growl({
  hostname : '192.168.0.10' // IP or Hostname to notify, default to localhost
});

gulp.task('default', function() {
  gulp.src('./package.json')
  .pipe(growlNotifier({
    title: 'Done.',
    message: 'Done something with the package.json'
  }));
});
```

## Options

### hostname

Type: `String`

IP or Hostname to notify, default to `localhost`.

### port

Type: `Number`

GNTP port, default to `23053`.

### timeout

Type: `Number`

Socket inactivity timeout, default to `5000`.

### Icon

Type: `Buffer`

Icon to display in the notification, default to the [gulp icon](lib/gulp.png).

#### Example

```javascript
var growlNotifier = growl({
  hostname : '192.168.0.10',
  icon : fs.readFileSync('doge.png')
});
```

### additionalHeaders

Type: `Object`

Additional GNTP headers sent on all requests.

#### Example

```javascript
var growlNotifier = growl({
  hostname : '192.168.0.10',
  additionalHeaders: {
    'X-Foo': 'bar'
  }
});
```

### password

Type: `String`

Password is set in the Growl client settings.

### hashAlgorithm

Type: `String`

Hash algorithm when sending the messages, possible values: `MD5`, `SHA1`, `SHA256` and `SHA512`. Default to `SHA256`.

### encryption

Type: `String`

Encryption used when sending the messages, possible values: `AES`, `DES` and `3DES`. Default to no encryption.

### appName

Type: `String`

Second argument for custom application name registered in growl.
Allows for multiple growlNotifiers with different application names.

#### Example

```javascript
var growlPHPUnitNotifier = growl({
  hostname : '192.168.0.10',
  icon : fs.readFileSync('doge.png')
}, 'Very Unit!');

var growlSassNotifier = growl({
  hostname : '192.168.0.10',
  icon : fs.readFileSync('doge.png')
}, 'Many Sass!');
```

# License

gulp-notify-growl is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[npm-url]: https://npmjs.org/package/gulp-notify-growl
[npm-image]: https://badge.fury.io/js/gulp-notify-growl.png

[travis-url]: https://travis-ci.org/yannickcr/gulp-notify-growl
[travis-image]: https://travis-ci.org/yannickcr/gulp-notify-growl.png?branch=master

[deps-url]: https://gemnasium.com/yannickcr/gulp-notify-growl
[deps-image]: https://gemnasium.com/yannickcr/gulp-notify-growl.png

[coverage-url]: https://coveralls.io/r/yannickcr/gulp-notify-growl?branch=master
[coverage-image]: https://coveralls.io/repos/yannickcr/gulp-notify-growl/badge.png?branch=master

[climate-url]: https://codeclimate.com/github/yannickcr/gulp-notify-growl
[climate-image]: https://codeclimate.com/github/yannickcr/gulp-notify-growl.png
