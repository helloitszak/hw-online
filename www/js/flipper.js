/*global define*/
define(['underscore'], function(_) {
	'use strict';
	return {
		getRgbaData: function(data, imgw, x, y) {
			return {
				"r": data[((imgw * y) + x) * 4],
				"g": data[((imgw * y) + x) * 4 + 1],
				"b": data[((imgw * y) + x) * 4 + 2],
				"a": data[((imgw * y) + x) * 4 + 3]
			};
		},
		setRgbaData: function(data, imgw, x, y, rgba) {
			data[((imgw * y) + x) * 4] = rgba["r"];
			data[((imgw * y) + x) * 4 + 1] = rgba["g"];
			data[((imgw * y) + x) * 4 + 2] = rgba["b"];
			data[((imgw * y) + x) * 4 + 3] = rgba["a"];
		},
		mirrorLeftToRight: function(array) {
			// Make a copy because JS sucks.
			var arr = array.slice(0);

			// calculate the middle point
			var middle = Math.ceil(array.length / 2);
			
			// whack off the right side
			arr.splice(middle);

			// append a mirrored copy
			arr = arr.concat(arr.slice(0).reverse());
			return arr;
		},
		mirrorRightToLeft: function(array) {
			// Make a copy because JS sucks.
			var arr = array.slice(0);

			// calculate the middle point
			var middle = Math.ceil(array.length / 2);

			// whack off the left side
			arr.splice(0, middle);

			arr = arr.slice(0).reverse().concat(arr);
			return arr;
		}
	};
});