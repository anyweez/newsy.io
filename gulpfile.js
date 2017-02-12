const fs = require('fs');
const path = require('path');

const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');

const gulp = require('gulp');
const sass = require('gulp-sass');
const util = require('gulp-util');
const watch = require('gulp-watch');
const rollup = require('rollup-stream');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');
// const browser = require('gulp-browser');
const streamify = require('gulp-streamify');        // for gulp-uglify and gulp-babel
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const preprocess = require('gulp-preprocess');      // for inserting var into sass
const source = require('vinyl-source-stream');
const vueify = require('gulp-vueify');

gulp.task('default', ['html', 'css']);

gulp.task('html', () => {
    return gulp.src('index.html')
        // All components get injected at build time
        .pipe(inject(gulp.src('./js/components/*/*.html'), {
            starttag: '<!-- inject:components -->',
            transform(fp, file) { return file.contents.toString('utf8'); },
        }))
        .pipe(gulp.dest(`./public/`));
});

gulp.task('css', () => {
    return gulp.src('scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`./public/`));
});

gulp.task('js', ['components'], () => {
    return browserify({
        entries: './js/app.js',
        debug: true,
    })
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/'))
    // return gulp.src('./js/app.js')

    //     .pipe(browser.browserify())
    //     .pipe(gulp.dest('public/'));
    // return rollup({ entry: './js/app.js', format: 'es' })
    //     .pipe(source('app.js'))
    //     .pipe(streamify(babel({
    //         presets: ['es2015'],
    //     })))
    //     .pipe(gulp.dest(`public/`));
});

gulp.task('components', () => {
    return gulp.src('js/components/*.vue')
        .pipe(vueify())
        .pipe(gulp.dest('js/components/dist'));
})

gulp.task('images', () => {
    return gulp.src('images/*')
        .pipe(gulp.dest(`./public/img/`));
});

gulp.task('watch', ['default'], () => {
    watch('index.html', () => gulp.start('html'));

    // watch('js/components/*.vue', () => gulp.start('components'));

    watch('scss/*.scss', () => gulp.start('css'));
    watch('scss/*/*.scss', () => gulp.start('css'));

    // watch('js/*.js', () => gulp.start('js'));
    // watch('js/components/dist/*.js', () => gulp.start('js'));
});