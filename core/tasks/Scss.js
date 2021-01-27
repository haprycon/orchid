import gulp from 'gulp';
import sass from 'gulp-sass';

export default class Scss {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    this.setTask('scss', this.config.src, this.config.tmp);
    this.setTask('scss:build', this.config.src, this.config.dest);
  }

  setTask(name, source, dest) {
    gulp.task(name, () => {
      return gulp.src(`${source}/css/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${dest}/css`))
        .pipe(this.browserSync.reload())
    })
  }
}