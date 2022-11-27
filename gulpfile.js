const { src, dest, watch, series, parallel } = require( "gulp" );

// CSS y SASS
const sass = require( "gulp-sass" )( require( "sass" ) );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( "autoprefixer" );

// IMAGENES
const imagemin = require( "gulp-imagemin" );
const webp = require( "gulp-webp" );

// Funcion que compila y guarda los cambios en el archivo
function css( done ) {
  // compilar sass
  // pasos: 1-Identificar archivo, 2-Compilarla, 3-Guardar el .css

  src( "src/scss/app.scss" )
    .pipe( sass() ) // {outputStyle: expanded}, compressed
    .pipe( postcss( [autoprefixer()] ) )
    .pipe( dest("build/css") );

  done();
}

function imagenes ( done ) {
  src( "src/img/**/*" )
    .pipe( imagemin({ optimizationLevel: 3 }) )
    .pipe( dest( "build/img" ) );

  done();
}

function versionWebp( done ) {
  src( "src/img/**/*.{png,jpg}" )
    .pipe( webp() )
    .pipe( dest( "build/img" ) );

  done();
}

// Funcion que esta a la escucha de los cambios
function dev() {
  watch( "src/scss/**/*.scss", css );
  watch( "src/img/**/*", imagenes );
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, css, dev );

// Series - Se inicia una tarea y hasta que finaliza se inicia la siguiente
// Parallel - Todas inician al mismo tiempo y se completan de forma diferente
