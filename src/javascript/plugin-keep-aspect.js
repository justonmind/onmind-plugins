		// plugin-keep-aspect.js
		(function() {
			'use strict';
			$.fn.keepAspect = function(options) {
				var defaults = {
					aspect: 1
				};

				var s = $.extend({}, defaults, options);

				return this.each(function() {
					var me 				= this;
					var events 		= 'resize orientationchange';
					var aspect		= s.aspect;

					$(window).on(events, function() {
						var width = $(me).outerWidth();
						var height = width * aspect;

						$(me).outerHeight(height);
					});
				});
			};
		})();
