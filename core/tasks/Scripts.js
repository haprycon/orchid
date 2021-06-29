import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import vinylSource from 'vinyl-source-stream';

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
      return browserify({
        entries: [`${source}/js/app.js`],
        debug: this.config.scriptsSourceMaps,
        transform: [
          babelify.configure({presets: ['@babel/preset-env']}),
        ],
      }).bundle()
          .pipe(vinylSource('app.js'))
          .pipe(gulp.dest(`${dest}/js`))
          .pipe(this.browserSync.reload());
    });
  }
}