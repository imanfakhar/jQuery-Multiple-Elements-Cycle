/**
 * jQuery Multiple Elements Cycle Plugin.
 *
 * Provides a simple preview scrolling panel. Shows the given range of li items from the middle and
 * allows scrolling left and right within the list. Does not handle automatic scrolling / time based
 * or wrapping items around. 
 *
 * Note $.multipleElementsCycle needs to be called on a div containing a ul rather then the actual ul
 *
 * Copyright 2011, Will Rossiter <will.rossiter@gmail.com>
 * Released under the BSD License.
 *
 * Version: 0.5
 */
(function($) {
	$.fn.multipleElementsCycle = function(opts){
		
		/**
		 * Setup default configuration options. To override any of these
		 * options pass in the object to the multipleElementsCycle call
		 * 
		 * $("#container").multipleElementsCycle
		 */
		var defaults = {
			container: '#cycle',	// Selector for element (ul) container (selector)
			prev: '#cycle-prev',	// Selector to scroll previous (selector)
			next: '#cycle-next', 	// Selector to scroll next (selector)
			speed: 500,				// Speed to scroll elements (int)
			containerSize: false,	// Override default size (int with size)
			show: 4,				// Items to show from the list (int)
			start: false,			// Override the start with a defined value (int)
			jumpTo: false,			// Selectors to use as jump list
			vertical: false,		// Whether Scroll is for vertical
			scrollCount: 1			// How many elements to scroll when clicking next / prev	
		};
		
		var opts = $.extend(defaults, opts);
				
		return this.each(function() {
			var totalElems = $(this).find("li");
			var maxIndex = totalElems.length - 1;
			
			// Calculate the start index. It will either work it out automatically based
			// on the length of the list or use the provided opts.start value
			var ll = (opts.start === false) ? Math.floor((maxIndex - opts.showCount + 1) / 2) : opts.start;
			var size = (opts.vertical === false) ? $(this).find("li").outerWidth(true) : $(this).find("li").outerHeight(true);

			var margin = ((lowerIndex) * size) * -1;
			var upperIndex = lowerIndex + opts.showCount;
			var parent = $(this);
			
			// HIDE ARROWS IF NEEDED
			if(upperIndex >= totalElems.length) $(opts.next).hide();
			if(lowerIndex <= 0) $(opts.prev).hide(); 
			
			if(opts.vertical === false) {
				$(this).find(opts.elementContainer).css({
					width: (opts.containerSize) ? opts.containerSize : size * opts.showCount,
					overflow: 'hidden'
				});
				$(this).find("ul").css({
					width: (totalElems.length) * size,
					padding: '0'
				});
				
				$("ul",parent).animate({marginLeft: margin}, opts.speed);
			}
			else {
				$(this).find(opts.elementContainer).css({
					height: (opts.containerSize) ? opts.containerSize : size * opts.showCount,
					overflow: 'hidden'
				});
				$(this).find("ul").css({
					height: (totalElems.length) * size,
					padding: '0'
				});
				
				$("ul",parent).animate({marginTop: margin}, opts.speed);
			}
	
			var cycle = {
				next: function() {
					if(upperIndex <= maxIndex) {
						$(opts.prev).show();

						var count = ((upperIndex+opts.scrollCount) > maxIndex) ? totalElems.length-upperIndex : opts.scrollCount;
			
						margin = margin - (size * count);
						upperIndex = upperIndex + count;
						lowerIndex = lowerIndex + count;
						
						if(opts.vertical === false)
							$("ul",parent).animate({marginLeft: margin},opts.speed);
						else
							$("ul",parent).animate({marginTop: margin},opts.speed);
							
						if(upperIndex > maxIndex) $(opts.next).hide();
					}
				},
				prev: function() {
					if(lowerIndex >= 0) {
						$(opts.next).show();	
						
						var count = ((lowerIndex-opts.scrollCount) < 0) ? lowerIndex : opts.scrollCount;
						
						upperIndex = upperIndex - count;
						lowerIndex = lowerIndex - count;
						margin = margin + (size * count);
						
						if(opts.vertical === false)
							$("ul",parent).animate({marginLeft: margin}, opts.speed);
						else
							$("ul",parent).animate({marginTop: margin},opts.speed);
							
						if((lowerIndex-1) < 0) $(opts.prev).hide();
					}
				},
				toPoint: function(pos) {
					var oldUpper = upperIndex;
					if(pos == 0) {
						// jump to end
						upperIndex = maxIndex + 1;
						lowerIndex = upperIndex - opts.showCount;
					}
					else if(pos < 0) {
						// offset from end
						upperIndex = maxIndex + parseInt(pos);
						lowerIndex = lowerIndex + parseInt(pos);
					}
					else {
						// offset from start
						lowerIndex = pos - 1;
						upperIndex = lowerIndex + opts.showCount;
					}
					// if the upper index is 
					margin = margin + (size * (oldUpper-upperIndex));
					
					if(opts.vertical === false) 
						$("ul",parent).animate({marginLeft: margin},opts.speed);
					else 
						$("ul",parent).animate({marginTop: margin},opts.speed);
						
					if(upperIndex >= maxIndex) $(opts.next).hide();
					else $(opts.next).show();
					
					if(lowerIndex == 0) $(opts.prev).hide();
					else $(opts.prev).show();
				}
			};
				
			// CLICK

			$(opts.next).live('click', function(){ cycle.next();return false; });
			$(opts.prev).live('click', function(){ cycle.prev(); return false; });

			// JUMP
			if(opts.jumpTo) {
				$(opts.jumpTo).live('click', function() { 
					cycle.toPoint($(this).data('position')); return false; 
				});
			}
		});	
	}
})(jQuery);