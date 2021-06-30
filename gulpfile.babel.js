import gulp from 'gulp';
import BrowserSync from "./core/tasks/BrowserSync";
import Twig from "./core/tasks/Twig";
import Scss from "./core/tasks/Scss";
import Watch from "./core/tasks/Watch";
import Clean from "./core/tasks/Clean";
import Scripts from "./core/tasks/Scripts";
import SvgSprite from "./core/tasks/SvgSprite";
import SvgSpriteInline from "./core/tasks/SvgSpriteInline";
import PngSprite from "./core/tasks/PngSprite";

let config = require('./config.json');
let browserSync = new BrowserSync(config.browserSync);

new Twig(config, browserSync);
new Scss(config, browserSync);
new Scripts(config, browserSync);
new Watch(config);
new Clean(config);
new SvgSprite(config, browserSync);
new SvgSpriteInline(config, browserSync);
new PngSprite(config, browserSync);

gulp.task('dev', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('svg-sprite', 'svg-sprite-inline', 'png-sprite'),
  gulp.parallel('twig', 'scss', 'scripts'),
  gulp.parallel('watch', 'server'),
));
