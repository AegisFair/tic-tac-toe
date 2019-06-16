var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    del           = require('del');

gulp.task('sass', function(){
    return gulp.src('TicTacToe/app/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({prefix:'', suffix: '.min'}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss())
        .pipe(gulp.dest('TicTacToe/app/css'));
});
gulp.task('js', function(){
    del.sync('TicTacToe/app/js/scripts_main.min.js');
    return gulp.src([
        'TicTacToe/app/js/**/*.js'
    ])
    .pipe(concat('scripts_main.min.js'))
    .pipe(gulp.dest('TicTacToe/app/js'));
})

gulp.task('default', gulp.parallel('sass','js'));
gulp.task('deploy', async function(){
    del.sync('TicTacToe/dist');
    var deployCss = gulp.src('TicTacToe/app/css/tic_tac.min.css').pipe(gulp.dest('TicTacToe/dist/css')),
        deoloyJs = gulp.src('TicTacToe/app/js/scripts_main.min.js').pipe(gulp.dest('TicTacToe/dist/js'));
})