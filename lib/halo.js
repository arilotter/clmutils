var extractPositions = require('./extractPositions');
var inflatePositions = require('./inflatePositions');
var forehead = require('./forehead');
var posUtils = require('./posUtils');
var range = require('./range');
var SIDES_LENGTH = 0.9,
	TWO_PI = Math.PI * 2;

var smooth = require( 'chaikin-smooth' );

var indices = {
	start: -1,
	end: -1
};

function add( clmPositions) {

	if( clmPositions ) {
		var foreheadWidth = posUtils.length(posUtils.delta(clmPositions[forehead.indices.start], clmPositions[forehead.indices.end]));

		if(indices.start == -1) indices.start = clmPositions.length;

		var jawlineIndices = range(0, 15);
		var foreheadIndices = range(forehead.indices.start, forehead.indices.end);
		var contourIndices = jawlineIndices.concat(foreheadIndices);

		var positions = extractPositions(clmPositions, contourIndices);
		positions = inflatePositions(positions, foreheadWidth * .2);
		for (var i = positions.length - 1; i >= 0; i--) {
			clmPositions.push(positions[i]);
		};

		if(indices.end == -1) indices.end = clmPositions.length-1;
	}
	return clmPositions;
};

var halo = {
	add: add,
	indices: indices
}
module.exports = halo;