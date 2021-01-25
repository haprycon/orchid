import gulp from 'gulp';
import browserSync from 'browser-sync'

export default class BrowserSync {
  constructor(config) {
    this.browserSync = browserSync.create();
    this.init(config);
  }

  init(config) {
    gulp.task('server', () => {
      this.browserSync.init(config)
    });
  }
}