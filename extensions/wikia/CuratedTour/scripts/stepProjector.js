define('ext.wikia.curatedTour.stepProjector',
	[
		'jquery',
	],
	function ($) {
		'use strict';
		var
			$body,
			$btnNext,
			$btnPrev,
			$title,
			$content,
			$popover,
			$targetedItem,
			targetItemProperties = {};

		function init() {
			setupPopover();
		}

		function show(stepNoParam, selector, title, message, nextCallback, prevCallback) {
			var $selector = $(selector);
			if ($selector.length > 0) {
				reallyShow(stepNoParam, selector, title, message, nextCallback, prevCallback);
			} else {
				setTimeout(function () {
					show(stepNoParam, selector, title, message, nextCallback, prevCallback);
				}, 250);
			}
		}

		function reallyShow(stepNoParam, selector, title, message, nextCallback, prevCallback) {
			prepareTargetItemProperties(selector);
			setPopoverPosition();
			$btnNext.click(function () {
				nextCallback(stepNoParam);
			});
			if (typeof prevCallback === 'function') {
				$btnPrev.show();
				$btnPrev.click(function () {
					prevCallback(stepNoParam);
				});
			} else {
				$btnPrev.hide();
			}
			$title.html(title);
			$content.html(message);
			$popover.show();
		}

		function setupPopover() {
			var $arrow = $('<div></div>').addClass('arrow'),
				$buttons = $('<div></div>').addClass('popover-buttons');

			$title = $('<div></div>').addClass('popover-title');
			$content = $('<div></div>').addClass('popover-content');
			$popover = $('<div></div>').addClass('popover bottom');
			$btnNext = $('<a class="ct-popover-next-btn wikia-button primary">Next</a>');
			$btnPrev = $('<a class="ct-popover-prev-btn wikia-button secondary">Previous</a>');
			$buttons.append($btnNext, $btnPrev);

			$popover
				.append($arrow, $title, $content, $buttons)
				.hide();

			appendBody($popover);
		}

		function prepareTargetItemProperties(selector) {
			var offset;
			$targetedItem = $(selector);
			offset = $targetedItem.offset();
			targetItemProperties.posY = offset.top;
			targetItemProperties.posX = offset.left;
			targetItemProperties.width = $targetedItem.outerWidth();
			targetItemProperties.height = $targetedItem.outerHeight();
		}

		function setPopoverPosition() {
			$popover.css({
				top: targetItemProperties.posY + targetItemProperties.height,
				left: targetItemProperties.posX + 0.5 * targetItemProperties.width - $popover.width() * 0.5
			});
		}

		function appendBody(element) {
			if (typeof $body === 'undefined') {
				$body = $('body');
			}
			$body.append(element);
		}

		/* Run init before invoke */
		init();

		return {
			show: show
		};
	}
);
