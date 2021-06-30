import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

export default class SvgSpriteInline {
    constructor(config, browserSync) {
        this.config = config;
        this.browserSync = browserSync;
        this.init();
    }

    init() {
        this.setTask('svg-sprite-inline', this.config.src, this.config.tmp);
        this.setTask('svg-sprite-inline:build', this.config.src, this.config.dest);
    }

    setTask(name, source, dest) {
        gulp.task(name, () => {
            return gulp.src(`${source}/assets/svg-sprite-inline/**/*.svg`)
                .pipe(svgSprite({
                    mode: {
                        symbol: {
                            dest: '.',
                            example: false,
                            bust: false,
                            sprite: `${dest}/assets/svg-sprite/inline.svg`,
                            inline: false,
                            render: {
                                scss: {
                                    dest: `${source}/css/sprites/svg-sprite-inline.scss`,
                                    template: "./core/config/svg-sprite-inline.txt"
                                }
                            }
                        }
                    }
                }))
                .pipe(gulp.dest(`./`))
                .pipe(this.browserSync.reload())
        })
    }
}
