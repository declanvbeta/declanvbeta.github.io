'use strict';

var gulp = require('gulp'),
 	 concat = require('gulp-concat'),
 	 sass = require('gulp-sass'),
 	 child = require('child_process'),
 	 gutil = require('gulp-util'),
 	 browserSync = require('browser-sync').create(),
     uglify = require('gulp-uglify'),
	 sourcemaps = require('gulp-sourcemaps'),
     cache = require('gulp-cached'),
 	 siteRoot = '_site';


var assets = 'assets/',
	js = assets + 'js/',
	jsVendor = js + 'vendor/',
	allJs = js + '**/*.js',
	compiled = assets + 'compiled/',
	compiledJs = compiled + 'js/',
	css = assets + 'css/**/*.?(s)css';

var files = {
	source: {
		js: {
			vendor: [
				jsVendor + 'jquery-3.2.1.min.js',
			 	jsVendor + 'masonry.pkgd.min.js',
		 	 	jsVendor + 'photoswipe.min.js',
	 	 		jsVendor + 'photoswipe.min.js',
	 	 		jsVendor + 'photoswipe-ui-default.min.js',
	 	 		jsVendor + 'barba.min.js'
 	 		],
			custom: [
				js + 'gallery-custom.js',
				js + 'masonry-custom.js',
				js + 'scroll-into-view.js',
				js + 'page-transitions.js'
			],
			all: [
				jsVendor + 'jquery-3.2.1.min.js',
			 	jsVendor + 'masonry.pkgd.min.js',
		 	 	jsVendor + 'photoswipe.min.js',
	 	 		jsVendor + 'photoswipe.min.js',
	 	 		jsVendor + 'photoswipe-ui-default.min.js',
	 	 		jsVendor + 'barba.min.js',
				js + 'gallery-custom.js',
				js + 'masonry-custom.js',
				js + 'scroll-into-view.js',
				js + 'page-transitions.js'
			]
		}
	},
	dest: {
		js: siteRoot + '/' + js
	}
};



gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
});

gulp.task('watch', () => {
  gulp.watch(allJs, ['js']);	
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('css', () => {
  gulp.src(css)
  	.pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets'))
});


// Uglify the SVA JS files
gulp.task('js', function () {
  // return console.log('js dest: ', files.dest.js);
  return gulp.src(files.source.js.all)
      // .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('site.min.js'))
      // .pipe(cache('js'))
      .pipe(gulp.dest(compiledJs));
});

// Uglify the SVA JS files and sourcemap them
gulp.task('jsSourcemap', function () {
  return gulp.src(files.source.js.vendor, files.source.js.custom)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('site.min.js'))
      .pipe(cache('jsSourcemap'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(files.dest.js));
});

gulp.task('default', ['js', 'jekyll', 'serve', 'watch']);