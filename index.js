
//
// Usage:
//
// 	browserify({ transform: ['reactify'] })
// 		.on('prebundle', define_modules( __dirname + '/src/', modules ))
//
//
// Let's say we're loading modules from ./src/modules.js then it would 
// look something like this:
//
// 		module.exports = [
// 			{
// 				path: 'lib',
// 				name: 'lib'
// 			},
// 			{
// 				path: 'engine',
// 				name: 'engine'
// 			},
// 			{
// 				path: 'game',
// 				name: 'game'
// 			}
// 		];
//
// You can then do things such as require('lib/merge') instead
// of require('../../../../lib/merge')
//

var gulp = require('gulp');

var define_modules = function (root, modules) {
	return function (bundler) {

		// Mapping
		// -------

		var mapping = [];
		for (var i in modules) {
			var module = modules[i];
			mapping.push({
				cwd: module['path'],
				dest: module['name'],
				src: '**/*.{js,node}'
			});
		}
		for (var i in mapping) {
			var module = mapping[i];
			var files = glob.sync(module['src'], {'cwd': root + module['cwd']});
			for (var j in files) {
				var file = root + module['cwd'] + '/' + files[j];
				bundler.require(file, {
					expose: module['dest'] + '/' + (files[j].replace(/(\.jsx?$|\/index\.node$)/, ''))
				});
			}
		}
	}
}

module.exports = define_modules;