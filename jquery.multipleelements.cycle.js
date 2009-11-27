/**
 * Multiple Elements Cycle Plugin.
 *
 * Provides a simple preview scrolling panel. Shows the given range of li items from the middle and
 * allows scrolling left and right within the list. Does not handle automatic scrolling / time based
 * or wrapping items around. 
 *
 * Note $.multipleElementsCycle needs to be called on a div containing a ul rather then the actual ul

 *
 * @author Will Rossiter <will.rossiter@gmail.com>
 * @version 0.3
 */
(function($) {
	$.fn.multipleElementsCycle = function(options){
		
		var defaults = {
			elementContainer: '#cycleElements',	// Selector for element (ul) container (selector)
			prevElement: '#cycleElementsLeft',	// Selector to scroll previous (selector)
			nextElement: '#cycleElementsRight', // Selector to scroll next (selector)
			speed: 500,							// Speed to scroll elements (int)
			containerWidth: false,				// Override default width (int with size)
			showCount: 4,						// Items to show from the list (int)
			overrideStart: false				// Override the start with a defined value (int)
		};
		
		var options = $.extend(defaults, options);
				
		this.each(function() {
			// GET ELEMENTS
			var totalElements = $(this).find("li");
			var maxIndex = totalElements.length - 1;
			
			// WORK OUT START INDEX
			var lowerIndex = (options.overrideStart === false) ? Math.floor((maxIndex - options.showCount + 1) / 2) : options.overrideStart;
			var elementWidth = $(this).find("li").outerWidth(true);
			var margin = ((lowerIndex) * elementWidth) * -1;
			var upperIndex = lowerIndex + options.showCount;
			var parent = $(this);
			
			// HIDE ARROWS IF NONE
			if(upperIndex >= totalElements.length) {
				$(options.nextElement).hide();
			}
			if(lowerIndex <= 0) {
				$(options.prevElement).hide();
			}
			
			// SORT OUT STYLES
			$(this).find(options.elementContainer).css({
				'width': (options.containerWidth) ? options.containerWidth : elementWidth * options.showCount,
				'overflow': 'hidden'
			});
			$(this).find("ul").css({
				'width': (maxIndex + 1) * elementWidth,
				'padding': '0'
			});
			
			// INIT
			$("ul",parent).animate({marginLeft: margin}, options.speed);
			
			var cycle = {
				next: function() {
					if(upperIndex <= maxIndex) {
						$(options.prevElement).show();
						margin = margin - elementWidth;
						upperIndex = upperIndex + 1;
						lowerIndex = lowerIndex + 1;
						$("ul",parent).animate({marginLeft: margin},options.speed);

						if(upperIndex > maxIndex) {
							$(options.nextElement).hide();
						}
					}
				},
				prev: function() {
					if(lowerIndex >= 0) {
						$(options.nextElement).show();	
						upperIndex = upperIndex - 1;
						lowerIndex = lowerIndex - 1;
						margin = margin + elementWidth;
						$("ul",parent).animate({marginLeft: margin}, options.speed);
						if((lowerIndex-1) < 0) {
							$(options.prevElement).hide();
						}
					}
				}
			};
				
			// CLICK
			$(options.nextElement).click(function(){ cycle.next(); return false; });
			$(options.prevElement).click(function(){ cycle.prev(); return false; });
		});	
	};
})(jQuery);