import gulp from 'gulp';
import twig from 'gulp-twig';
import Mock from './Mock';
import TwigFunctions from "../helpers/TwigFunctions";
import TwigFilters from "../helpers/TwigFilters";

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
          functions: this.getClassFunctions((new TwigFunctions())),
          filters: this.getClassFunctions((new TwigFilters())),
        }))
        .pipe(gulp.dest(dest))
        .pipe(this.browserSync.reload())
    })
  }

  getData() {
    return this.mock.getData(`${this.config.src}/mocks`);
  }

  getClassFunctions(object) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(item => item !== 'constructor')
      .map(name => ({name: name, func: object[name]}));
  }
}