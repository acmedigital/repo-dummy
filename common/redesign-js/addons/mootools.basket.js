(function($){
	
	/**
	 * Class for initializing iframe'd Basket
	 * @id Basket
	 * @alias Basket
	 * @param {object} parentBasketContainer (<div> containing basket iframe on parent page), parentBasketIframe (<iframe> element on parent page), parentBasketLink (<a> element on parent page), iframeContent (<div> element on current document) 
	 * @return initialized Basket (this will only run on iframe'd content)
	 */	
	
	this.Basket = new Class({
		Implements: [Events, Options],
		/* options can be defaulted, these can be overwritten with options passed into instantiated new classes */
		options:{
			/* id of the div containing the basket iframe on parent page (#basket-container) */
			parentBasketContainer:'',
			/* id of the iframe on parent page (#basket-iframe) */
			parentBasketIframe:'',
			/* id of the show / hide button on parent page (#basket_btn) */
			parentBasketLink:'',
			/* id of the div containing the basket content on this page (rightbar) */
			iframeContent:''
		},
		/* this function runs when class is instantiated */
		initialize: function(options){
			/* overriding options with default options */
			this.setOptions(options);
			
			/* shortcut to parent window document */
			this.parent = window.parent.document;
			
			/* get parentBasketContainer from parent window document */
			this.basket = this.parent.getElement(this.options.parentBasketContainer);
			
			/* get parentBasketIframe from parent window document */
			this.iframe = this.parent.getElement(this.options.parentBasketIframe);
			
			/* get parentBasketLink from parent window document */
			this.link = this.parent.getElement(this.options.parentBasketLink);
			
			/* get parentBasketContainer from current document */
			this.iframeContent = $(this.options.iframeContent);
			
			/* setting animation parameters */
			this.basket.set('morph', {duration: 500, transition: 'quad:in:out'});
			
			/* setting parentBasketContainer opacity to 0 */
			this.basket.setStyle('opacity',0);
			
			/* setting parentBasketIframe height from current pages content */
			this.iframe.set('height', this.iframeContent.getSize().y);
			
			/* adding this._clickHandler function to parentBasketLink's onclick event */
			this.link.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		/* click handler function for parentBasketLink */
		_clickHandler: function(event){
			
			/* stop the events default */
			event.stop();
			
			/* test if the event's target (parentBasketLink) has the class of open */
			if(event.target.hasClass('open')){
				/* if the events target has the class open, remove it */
				event.target.removeClass('open');
				
				/* animate the opacity and height to 0 */
				this.basket.morph({
					'height': 0,
					'opacity': 0
				});
			} else {
				/* if the events target doesn't have the class open, add it */
				event.target.addClass('open');
				
				/* animate the opacity to 1 and height to iframeContent's height */
				this.basket.morph({
					'height': this.iframeContent.getSize().y,
					'opacity': 1
				});
			}
		}
	});
	
})(document.id)