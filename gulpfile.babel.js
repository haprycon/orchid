import gulp from 'gulp';
import BrowserSync from './tasks/BrowserSync.js';
import Twig from './tasks/Twig.js';
import Watch from "./tasks/Watch";

let config = require('./config.json');
let browserSync = new BrowserSync(config.browserSync);

new Twig(config, browserSync);
new Watch(config);

gulp.task('dev', gulp.series(
  gulp.parallel('watch', 'server')
));