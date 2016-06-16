# clmutils

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is a set of utility functions which can be used to decipher CLM Trackr

## Usage

[![NPM](https://nodei.co/npm/clmutils.png)](https://www.npmjs.com/package/clmutils)

You can consume these utility functions in the following two ways:
```javascript
var utils = require('clmutils');

utils.faceOrientation
utils.getFaceSize
utils.textureCapture
utils.forehead
utils.halo
```

or

```javascript
var faceOrientation = require('clmutils/faceOrientation');
var getFaceSize = require('clmutils/getFaceSize');
var textureCapture = require('clmutils/textureCapture');
var forehead = require('clmutils/forehead');
var halo = require('clmutils/halo');
```

Here are examples as to how to use these utility functions:
```javascript
var faceOrientation = require('clmutils/faceOrientation');
var getFaceSize = require('clmutils/getFaceSize');
var textureCapture = require('clmutils/textureCapture');
var forehead = require('clmutils/forehead');
var halo = require('clmutils/halo');

// clmPositions would be the positions of vertices from clm

// returns aproximated y and z rotations of face in degrees
var rotationDegrees = faceOrientation(clmPositions); 
console.log(rotationDegrees.z); // z rotation of face
console.log(rotationDegrees.y); // y rotation of face

// an object containing 2d width and height of face is returned
var size = getFaceSize(clmPositions);
console.log(size.width); // width of face
console.log(size.height); // height of face

textureCapture(clmPositions, video, outContext, targetWidth, targetHeight, offX, offY);

// add 10 points to create a forehead (original array is modified)
forehead(clmPositions, 10); 
```

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/clmutils/blob/master/LICENSE.md) for details.
