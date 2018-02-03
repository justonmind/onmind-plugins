'use strict';

const	gulp					= require('gulp');
const	plumber				= require('gulp-plumber');
const	newer					= require('gulp-newer');
const	debug					= require('gulp-debug');
const	rename				= require('gulp-rename');
const	concat				= require('gulp-concat');
const stylus				= require('gulp-stylus');
const	pug						= require('gulp-pug');
const csso					= require('gulp-csso');
const uglify				= require('gulp-uglify');
const saveLicense 	= require('uglify-save-license')
const notify				= require('gulp-notify');
const autoprefixer 	= require('autoprefixer-stylus');
const browserSync 	= require('browser-sync').create();

const paths = {
	src: {
		assets: 	'assets/**/*',
		styl: [
							'src/stylus/**/*.styl',
							'!src/stylus/**/__*.styl'
					],
		js: 	[
							'src/javascript/head.js',
							'src/javascript/**/*.js',
							'src/javascript/foot.js',
							'!src/javascript/**/__*.js'
					],
		pug:	[
							'src/pug/*.pug',
							'!src/pug/__*.pug'
					]
	},
	dest: {
		build: 			'./build',
		assets: 		'./build',
		pug: 				'./build',
		css: 				'./build/css',
		js: 				'./build/js',

	},
	watch: {
		assets: 	'./assets/**/*.*',
		styl: 		'./src/stylus/**/*.styl',
		js: 			'./src/javascript/**/*.js',
		pug: 			'./src/pug/**/*.pug',
	}
};


//========================================
//==============TASKS=====================
//========================================

gulp.task('assets', () => {
	return gulp.src(paths.src.assets)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(newer(paths.dest.assets))
			.pipe(debug({title:'assets'}))
			.pipe(gulp.dest(paths.dest.assets));
});


gulp.task('css', () => {
	return gulp.src(paths.src.styl)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(stylus({use: [autoprefixer({browsers: ['last 4 versions']	})]}))
			.pipe(concat('styles.css'))
			.pipe(gulp.dest(paths.dest.css))
			.pipe(csso())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(paths.dest.css));
});


gulp.task('js', () => {
	return gulp.src(paths.src.js)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(concat('onmind.plugins.js'))
			.pipe(gulp.dest(paths.dest.js))
			.pipe(uglify({
					output: {
							comments: saveLicense
					}
				}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(paths.dest.js));
});

gulp.task('html', () => {
	return gulp.src(paths.src.pug)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(pug({pretty: true}))
			.pipe(gulp.dest(paths.dest.pug));
});

gulp.task('build', gulp.series('assets', 'css', 'js', 'html'));

gulp.task('watch', () => {
	gulp.watch(paths.watch.assets, gulp.series('assets'));
	gulp.watch(paths.watch.styl, gulp.series('css'));
	gulp.watch(paths.watch.js, gulp.series('js'));
	gulp.watch(paths.watch.pug, gulp.series('html'));
});


gulp.task('serve', () => {
	browserSync.init({
			server: 'build'
	});

	browserSync.watch('build/**/*.*')
		.on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
