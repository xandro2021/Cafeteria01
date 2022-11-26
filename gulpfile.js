const { src, dest, watch } = require( "gulp" );
const sass = require( "gulp-sass" )( require( "sass" ) );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( "autoprefixer" );

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

// Funcion que esta a la escucha de los cambios
function dev() {
  watch( "src/scss/app.scss", css );
}

exports.css = css;
exports.dev = dev;
