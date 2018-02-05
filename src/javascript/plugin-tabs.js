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
