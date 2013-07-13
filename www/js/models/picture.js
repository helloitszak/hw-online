/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var PictureModel = Backbone.Model.extend({
		defaults: {
			direction: "normal"
		}
	});

	return PictureModel;
});