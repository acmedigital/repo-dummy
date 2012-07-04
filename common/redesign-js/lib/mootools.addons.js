/** 
* @projectDescription T-Mobile Mootools Addons
*
* @author	Ben Gazzard
* @version	0.1 
*/

(function($){
	
	this.Carousel = new Class({
		Implements: [Events, Options],
		options:{
			index: 0,
			togglers: 'element-class-name',
			blocks: 'element-class-name',
			cssactive:'active',
			tween: {
				duration : 2000,
				transition : 'quad:in:out'
			}
		},
		initialize: function(options){
			this.setOptions(options),
			this.index = this.options.index;
			this.togglers = $$(this.options.togglers);
			this.blocks = $$(this.options.blocks);
			
			this.blocks.each(function(ele, ind){
				ele.set('opacity',(this.index == ind) ? 1 : 0);
			}.bind(this));
			this.togglers.each(function(element, index){
				if(this.index == index) element.addClass(this.options.cssactive)
			}.bind(this));
			
			this.blocks.removeClass('hidden');
			this.blocks.set('tween', this.options.tween);
			
			window.addEvent('keydown', this._keyHandler.bindWithEvent(this));
		},
		_clickHandler: function(event){
			event.stop();
			this.target = event.target.getParent(this.togglers[0].get('tag')) || event.target;
		},
		_keyHandler: function(e){
			switch (e.code) {
				case 37:
					this.index = (this.index == 0) ? (this.togglers.length - 1) : (this.index - 1);
					break;
				case 39:
					this.index = (this.index == this.togglers.length - 1) ? 0 : (this.index + 1);
					break;
			}		
			this._transitionHandler();
		},
		_transitionHandler: function(){
			this.blocks.each(function(ele, ind){
				ele.tween('opacity', (ind == this.index) ? 1 : 0);
			}.bind(this));
			
			this.togglers.each(function(ele, ind){
				if(ind == this.index){
					ele.addClass(this.options.cssactive);
				} else {
					ele.removeClass(this.options.cssactive);
				}
			}.bind(this));
		}	
	});
	
	this.Carousel.SimpleGallery = new Class({
		Extends: this.Carousel,
		options: {
			index: 0,
			togglers: 'element-class-name',
			blocks: 'element-class-name',
			cssactive: 'active',
			tween: {
				duration : 2000,
				transition : 'quad:in:out'
			}
		},
		initialize: function(options){
			this.parent(options);
			this.togglers.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		_clickHandler: function(event){
			this.parent(event);
			this.index = this.togglers.indexOf(this.target);
			this._transitionHandler();
		}
	});
	
	this.Carousel.LandingGallery = new Class({
		Extends: this.Carousel,
		options: {
			index: 0,
			togglers: 'element-class-name',
			blocks: 'element-class-name',
			links: 'element-class-name',
			cssactive: 'active',
			tween: {
				duration : 2000,
				transition : 'quad:in:out'
			}			
		},
		initialize: function(options){
			this.parent(options);
			this.links = $$(this.options.links);
			this.links.set('tween', this.options.tween);
			
			this.links.each(function(ele, ind){
				ele.setStyle('opacity', (ind == this.index) ? 1 : 0);
			}.bind(this));
			
			this.togglers.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		_clickHandler: function(event){
			this.parent(event);
			this.index = this.togglers.indexOf(this.target);
			this._transitionHandler();
		},
		_transitionHandler: function(){
			this.parent();
			
			this.links.each(function(ele, ind){
				ele.tween('opacity', (ind == this.index) ? 1 : 0);
			}.bind(this));
		}
	});
	
})(document.id)
