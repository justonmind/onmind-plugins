/*!
 * Onmind Plugins v0.0.1
 * Copyright 2018 Alexander Bichuev
 * Licensed under MIT
 * @author Alexander Bichuev
 * @version 0.0.1
 */

;(function($){
	$(function() {


	});
})(jQuery);

		// plugin-keep-aspect.js
		(function() {
			'use strict';
			$.fn.keepAspect = function(options) {
				var defaults = {
					ratio: 1
				};

				var s = $.extend({}, defaults, options);

				return this.each(function() {
					var me 				= this;
					var events 		= 'resize orientationchange';
					var ratio			= s.ratio;

					init();

					$(window).on(events, function() {
						setHeight();
					});

					function init() {
						setHeight();
					}

					function setHeight() {
						var width = $(me).outerWidth();
						var height = width * ratio;

						$(me).outerHeight(height);
					}
				});
			};
		})();
