/*global define*/
define([
	'jquery', 
	'underscore', 
	'backbone',
	'models/picture',
	'flipper',
	'helpers'
], function($, _, Backbone, Picture, Flipper) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: "#haahwaaw",

		events: {
			"click #opt-direction li": "changeDirection",
			"click .uploader": "openFileInput",
			"change #fileinput": "fileSelected",
			"click .uploader_confirm ul li": "uploaderAction"
		},

		initialize: function() {
			this.picture = new Picture;
			this.$direction = this.$("#opt-direction");
			this.$fileinput = this.$("#fileinput")[0]; 

			this.$options = this.$(".options");
			this.$pictureframe = this.$(".pictureframe");
			this.$uploader = this.$(".uploader");
			this.$uploader_confirm = this.$(".uploader_confirm");

			this.$previewpic = this.$(".uploader .confirm img")[0];

			this.listenTo(this.picture, 'change', this.render);

			this.render();
		},

		render: function() {
			// update the options from the picture
			this.$direction
				.children()
				.removeClass("active")
				.filter('[data-type="' + this.picture.get("direction") + '"]')
				.addClass("active");

			//this.$previewpic.src = null;
			this.$previewpic.src = this.picture.get("previewpic");

			// decide on if we are displaying the image or the uploader
			if (this.picture.get("displaying")) {
				this.$pictureframe.show();
				this.$options.show();
				this.$uploader.hide();
				this.$uploader_confirm.hide();


				// update the canvas
				if (this.picture.get("src")) {
					var image = new Image();
					var direction = this.picture.get("direction");

					$(image).load(function() {
						// remember, in this function
						// "this" is the image

						var canvas = $(".pictureframe canvas")[0];
						canvas.height = this.height;
						canvas.width = this.width;
						var ctx = canvas.getContext("2d");
						ctx.drawImage(this, 0, 0);
						

						// BEGIN THE PAIN			
						if (direction != "normal")
						{
							var imageData = ctx.getImageData(0,0,this.width, this.height);
							var rawData = imageData.data;

							for (var y = 0; y < this.height; y++) {
								var cols = [] 
								for (var x = 0; x < this.width; x++) {
									cols[x] = Flipper.getRgbaData(rawData, this.width, x, y);
								}

								if (direction == "ltr")
									cols = Flipper.mirrorLeftToRight(cols);
								else if (direction == "rtl")
									cols = Flipper.mirrorRightToLeft(cols);

								var width = this.width;
								_.each(cols, function(value, key, list) {
									Flipper.setRgbaData(rawData, width, key, y, value);
								});
							}

							ctx.putImageData(imageData, 0, 0);
						}

					});

					image.src = this.picture.get("src");
				}

			} else {
				this.$pictureframe.hide();
				this.$options.hide();
				this.$uploader.show();

				// if preview picture is set, we are in confirm mode
				if (this.$previewpic.src) {
					$(".uploader .prompt").addClass("hidden");
					$(".uploader .confirm").removeClass("hidden");			
					$(".uploader_confirm").removeClass("hidden");
				} else {
					$(".uploader .prompt").removeClass("hidden");
					$(".uploader .confirm").addClass("hidden");
					$(".uploader_confirm").addClass("hidden");
				}
			}


		},

		changeDirection: function(ev) {
			this.picture.set("direction", $(ev.currentTarget).data("type"));
		},

		openFileInput: function(ev) {
			if (!this.picture.get("previewpic")) {
				this.$fileinput.click();
			}
		},

		fileSelected: function(ev) {
			if (ev.currentTarget.value == "") return;
			$(".uploader .confirm span").text($.dirBaseName(ev.currentTarget.value));

			// TODO: set some kinda pinwheel spinner loading thingy on the img.

			var reader = new FileReader();
			var file = ev.currentTarget.files[0];

			// fuck javascript
			var self = this;
			var setPreview = function(e) {
				self.picture.set("previewpic", e.target.result);
			};
			reader.onload = setPreview;

			reader.readAsDataURL(file);
			ev.currentTarget.value = null;
		},

		submitSelection: function() {
			this.picture.set("src", this.picture.get("previewpic"));
			this.picture.set("displaying", true);
		},

		cancelSelection: function() {
			$(".uploader .confirm span").text("");
			this.picture.set("previewpic", null);
			this.picture.set("src", null);
		},

		uploaderAction: function(ev) {
			var action = $(ev.currentTarget).data("action");
			if (action == "cancel") {
				this.cancelSelection();
			} else  if (action == "confirm") {
				this.submitSelection();
			}
		}
	});

	return AppView;
});