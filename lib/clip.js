var extractPositions = require('./extractPositions');
var forehead = require('./forehead');
var halo = require('./halo');

var range = require('./range');

function clip(clmPositions, context, scaleX, scaleY) {
	if (!clmPositions)
		return;
	// var jawlineIndices = range(0, 15);
	// var foreheadIndices = range(forehead.indices.start, forehead.indices.end);
	// var contourIndices = jawlineIndices.concat(foreheadIndices);
	var contourIndices = range(halo.indices.start, halo.indices.end+1);

	var positions = extractPositions(clmPositions, contourIndices);
	context.beginPath();
	for (var i = positions.length - 1; i >= 0; i--) {
		var p = positions[i];
		context.lineTo(p[0]*scaleX, p[1]*scaleY);
	};
	context.closePath();
	context.clip();
}

module.exports = clip;