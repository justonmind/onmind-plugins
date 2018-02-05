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

// plugin-accordion.js
(function() {
	'use strict';
	$.fn.accordion = function(options) {
		var defaults = {
			slideTime: 300,
			singleOpened: false
		};

		var s = $.extend({}, defaults, options);

		return this.each(function() {
			var accordion = this;
			var $sections 	= $('.accordion__section', this);
			var $openedSections 	= $('.accordion__section_opened', this);
			var slideTime = s.slideTime;
			var singleOpened = s.singleOpened;

			init();

			function init() {
				initOpen();
				run();
			}

			function initOpen() {
				$openedSections.each(function() {
					$('.accordion__content', this).slideDown(0);
				});
			}

			function run() {
				$sections.each(function() {
					var $toggle = $('.accordion__toggle', this);
					var $content = $('.accordion__content', this);
					var section = this;

					$toggle.on('click', function(e) {
						e.preventDefault();

						if (singleOpened) {
							$(section).siblings('.accordion__section')
												.removeClass('accordion__section_opened')
												.find('.accordion__content')
												.slideUp(slideTime);
						}

						if ($(section).hasClass('accordion__section_opened')) {
							$(section).removeClass('accordion__section_opened');
							$content.slideUp(slideTime);
						} else {
							$(section).addClass('accordion__section_opened');
							$content.slideDown(slideTime);
						}
					});
				});
			}

		});
	};
})();

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
