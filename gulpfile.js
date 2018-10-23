// const gulp = require('gulp'),
//   prettyError = require('gulp-prettyerror'),
//   sass = require('gulp-sass'),
//   autoprefixer = require('gulp-autoprefixer'),
//   rename = require('gulp-rename'),
//   cssnano = require('gulp-cssnano'),
//   uglify = require('gulp-uglify-es').default,
//   eslint = require('gulp-eslint');
  
//   var browserSync = require('browser-sync').create();

// // Create basic Gulp tasks

// gulp.task('sass', function(done) {
//   gulp
//     .src('./sass/style.scss', { sourcemaps: true })
//     .pipe(prettyError())
//     .pipe(sass())
//     .pipe(
//       autoprefixer({
//         browsers: ['last 2 versions']
//       })
//     )
//     .pipe(gulp.dest('./build/css'))
//     .pipe(cssnano())
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest('./build/css'));

  
//   done();
// });

// gulp.task('lint', function() {
//   return (gulp
//       .src(['./js/*.js'])
//       // Also need to use it here...
//       .pipe(prettyError())
//       .pipe(eslint())
//       .pipe(eslint.format())
//       .pipe(eslint.failAfterError()) );
// });

// gulp.task(
//   'script',
//   gulp.series('lint', function() {
//     return gulp
//       .src('./js/*.js')
//       .pipe(uglify())
//       .pipe(
//         rename({
//           extname: '.min.js'
//         })
//       )
//       .pipe(gulp.dest('./build/js'));
//   })
// );

// // Set-up BrowserSync and watch

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: './build'
//     }
//   });

//   gulp
//     .watch(['build/css/*.css', 'build/js/*.js'])
//     .on('change', browserSync.reload);
// });

// gulp.task('watch', function() {
//   gulp.watch('js/*.js', gulp.series('script'));
//   gulp.watch('sass/*.scss', gulp.series('sass'));
// });

// gulp.task('default', gulp.parallel('browser-sync', 'watch'));

const gulp = require("gulp"),
   rename = require("gulp-rename"),
   uglify = require("gulp-uglify-es").default,
   browserSync = require("browser-sync").create(),
   eslint = require("gulp-eslint"),
   prettyError = require("gulp-prettyerror"),
   sass = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer"),
   cssnano = require("gulp-cssnano");


gulp.task("sass", function(done) {
   gulp
       .src("./sass/style.scss", { sourcemaps: true })
       .pipe(prettyError())
       .pipe(sass())
       .pipe(
           autoprefixer({
               browsers: ["last 2 versions"]
           })
       )
       .pipe(gulp.dest("./build/css"))
       .pipe(cssnano())
       .pipe(rename("style.min.css"))
       .pipe(gulp.dest("./build/css"))
       .on("end", done);
});

gulp.task("eslint", function(done) {
   return gulp
       .src(["./js/*.js"])
       // Also need to use it here...
       .pipe(prettyError())
       .pipe(eslint())
       .pipe(eslint.format())
       .pipe(eslint.failAfterError())
       .on("end", done);
});

gulp.task("scripts", gulp.series("eslint", function() {
   return gulp
       .src("./js/*.js")
       .pipe(uglify())
       .pipe(
           rename({
               extname: ".min.js"
           })
       )
       .pipe(gulp.dest("./build/js"));
}));

// Set-up BrowserSync and watch

gulp.task("browser-sync", function() {
   browserSync.init({
       server: {
           baseDir: "./"
       }
   });

   gulp
       .watch(["build/css/*.css", "build/js/*.js"])
       .on("change", browserSync.reload);
});

gulp.task("watch", function() {
   gulp.watch("js/*.js", gulp.series("scripts"));
   gulp.watch("sass/**/*.scss", gulp.series("sass"));
});


gulp.task("build", gulp.parallel("scripts", "sass"));
gulp.task("default", gulp.series("build", gulp.parallel("browser-sync", "watch")));