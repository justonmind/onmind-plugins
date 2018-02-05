/*!
 * Onmind Plugins v1.1.0
 * Copyright 2018 Alexander Bichuev
 * Licensed under MIT
 * @author Alexander Bichuev
 * @version 1.1.0
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

// plugin-tabs.js
(function() {
	'use strict';
	$.fn.tabs = function(options) {
		var defaults = {
								set: 				'default-set',
								fadeTime:		600
							};

		var s = $.extend({}, defaults, options);

		return this.each(function() {
			var set 						= s.set;
			var $tabBox 				= $('.tabs__tabs-box[data-set="'+set+'"]');
			var $contentBox 		= $('.tabs__content-box[data-set="'+set+'"]');
			var $selectElem			= $('.tabs__select[data-set="'+set+'"]');
			var $selectOptions 	= $('option', $selectElem);
			var $tabs 					= $('.tabs__tab', $tabBox);
			var $contents 			= $('.tabs__content', $contentBox);
			var activeClass 		= 'tabs__tab_active';
			var currentIdx 			= 0;
			var fadeTime 				= s.fadeTime;
			var isTogglingByTab	= false;

			init();
			run();

			function init() {
				setSelect(0);
				setTab(0);
				setContents(0, 0);
			}

			function setSelect(idx) {
				$selectOptions
					.removeAttr('selected')
					.eq(idx)
					.prop('selected', true);
			}

			function setTab(idx) {
				$tabs
					.removeClass(activeClass)
					.eq(idx)
					.addClass(activeClass)
			}

			function setContents(idx, speed) {
				$contents
					.fadeOut(0)
					.eq(idx)
					.fadeIn(speed);
			}

			function run() {
				selectHandler();
				tabsHandler();
			}

			function selectHandler() {
				$selectElem.on('change', function() {
					if (!isTogglingByTab) {
						var index = $("option:selected", this).index();
						currentIdx = index;
						setTab(index);
						setContents(index, fadeTime);
					}
				});
			}

			function tabsHandler() {
				$tabs.on('click', function(e) {
					e.preventDefault();
					isTogglingByTab = true;
					var index = $tabs.index(this);

					if (index != currentIdx) {
						currentIdx = index;
						setSelect(index);
						setTab(index);
						setContents(index, fadeTime);
					}

					isTogglingByTab = false;
				});
			}
		});
	};
})();
