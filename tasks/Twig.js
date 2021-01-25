import gulp from 'gulp';
import twig from 'gulp-twig';

export default class Twig {
  constructor(config, browserSync) {
    this.init(config);
    this.browserSync = browserSync;
  }

  init(config) {
    this.setTask('twig', config.src, config.tmp);
    this.setTask('twig:build', config.src, config.dest);
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