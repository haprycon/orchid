import gulp from 'gulp';
import babel from 'gulp-babel';

export default class Scripts {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    this.setTask('js', this.config.src, this.config.tmp);
    this.setTask('js:build', this.config.src, this.config.dest);
  }

  setTask(name, source, dest) {
    gulp.task(name, () => {
      return gulp.src(`${source}/js/*.js`)
        .pipe(babel({
          presets: ['@babel/env'],
        }))
        .pipe(gulp.dest(`${dest}/js`))
        .pipe(this.browserSync.reload());
    });
  }


}