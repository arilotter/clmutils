var getBound = require( 'getboundingbox' );

module.exports = function( clmPositions, video, outContext, targetWidth, targetHeight, offX, offY ) {

	if( clmPositions ) {

		var bound = getBound( clmPositions ),

			offX = offX || 0;
			offY = offY || 0;

			faceWidth = bound.maxX - bound.minX,
			faceHeight = bound.maxY - bound.minY,

			targetWidth = targetWidth || faceWidth,
			targetHeight = targetHeight || faceHeight,
			
			tScaleX = targetWidth / faceWidth,
			tScaleY = targetHeight / faceHeight,
			pOffX = bound.minX * tScaleX + offX,
			pOffY = bound.minY * tScaleY + offY;

		console.log( tScaleX, tScaleY );

		outContext.save();
	
		//loop through all points surrounding face and create a mask
		outContext.beginPath();
	
		outContext.moveTo( clmPositions[ 0 ][ 0 ] * tScaleX - pOffX, clmPositions[ 0 ][ 1 ] * tScaleY - pOffY );
	
		for( var i = 1; i < 19; i++ ) {
	
			outContext.lineTo( clmPositions[ i ][ 0 ] * tScaleX - pOffX, clmPositions[ i ][ 1 ] * tScaleY - pOffY );
		}
	
		outContext.lineTo( clmPositions[ 22 ][ 0 ] * tScaleX - pOffX, clmPositions[ 22 ][ 1 ] * tScaleY - pOffY );
		outContext.lineTo( clmPositions[ 21 ][ 0 ] * tScaleX - pOffX, clmPositions[ 21 ][ 1 ] * tScaleY - pOffY );
		outContext.lineTo( clmPositions[ 20 ][ 0 ] * tScaleX - pOffX, clmPositions[ 20 ][ 1 ] * tScaleY - pOffY );
		outContext.lineTo( clmPositions[ 19 ][ 0 ] * tScaleX - pOffX, clmPositions[ 19 ][ 1 ] * tScaleY - pOffY );
		
		outContext.clip();
		
		outContext.translate( -pOffX, -pOffY );
		outContext.scale( video.width / video.videoWidth * tScaleX, video.height / video.videoHeight * tScaleY );
		
		outContext.drawImage( video, 0, 0 );
		outContext.restore();
	}
};