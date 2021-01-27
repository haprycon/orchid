import gulp from 'gulp';
import twig from 'gulp-twig';
import fs from 'fs';
import Mock from './Mock';

export default class Twig {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.mock = new Mock();
    this.init();
  }

  init() {
    this.setTask('twig', this.config.src, this.config.tmp);
    this.setTask('twig:build', this.config.src, this.config.dest);
  }

  setTask(name, source, dest) {
    gulp.task(name, () => {
      return gulp.src(`${source}/views/*.twig`)
        .pipe(twig({
          debug: false,
          data: this.getData(),
          errorLogToConsole: true,
        }))
        .pipe(gulp.dest(dest))
        .pipe(this.browserSync.reload())
    })
  }

  getData() {
    return this.mock.getData(`${this.config.src}/mocks`);
  }
}