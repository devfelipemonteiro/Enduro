var gulp = require('gulp')
var watch = require('gulp-watch')
var spawn = require('child_process').spawn
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var url = require('url')
var fs = require('fs')
var bulkSass = require('gulp-sass-bulk-import');


// * ———————————————————————————————————————————————————————— * //
// * 	Kiska 7 Task
// * ———————————————————————————————————————————————————————— * //
gulp.task('kiska7', function() {
	watch([process.cwd() + '/pages/**/*.hbs', process.cwd() + '/components/**/*.hbs', process.cwd() + '/cms/*.js'], function() {
		spawn('anif', ['render'], {stdio: 'inherit'})
	})
});


// * ———————————————————————————————————————————————————————— * //
// * 	Browsersync Task
// * ———————————————————————————————————————————————————————— * //
gulp.task('browserSync', ['sass'], function() {

	browserSync.init({
		server: {
			baseDir: process.cwd() + '/_src',
			middleware: function(req, res, next) {
				if(!(req.url.indexOf('.')+1) && req.url.length > 3){
					req.url += '.html'
				}
				return next();
			},
		},
		ui: false,
		logLevel: 'silent',
		notify: false,
		logPrefix: 'K7'
	});

	gulp.watch(process.cwd() + '/_src/assets/css/**/*.scss', ['sass'])
	gulp.watch(process.cwd() + '/_src/**/*.html', browserSync.reload);
});


// * ———————————————————————————————————————————————————————— * //
// * 	Sass Task
// * ———————————————————————————————————————————————————————— * //
gulp.task('sass', function() {
	return gulp.src(process.cwd() + '/assets/css/*.scss')
		.pipe(bulkSass())
		.pipe(sass())
		.pipe(gulp.dest(process.cwd() + '/_src/assets/css'))
		.pipe(browserSync.stream());
});


// * ———————————————————————————————————————————————————————— * //
// * 	Default Task
// * ———————————————————————————————————————————————————————— * //
gulp.task('default', ['kiska7', 'sass', 'browserSync']);
