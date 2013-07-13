/*global require*/
'use strict';

require.config({
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone'
	}
});


require(["backbone", "views/app"], function(Backbone, AppView) {
	new AppView();
});