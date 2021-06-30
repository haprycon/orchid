import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

export default class SvgSprite {
    constructor(config, browserSync) {
        this.config = config;
        this.browserSync = browserSync;
        this.init();
    }

    init() {
        this.setTask('svg-sprite', this.config.src, this.config.tmp);
        this.setTask('svg-sprite:build', this.config.src, this.config.dest);
    }

    setTask(name, source, dest) {
        gulp.task(name, () => {
            return gulp.src(`${source}/assets/svg-sprite/**/*.svg`)
                .pipe(svgSprite({
                    mode: {
                        css: {
                            "spacing": {
                                "padding": 5
                            },
                            layout: "diagonal",
                            dest: ".",
                            sprite: `${dest}/assets/svg-sprite/sprite.svg`,
                            bust: false,
                            render: {
                                "scss": {
                                    "dest": `${source}/css/sprites/svg-sprite.scss`,
                                    "template": "./core/config/svg-sprite.txt"
                                }
                            }
                        },

                    }
                }))
                .pipe(gulp.dest(`./`))
                .pipe(this.browserSync.reload())
        })
    }
}
