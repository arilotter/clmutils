var getBound = require( 'getboundingbox' );


function range(start, end) {
	var a = [];
	while (start < end) 
		a.push(start++);
	return a;
}


function clip(clmPositions, context) {
	if (!clmPositions)
		return;
	var jawline = range(0, 15);
	var forehead = range(71, clmPositions.length);
	var contour = jawline.concat(forehead.reverse());

	context.beginPath();
	contour.forEach(function (i) {
		var p = clmPositions[i];
		context.lineTo(p[0], p[1]);
	});
	context.closePath();
	context.clip();
}

module.exports = function( clmPositions, options) {
	options = options||{};

	var video = options.video;
	var outContext = options.outContext;
	var faceScale = options.faceScale || [ 1, 1 ];

	var scaledPositions = clmPositions;

	if( clmPositions ) {

		var bound = getBound( clmPositions );

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

		if (!this.canvas) {
			this.canvas = document.createElement("canvas");
			this.context = this.canvas.getContext("2d");
		}

		var cwidth = faceWidth,
			cheight = faceHeight;
		this.canvas.width = cwidth;
		this.canvas.height = cheight;

		this.context.save();
		this.context.clearRect(0, 0, cwidth, cheight);
		this.context.translate(-pOffX, -pOffY);
		this.context.scale( video.width / video.videoWidth * tScaleX, video.height / video.videoHeight * tScaleY );
		this.context.drawImage( video, 0, 0 );
		this.context.restore();

		outContext.save();

		//get the scaled positions to match the image
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

		clip(scaledPositions, outContext, 1, 1, 0, 0);
		outContext.drawImage(this.canvas, 0, 0);

		outContext.restore();

	}
	return scaledPositions;
};