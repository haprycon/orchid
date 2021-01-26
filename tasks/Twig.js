import gulp from 'gulp';
import twig from 'gulp-twig';

export default class Twig {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    this.setTask('twig', this.config.src, this.config.tmp);
    this.setTask('twig:build', this.config.src, this.config.dest);
  }

  setTask(name, source, dest) {
    gulp.task(name, () => {
      return gulp.src(`${source}/views/*.twig`)
        .pipe(twig(this.getData()))
        .pipe(gulp.dest(dest))
        .pipe(this.browserSync.reload())
    })
  }

  getData() {
    return {};
  }
}