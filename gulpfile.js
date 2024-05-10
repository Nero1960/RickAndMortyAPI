const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const min = require('gulp-imagemin');
const webp = require('gulp-webp');

function css () {
    return src('src/scss/**/*.scss')
            .pipe(sourcemaps.init())
                .pipe(sass())
                    .pipe(postcss([autoprefixer(), cssnano()]))
                        .pipe(sourcemaps.write('.'))
                            .pipe(dest('build/css'))
}   

function imagemin () {
    return src('src/img/**/*.{png,jpg}')
            .pipe(min({optimizationLevel : 3}))
                .pipe(dest('build/img'))
}

function imagewebp () {
    return src('src/img/**/*.{png,jpg}')
            .pipe(webp())
                .pipe(dest('build/img'))
}


function dev (){
    return watch('src/scss/**/*.scss', css);
}

exports.css = css;
exports.imagenes = series(imagemin, imagewebp);
exports.default = series(css, dev);
