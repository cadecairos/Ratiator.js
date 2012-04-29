// Volume Ratiator
// Authored By Christopher De Cairos and James Burns
// April 28, 2012 at HotHacks

// call it with:
// var r = new Ratiator( "videoid_1", "videoid_2" );
// OR
// var r = new Ratiator( "videoid_1", "videoid_2", { x1: 250, y1: 250, x2: 500, y2: 500 } );

(function( window ) {
  var pow = Math.pow,
      sqrt = Math.sqrt,

  // Thanks to http://www.quirksmode.org/js/findpos.html for this one
  getRealPos = function( obj ) {
    var curleft = curtop = 0;

    if ( obj.offsetParent ) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while( obj = obj.offsetParent );
      return { left: curleft, top: curtop };
    }
  },

  // Call with 'new'
  Ratiator = window.Ratiator = function( id1, id2, customCoords ) {

    var self = this;

    this.error = function message() {
      self.errorMessage = message;
      return this;
    };

    if( !id1 || !id2 ) {
      this.error( "You need two ids!" );
    }

    this.media1 = document.getElementById( id1 );
    this.media2 = document.getElementById( id2 );

    if ( !this.media1 || !this.media2 ) {
      this.error( "one of the elements does not exist!" );
    }

    if ( customCoords ) {
      this.x1 = customCoords.x1;
      this.y1 = customCoords.y1;
      this.x2 = customCoords.x2;
      this.y2 = customCoords.y2;
    } else {
      this.realPos1 = getRealPos( this.media1);
      this.realPos2 = getRealPos( this.media2);
      this.x1 = this.realPos1.left + ( this.media1.clientWidth / 2 );
      this.y1 = this.realPos1.top + ( this.media1.clientHeight / 2 );
      this.x2 = this.realPos2.left + ( this.media2.clientWidth / 2 );
      this.y2 = this.realPos2.top + ( this.media2.clientWidth / 2 );
    }

    this.distance = function( a, b, c, d ) {
      return sqrt( pow( ( a-c ),2) + pow( ( b-d ), 2 ));
    },

    this.getA = function( a, b, c ) {
      if ( b > c ) {
        return ((2*a) - sqrt((-4*pow(a,2)) + (8*pow(c,2)) + (8*pow(b,2))))/4;
      } else {
        return ((2*a) + sqrt((-4*pow(a,2)) + (8*pow(c,2)) + (8*pow(b,2))))/4;
      }
    },

    this.mouseMoved = function( evt ) {
      var cX = evt.clientX,
          cY = evt.clientY,
          d1 = self.distance(self.x1,self.y1,self.x2,self.y2),
          d2 = self.distance(cX,cY,self.x1,self.y1),
          d3 = self.distance(cX,cY,self.x2,self.y2),
          a = self.getA(d1,d2,d3),
          b = d1 - a;

      self.media1.volume = Math.min( Math.max( parseFloat(a)/(a+b), 0 ),1);
      self.media2.volume = 1 - self.media1.volume;
    };

    document.body.addEventListener( "mousemove", this.mouseMoved );

    //TODO: Toggle
    //this.enabled = true;
  }
})( window );