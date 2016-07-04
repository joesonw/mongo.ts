'use strict';
const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('default', ['typescript']);

gulp.task('typescript', function() {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            module: 'commonjs',
            outDir: 'builds',
            target: 'ES6',
            experimentalDecorators: true,
		    emitDecoratorMetadata: true
        }))
        .pipe(gulp.dest('builds'))
});
