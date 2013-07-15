/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var PictureModel = Backbone.Model.extend({
		defaults: {
			direction: "normal",
			displaying: false,
			previewpic: ""
		}
	});

	return PictureModel;
});