import gulp from 'gulp';

export default class Watch {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    gulp.task('watch', () => {
      gulp.watch(`${this.config.src}/views/**/*.twig`, gulp.series('twig'))
    });
  }
}