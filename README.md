This helper allows you to easily define path aliases in browserify.

Usage Example

```
npm i browserify-modules --save-dev
```

```
var browserify     = require('gulp-browserify');
var define_modules = require('browserify-modules');
var modules        = require('./src/modules.js');

gulp.task('game.js', function () {
	gulp.src('src/main.js')
		.pipe(browserify().on('prebundle', define_modules(__dirname + '/src/', modules)))
		.pipe(gulp.dest('./stage'));
});
```
Our `./src/module.js` could look like this,

```
module.exports = [
	{
		path: 'lib',
		name: 'lib'
	},
	{
		path: 'engine',
		name: 'engine'
	},
	{
		path: 'game',
		name: 'game'
	}
];
```

You can then do things such as `require('lib/merge')` from anywhere instead
of `require('../../../../lib/merge')`

If you try to load a directory, for example `require('lib/SomeDir')` browserify
will try to load `SomeDir/index.node`; the helper will take care of the details
required to make that happen.
