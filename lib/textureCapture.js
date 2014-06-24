var getBound = require( 'getboundingbox' );

module.exports = function( clmPositions, video, outContext, targetWidth, targetHeight ) {

	if( clmPositions ) {

		var bound = getBound( clmPositions );
	
		outContext.save();
	
		//loop through all points surrounding face and create a mask
		outContext.beginPath();
	
		outContext.moveTo( clmPositions[ 0 ][ 0 ] - bound.minX, clmPositions[ 0 ][ 1 ] - bound.minY );
	
		for( var i = 1; i < 19; i++ ) {
	
			outContext.lineTo( clmPositions[ i ][ 0 ] - bound.minX, clmPositions[ i ][ 1 ] - bound.minY );
		}
	
		outContext.lineTo( clmPositions[ 22 ][ 0 ] - bound.minX, clmPositions[ 22 ][ 1 ] - bound.minY );
		outContext.lineTo( clmPositions[ 21 ][ 0 ] - bound.minX, clmPositions[ 21 ][ 1 ] - bound.minY );
		outContext.lineTo( clmPositions[ 20 ][ 0 ] - bound.minX, clmPositions[ 20 ][ 1 ] - bound.minY );
		outContext.lineTo( clmPositions[ 19 ][ 0 ] - bound.minX, clmPositions[ 19 ][ 1 ] - bound.minY );
		
		outContext.clip();
		
		outContext.translate( -bound.minX, -bound.minY );
		outContext.scale( video.width / video.videoWidth, video.height / video.videoHeight );
		
		outContext.drawImage( video, 0, 0 );
		outContext.restore();
	}
};