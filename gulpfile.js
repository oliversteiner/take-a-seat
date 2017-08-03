// require
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-debug');
var nano = require('gulp-cssnano');
var ts = require("gulp-typescript");
var merge = require('merge2');
var inject = require('gulp-inject');
var copy = require('copy');


// SASS
var input_sass = 'src/sass/**/*.scss';
var output_sass = 'web/css/';

var sassOptions = {
	errLogToConsole: true
	// outputStyle: 'expanded'
};


// Autoprefixer Optionen
var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


// Typescript
var input_ts = 'src/ts/**/*.ts';
var output_ts = 'web/js';
var output_tsd = 'web/definitions';

var tsProject = ts.createProject("tsconfig.json");

gulp.task('typescript', function () {
	var tsResult = gulp.src(input_ts)
		.pipe(sourcemaps.init()) // This means sourcemaps will be generated 
		.pipe(tsProject());

	return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
		tsResult.dts.pipe(gulp.dest(output_tsd)),
		tsResult.js.pipe(gulp.dest(output_ts))
	]);
});


// CSS
gulp.task('css', function () {
	return gulp.src(input_sass)
		.pipe(debug({title: 'nw-css:'}))
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(nano())
		.pipe(sourcemaps.write('./maps'))
		//  .pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(output_sass));
});


// HTML

var html_watch = './src/html/**/*.html';
var html_views = './src/html/views/**/*.html';
var html_panels = './src/html/panels/**/*.html';
var source_html = './src/html/index.html';
var output_html = './web';
var input_js_includes = ['web/js/**/*.js'];


gulp.task('html-inject', function () {

	// MAIN
	gulp.src(source_html)
	// Views
		.pipe(inject(
			gulp.src([html_views]), {
				starttag : '<!-- inject:{{path}} -->',
				relative : true,
				transform: function (filePath, file) {
					// return file contents as string
					return file.contents.toString('utf8')
				}
			}))
		// Panels
		.pipe(inject(
			gulp.src([html_panels]), {
				starttag : '<!-- inject-panel:{{path}} -->',
				relative : true,
				transform: function (filePath, file) {
					// return file contents as string
					return file.contents.toString('utf8')
				}
			}))
		// JS includes
		.pipe(inject(
			gulp.src(input_js_includes, {read: false}),
			{ignorePath: 'web/', addRootSlash: false})
		)
		.pipe(gulp.dest(output_html));


});

// Copy Images
var images_watch = './src/images/**/*';
var images_src = ['./src/images/**/*.{jpg,png,svg}'];
var images_dest = 'web/images';

gulp.task('copy-images', function (cb) {
	copy(images_src, images_dest, cb);
});


// Copy Data
var data_watch = './src/data/**/*';
var data_src = './src/data/**/*.json';
var data_dest = 'web/data';

gulp.task('copy-data', function (cb) {
	copy(data_src, data_dest, cb);
});



// Watch task
gulp.task('default', function () {
	gulp.watch(input_sass, ['css']);
	gulp.watch(input_ts, ['typescript']);
	gulp.watch(html_watch, ['html-inject']);
	gulp.watch(images_watch, ['copy-images']);
	gulp.watch(data_watch, ['copy-data']);

});