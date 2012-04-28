// Volume ratiator
// name is subject to change without notice!
// Authored By Christopher De Cairos and James Burns
// April 28, 2012 at HotHacks


(function( window ) {
  // call with new
  var Ratiator = window.Ratiator = function( id1, id2 ) {

    var error = function message() {
      this.error = message;
      return this;
    },
    pow = Math.pow,
    sqrt = Math.sqrt;

    if( !id1 || !id2 ) {
      error( "You need two ids!" );
    }

    var media1 = document.getElementById( id1 );
    var media2 = document.getElementById( id2 );

    if ( !media1 || !media2 ) {
      error( "one of the elements does not exist!" );
    }

    var x1 = media1.offsetLeft + ( media1.clientWidth / 2 ),
        y1 = media1.offsetTop + ( media1.clientHeight / 2 ),
        x2 = media2.offsetLeft + ( media2.clientWidth / 2 ),
        y2 = media2.offsetTop + ( media2.clientWidth / 2 ),

    distance = function( a, b, c, d ) {
      return sqrt( pow( ( a-c ),2) + pow( ( b-d ), 2 ));
    },

    getA = function( a, b, c ) {
      if ( b > c ) {
        return ((2*a) - sqrt((-4*pow(a,2)) + (8*pow(c,2)) + (8*pow(b,2))))/4;
      } else {
        return ((2*a) + sqrt((-4*pow(a,2)) + (8*pow(c,2)) + (8*pow(b,2))))/4;
      }
    },

    mouseMoved = function( evt ) {
      var cX = evt.clientX,
          cY = evt.clientY,
          d1 = distance(x1,y1,x2,y2),
          d2 = distance(cX,cY,x1,y1),
          d3 = distance(cX,cY,x2,y2),
          a = getA(d1,d2,d3),
          b = d1 - a;

      media1.volume = Math.min( Math.max( parseFloat(a)/(a+b), 0 ),1);
      media2.volume = 1 - media1.volume;
    };

    document.body.addEventListener( "mousemove", mouseMoved );

    this.enabled = true;
  }
})( window );