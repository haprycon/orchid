import gulp from 'gulp';
import BrowserSync from "./core/tasks/BrowserSync";
import Twig from "./core/tasks/Twig";
import Scss from "./core/tasks/Scss";
import Watch from "./core/tasks/Watch";
import Clean from "./core/tasks/Clean";
import Scripts from "./core/tasks/Scripts";

let config = require('./config.json');
let browserSync = new BrowserSync(config.browserSync);

new Twig(config, browserSync);
new Scss(config, browserSync);
new Scripts(config, browserSync);
new Watch(config);
new Clean(config);

gulp.task('dev', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('twig', 'scss', 'js'),
  gulp.parallel('watch', 'server'),
));