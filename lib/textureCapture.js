var getBound = require( 'getboundingbox' );

module.exports = function( clmPositions, options) {
	options = options||{};

	var video = options.video;
	var outContext = options.outContext;
	var faceScale = options.faceScale || [ 1, 1 ];

	var scaledPositions = clmPositions;

	if( clmPositions ) {

		var bound = getBound( clmPositions );
		outContext.save();
		
		bound.minX *= faceScale[0];
		bound.minY *= faceScale[1];
		bound.maxX *= faceScale[0];
		bound.maxY *= faceScale[1];

		var faceWidth = bound.maxX-bound.minX,
			faceHeight = bound.maxY-bound.minY;
		var pOffX = bound.minX,
			pOffY = bound.minY;
		var tScaleX = 1,
			tScaleY = 1;

		outContext.translate( -pOffX, -pOffY );
		outContext.scale( video.width / video.videoWidth * tScaleX, video.height / video.videoHeight * tScaleY );
		
		outContext.drawImage( video, 0, 0 );
		outContext.restore();

		scaledPositions = [];
		for (var i=0; i<clmPositions.length; i++) {
			var orig = clmPositions[i];
			var p = orig.slice(0);

			p[0] *= tScaleX * faceScale[0];
			p[0] -= pOffX;

			p[1] *= tScaleY * faceScale[1];
			p[1] -= pOffY;
			scaledPositions.push(p);
		}
	}
	return scaledPositions;
};