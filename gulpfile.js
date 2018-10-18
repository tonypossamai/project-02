// Require Gulp first!
const gulp = require("gulp");
// This is a very basic Gulp task,
// with a name and some code to run
// when this task is called:
const uglify = require("gulp-uglify"),
  rename = require("gulp-rename");
gulp.task("default", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

gulp.watch(['index.html', 'build/css/*.css', 'css/*.css', 'build/js/*.js']).on('change', browserSync.reload);

});

const eslint = require('gulp-eslint');
 
gulp.task('lint', () => {
    return gulp.src(['./js/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});