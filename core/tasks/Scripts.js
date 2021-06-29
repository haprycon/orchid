import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import vinylSource from 'vinyl-source-stream';
import glob from 'glob';
import path from 'path';

export default class Scripts {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    this.setTask('scripts', this.config.src, this.config.tmp);
    this.setTask('scripts:build', this.config.src, this.config.dest);
  }

  setTask(name, source, dest) {
    gulp.task(name, (done) => {
      let scripts = glob.sync(`${source}/scripts/*.js`);
      scripts.forEach((filepath) => {
        return browserify({
          entries: filepath,
          debug: this.config.scriptsSourceMaps,
          transform: [
            babelify.configure({presets: ['@babel/preset-env']}),
          ],
        }).bundle()
            .pipe(vinylSource(path.basename(filepath)))
            .pipe(gulp.dest(`${dest}/scripts`))
            .pipe(this.browserSync.reload());
      })

      done();
    });
  }
}
