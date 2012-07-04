/** 
* @projectDescription T-Mobile UI Components
*
* @author	Ben Gazzard
* @version	0.1 
*/

(function($){

	/* Array addons */
	Array.implement({
		unique : function(a){
			var r = new Array();
			o:for(var i = 0, n = a.length; i < n; i++){
				for(var x = 0, y = r.length; x < y; x++){
					if(r[x]==a[i]) continue o;
				}
				r[r.length] = a[i];
			}
			return r;
		}
	});
	
	/* String addons */
	String.implement({
		toBool: function(){
			return (this == 'true') ? true : false;
		},
		toFloat: function(){
			return (parseFloat(this) == 'NaN') ? false : parseFloat(this);
		}
	});
	
	/**
	 * Base class for initializing Carousels on page
	 * @id Carousel
	 * @alias Carousel
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), cssactive (CSS class to be applied to block when toggle is clicked), tween (animation parameters)
	 * @return initialized carousel
	 */	
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
			this.target = $(event.target).getParent(this.togglers[0].get('tag')) || $(event.target);
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

	/**
	 * Initializes carousel 
	 * @id SimpleGallery
	 * @alias SimpleGallery
	 * @inherits Carousel
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), cssactive (CSS class to be applied to block when toggle is clicked), tween (animation parameters)
	 * @return initialized carousel
	 */
	this.SimpleGallery = new Class({
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
	
	/**
	 * Initializes carousel 
	 * @id LandingGallery
	 * @alias LandingGallery
	 * @inherits Carousel
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), links (additional elements to ), cssactive (CSS class to be applied to block when toggle is clicked), tween (animation parameters)
	 * @return initialized carousel
	 */	
	this.LandingGallery = new Class({
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
			},
			transport:{
				autoplay:true,
				duration: 4500,
				linkid:'transport',
				cssplay:'play',
				csspause:'pause'
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
			
			if(this.options.transport) {
				this.transportlink = $(this.options.transport.linkid);
				this.transportlink.addEvent('click', this._transportHandler.bindWithEvent(this));
				
				if(this.options.transport.autoplay){
					this.transportlink.addClass(this.options.transport.csspause);
					this.periodical = this._transport.periodical(this.options.transport.duration, this);
				} else {
					this.transportlink.addClass(this.options.transport.cssplay);
					this.periodical = '';
				}
			}
		},
		_clickHandler: function(event){
			this.parent(event);
			if(this.options.transport){
				this.transportlink.addClass(this.options.transport.cssplay);
				this.transportlink.removeClass(this.options.transport.csspause);
				$clear(this.periodical);
			}			
			this.index = this.togglers.indexOf(this.target);
			this._transitionHandler();
		},
		_transitionHandler: function(){
			this.parent();
			this.links.each(function(ele, ind){
				ele.tween('opacity', (ind == this.index) ? 1 : 0);
			}.bind(this));
		},
		_transportHandler: function(event){
			if(event.target.hasClass(this.options.transport.cssplay)){
				event.target.removeClass(this.options.transport.cssplay);
				event.target.addClass(this.options.transport.csspause);
				this._transport();
				this.periodical = this._transport.periodical(this.options.transport.duration, this);
			} else{
				event.target.addClass(this.options.transport.cssplay);
				event.target.removeClass(this.options.transport.csspause);
				$clear(this.periodical);
			}
		},
		_transport: function(){
			this.index += 1;
			if(this.index > (this.togglers.length-1)){
				this.index = 0;
			}
			this._transitionHandler();
		}
	});
	/* End Carousel plugins */	
	
	/**
	 * Class for initializing expandable areas on page 
	 * @id Expandables
	 * @alias Expandables
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), cssactiveblock (CSS class to be applied to block when toggle is clicked), cssactivetogger (CSS class to be applied to toggle when class is initialized)
	 * @return 
	 */
	this.Expandables = new Class({
		Implements: [Events, Options],
		options:{
			index: 0,
			togglers: 'element-class-name',
			blocks: 'element-class-name',
			cssactiveblock: 'active-block',
			cssactivetoggle: 'active-toggle',
			morph: {
				duration : 2000,
				transition : 'quad:in:out'
			}
		},
		initialize: function(options){
			this.setOptions(options);
			this.index = this.options.index;
			this.togglers = $$(this.options.togglers);
			this.blocks = $$(this.options.blocks);
			
			this.blocks.each(function(element, index){
				//element.setStyle('position','absolute');
				element.store('height', element.getSize().y);
				element.setStyle('position','relative');
			}.bind(this));
			
			this.blocks.setStyles({
				'height': 0,
				'overflow':'hidden'
			});
			this.blocks.set('morph', this.options.morph);
			
			this.togglers.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		_clickHandler: function(event){
			event.stop();
						
			this.target = $(event.target).getParent(this.togglers[0].get('tag')+'.'+this.togglers[0].get('class')) || $(event.target);
			
			this.index = this.togglers.indexOf(this.target);
			
			this.togglers.each(function(element, index){
				if (index == this.index) {
					if(element.hasClass(this.options.cssactivetoggle)){
						element.removeClass(this.options.cssactivetoggle);
					} else {
						element.addClass(this.options.cssactivetoggle);
					}
				}
			}.bind(this));
			
			this.blocks.each(function(element, index){
				if(index == this.index){
					
					if(element.hasClass(this.options.cssactiveblock)){
						element.removeClass(this.options.cssactiveblock);
					} else {
						element.addClass(this.options.cssactiveblock);
					}
					
					element.morph({
						'height': (this.togglers[this.index].hasClass(this.options.cssactivetoggle)) ? element.retrieve('height') : 0
					});

				} 
			}.bind(this));
		}
	});
	
	/**
	 * Base class for toggling classes on page 
	 * @id ShowHide
	 * @alias ShowHide
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), csson (CSS class to be applied to block when toggle is clicked), cssoff (CSS class to be applied to block when class is initialized)
	 * @return 
	 */
	this.ShowHide = new Class({
		Implements : [Events, Options],
		options: {
			toggle: false,
			togglers: '.element-class-name',
			blocks: '.element-class-name',
			csson: 'onstyle',
			cssoff: 'offstyle'
		},
		initialize: function(options){
			this.setOptions(options);
			this.togglers = $$(this.options.togglers);
			this.blocks = $$(this.options.blocks);
			this.blocks.addClass(this.options.cssoff);
		},
		_clickHandler: function(event){
			event.stop();
			this.target = event.target.getParent(this.togglers[0].get('tag')) || event.target;
		}
	});
	
	this.FilterQuickView = new Class({
		Extends: this.ShowHide,
		options:{
			togglers: '.element-class-name',
			blocks: '.element-class-name',
			csson: 'onstyle',
			cssoff: 'offstyle'
		},
		initialize: function(options){
			this.parent(options);
			this.togglers.addEvents({
				'mouseover': this._mouseoverHandler.bindWithEvent(this),
				'mouseout': this._mouseoutHandler.bindWithEvent(this)
			});
		},
		_mouseoverHandler: function(event){
			this.target = $(event.target).getParent(this.togglers[0].get('tag')+'.'+this.togglers.get('class')) || $(event.target);
			this.index = this.togglers.indexOf(this.target);
			this.blocks[this.index].addClass(this.options.csson);
		},
		_mouseoutHandler: function(event){
			this.target = $(event.target).getParent(this.togglers[0].get('tag')+'.'+this.togglers.get('class')) || $(event.target);
			this.index = this.togglers.indexOf(this.target);
			this.blocks[this.index].removeClass(this.options.csson);		
		}
	})

	/**
	 * Logic and events for dealing with tab based navigation 
	 * @id Tabs
	 * @alias Tabs
	 * @inherits ShowHide
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), csson (CSS class to be applied to block when toggle is clicked), cssoff (CSS class to be applied to block when class is initialized), cssactive (CSS class applied to toggler if active), index (element to be shown fist)
	 * @return Initialized tab based navigation
	 */
	this.Tabs = new Class({
		Extends: this.ShowHide,
		options: {
			toggle: false,
			togglers: '.element-class-name',
			blocks: '.element-class-name',
			csson: 'onstyle',
			cssoff: 'offstyle',
			cssactive: 'activestyle',
			index : 0,	
			regex : /#tab-/		
		},
		initialize: function(options){
			this.parent(options);
			this.index = this.options.index;

			/*if(location.hash && location.hash != '#'){
				this.hash = location.hash.replace(this.options.regex, '');
				this.index = (this.hash > (this.togglers.length - 1)) ? this.togglers.length - 1 : this.hash;
			}*/

			this._setBlock();
			
			this.togglers.each(function(element, index){
				if(!element.hasClass('ignore')) element.addEvent('click', this._clickHandler.bindWithEvent(this));					
			}.bind(this));
			

		},
		_clickHandler: function(event){
			event.stop();
			this.parent(event);
			this.index = this.togglers.indexOf(this.target);
			this._setBlock();
		},
		_setBlock: function(){
			this.blocks.each(function(element, index){
				if(index == this.index){
					this.togglers[this.index].getParent('li').addClass(this.options.cssactive);
					element.addClass(this.options.csson)
				} else {
					this.togglers[index].getParent('li').removeClass(this.options.cssactive);
					element.removeClass(this.options.csson)
				}
			}.bind(this));
		}
	});
	
	this.Tabs.implement({
		setBlock: function(index){
			this.index = (index > (this.togglers.length - 1)) ? this.togglers.length - 1 : index;
			this._setBlock();
		},
		getBlock: function(){
			return this.index;
		}
	})
	
	/**
	 * Logic and events for dealing a set of togglers on a page
	 * @id Togglers
	 * @alias Togglers
	 * @inherits ShowHide
	 * @param {object} Togglers (Control elements), Blocks (Elements to be controlled), csson (CSS class to be applied to block when toggle is clicked), cssoff (CSS class to be applied to block when class is initialized), cssactive (CSS class applied to toggler if active)
	 * @return Initialized togglers
	 */
	this.Togglers = new Class({
		Extends: this.ShowHide,
		options: {
			toggle: true,
			togglers: '.element-class-name',
			blocks: '.element-class-name',
			csson: 'onstyle',
			cssoff: 'offstyle',
			cssactive: 'activestyle'			
		},
		initialize: function(options){
			this.parent(options);
			this.togglers.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		_clickHandler: function(event){
			event.stop();
			this.parent(event);
			this.blocks.each(function(element, index){
				if(this.togglers.indexOf(this.target) == index){
					if(element.hasClass(this.options.csson)){
						this.target.removeClass(this.options.cssactive);
						element.removeClass(this.options.csson);	
					} else {
						element.addClass(this.options.csson);
						this.target.addClass(this.options.cssactive);
					}
				}
			}.bind(this));
		}
	});
	
	this.Togglers.implement({
		setBlock: function(index){
			if(!this.blocks[index].hasClass(this.options.csson)){
				this.blocks[index].addClass(this.options.csson);
			}
		},
		getBlocks: function(){
			var opened = [];
			this.blocks.each(function(element, index){
				if(element.hasClass(this.options.csson)){
					opened.push(element)
				}
			}.bind(this));
			return $$(opened);
		}
	});
		
	/**
	 * Logic and events for dealing a set of tips on a page
	 * @id TipsBase
	 * @alias TipsBase
	 * @param {object} elements - elements to target, classname - class  name of tip
	 * @return Initialized tips
	 */
	this.TipsBase = new Class({
		Implements:[Events, Options],
		options:{
			elements: 'a.standard-tips',
			classname:'standard-tip',
			onClick: $empty()
		},
		initialize: function(options){
			this.setOptions(options);
			this.elements = $$(this.options.elements);
			this._genHTML();
			this.elements.addEvents({
				'mouseover': this._mouseoverHandler.bindWithEvent(this),
				'mouseout': this._mouseoutHandler.bindWithEvent(this),
				'click': this._clickHandler.bindWithEvent(this)
			});
		},
		_genHTML: function(){
			this.title = new Element('div', {'class': 'title'});
			this.content = new Element('div', {'class': 'content'});
			this.tip = new Element('div', {'class' : this.options.classname}).adopt(
				new Element('div',{'class': 'tip-top'}).adopt(this.title, this.content), 
				new Element('div',{'class':'tip-bottom'})
			).inject(document.body);
			
		},
		_clickHandler: function(event){
			event.stop();
			this.fireEvent('click');
		},
		_mouseoverHandler: function(event){
			var target = $(event.target).getParent(this.elements[0].get('tag')) || $(event.target);
			
			this.tip.setStyle('display','block');
			var targetPos = target.getPosition();
			var targetSize = target.getSize();
			var tipSize = this.tip.getSize();
			
			this.tip.setStyles({
				top: targetPos.y - tipSize.y,
				left: Math.floor(targetPos.x - (tipSize.x / 2) + (targetSize.x / 2))
			});
		},
		_mouseoutHandler: function(event){
			this.tip.setStyle('display','none');
		}
	});	

	/**
	 * Logic and events for dealing a set of tips on a page that runs off title and rel
	 * @id StaticTip
	 * @alias StaticTip
	 * @inherits TipsBase
	 * @param {object} elements - elements to target, classname - class  name of tip
	 * @return Initialized tips
	 */
	this.StaticTip = new Class({
		Extends: this.TipsBase,
		options:{
			elements: 'a.standard-tips',
			classname:'standard-tip'
		},
		initialize: function(options){
			this.parent(options);
			this.setOptions(options);
			this.elements.each(function(element, index){
				element.store('tiptitle', element.get('title'));
				element.store('tipcontent', element.get('rel'));
				element.set('rel','');
				element.set('title','');
			});
		},
		_mouseoverHandler: function(event){
			var target = $(event.target);
			this.title.set('html', target.retrieve('tiptitle'));
			this.content.set('html', target.retrieve('tipcontent'));
			this.parent(event);
		}
	});
	
	/**
	 * Logic and events for dealing a set of tips on a page that runs off title and associated content
	 * @id ExtendedTip
	 * @alias ExtendedTip
	 * @inherits TipsBase
	 * @param {object} elements - elements to target, tipcontent - div containing content for tip, classname - class  name of tip
	 * @return Initialized tips
	 */	
	this.ExtendedTip = new Class({
		Extends: this.TipsBase,
		options:{
			elements: 'a.extended-tips',
			tipcontent: 'div.tip-content',
			classname:'extended-tip'
		},
		initialize: function(options){
			this.parent(options);
			this.tipContent = $$(this.options.tipcontent);
		},
		_mouseoverHandler: function(event){
			var target = event.target.getParent(this.elements[0].get('tag')) || event.target;
			this.content.set('html', this.tipContent[this.elements.indexOf(event.target)].get('html'));
			this.parent(event);
		}
	});	
	
	
	
 	this.Overlay = new Class({
        Implements: [Events, Options],
        options: {
            tween: {
                duration: 100,
                transition: 'quad:in:out'
            },
            morph: {
                duration: 500,
                transition: 'quad:in:out'
            }
        },
        initialize: function(options){
			this.newtop = this.newleft = this.topposition = this.leftposition = this.imageheight = this.imagewidth = 0;
			this.currentIndex = 0;
            this.setOptions(options);
			this.visible = false;
			this._genOverlay();
            this._genHTML();
			window.addEvent('resize', this._resize.bindWithEvent(this));
       	},
		_genOverlay: function(){
			this.overlay = new Element('div', {
                'id': 'overlay',
                'class': (Browser.Platform.mac && Browser.Engine.gecko) ? 'overlayMacFFBGHack' : 'overlayBG',
                'events': {
                    'click': this._removeOverlay.bindWithEvent(this)
                },
				'styles': {
					'opacity': 0
				},
				'tween': this.options.tween
            }).inject(document.body);
		},
		_genHTML: function(){
			this.lightbox = new Element('div',{
				'id': 'lightbox',
				'styles':{
					'opacity':0
				},
				'tween': this.options.tween
			}).inject(document.body);
		},
		_setSize: function(){
			var lightboxsize = this.lightbox.getSize();
			var windowScroll = window.getScroll();
			var windowsize = window.getSize();
			var windowScrollSize = window.getScrollSize();
			
			this.topposition = (windowsize.y / 2) - (lightboxsize.y / 2)
			this.leftposition = (windowsize.x / 2) - (lightboxsize.x / 2)
			
			if(Browser.Engine.trident && Browser.Engine.version == 4){
				this.lightbox.setStyles({
					'left': this.leftposition,
					'top': (windowScroll.y) + (windowsize.y / 2) - (lightboxsize.y / 2)
				});
			} else {
				this.lightbox.setStyles({
					'top': this.topposition, 
					'left': this.leftposition
				});
			}
		},
        _initOverlay: function(){
			this.visible = true;
			var lightboxsize = this.lightbox.getSize();
			var windowScroll = window.getScroll();
			var windowsize = window.getSize();
			var windowScrollSize = window.getScrollSize();
						
			if(Browser.Engine.trident && Browser.Engine.version == 4){
				$$('body', 'html').setStyles({
					'overflow':'hidden',
					'width':'100%',
					'height':'100%'
				});

				this.lightbox.setStyles({
					'position': 'absolute',
					'top': (windowScroll.y) + (windowsize.y / 2) - (lightboxsize.y / 2)
				})
				this.overlay.setStyles({
					'position': 'absolute',
					'height': windowScrollSize.y
				});
				$$('select').setStyle('visibility','hidden');
			}			
			
            this.overlay.setStyle('opacity', 0.75);
			this.lightbox.setStyle('opacity', 1);
        },
        _removeOverlay: function(){
			this.visible = false;
			
			if(Browser.Engine.trident && Browser.Engine.version == 4){
				$$('body', 'html').removeProperty('style');
				$$('select').setStyle('visibility','visible')
			}	
			
            this.overlay.setStyle('opacity', 0);
			this.lightbox.setStyle('opacity', 0);
        },
		_resize: function(){
			this._setSize();
		}
    });
	
	this.HTMLbox = new Class({
		Extends: this.Overlay,
		options:{
			elements: ['a[rel="htmlbox"]','a[rel="swiffbox"]'],
			width: 500
		},
		initialize: function(options){
			this.parent(options);
			this.elements = $$(this.options.elements);
			this.elements.addEvent('click', this._clickHandler.bindWithEvent(this))
		},
		_clickHandler: function(event){
			event.stop();
			this.target = $(event.target).getParent(this.elements[0].get('tag')) || $(event.target);
			this.currentIndex = this.elements.indexOf(this.target)
			this._initOverlay();			
		},
		_initOverlay: function(){
			this.lbheader.set('html', this.target.get('title'))
			
			if(this.target.get('rel')=='swiffbox'){
				this.swiff = new Swiff(this.target.get('href'),{
					id: 'swiffbox',
					width: this.options.width - 40,
					height: this.options.height - 40,
					container: this.content
				});
			
				this.content.setStyles({
					'width':this.options.width - 40,
					'height': this.options.height - 40
				});
			
			} else {
				this.content.removeProperty('style');
				this.content.set('html', $(this.target.get('href').replace('#','')).get('html'));
			}
			
			this._setSize();
			this.parent();
		},
		_genHTML: function(){
			this.parent();
			this.lightbox.setStyles({'width': this.options.width});
			this.content = new Element('div',{'id':'lb-content'});		
			this.lbheader = new Element('div',{'id':'lb-hdr-content'});
			this.closebtn = new Element('a',{
				'id':'lb-close-btn',
				'events':{
					'click': this._removeOverlay.bindWithEvent(this)
				}
			});	
			this.lightbox.adopt(
				new Element('div',{'id':'lb-hdr-left-bdr'}).adopt(
					new Element('div',{'id':'lb-hdr-right-bdr'}).adopt(
						this.lbheader,
						this.closebtn
					)
				),
				new Element('div',{'id':'lb-btm-bdr'}).adopt(this.content)
			).inject(document.body);
		},
		_removeOverlay: function(){
			this.parent();
			if(this.swiff) this.swiff = null;
			
			this.content.set('html','');
        }
	});	
	
	this.Lightbox = new Class({
		Extends: this.Overlay,
		options:{
			elements: 'a[rel="lightbox"]'
		},
		initialize: function(options){
			this.parent(options);
			this.elements = $$(this.options.elements);
			this.elements.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		_genHTML: function(){
			this.parent();
			this.lightbox.setStyles({
				'background-color':'#FFF',
				'width': 200,
				'height': 200
			});
			this.content = new Element('div',{
				'id':'lb-content',
				'tween':this.options.morph
			});
			this.lightbox.set({
				'tween':$merge(this.options.tween,{
					onComplete: function(){
						if(this.lightbox.getStyle('opacity') == 1){
							this.lightbox.addClass('image-loading')
							this._loadImage();
						} else {
							this.content.empty();
						}
					}.bind(this)
				}),
				'morph':$merge(this.options.morph,{
					onComplete: function(){
						this.topposition = this.newtop;
						this.leftposition = this.newleft;
						this.content.tween('opacity', 1)
					}.bind(this)
				})
			});
			
			this.content.set('opacity',0)
			this.lightbox.adopt(this.content);
			this._setSize();
		},
		_initOverlay: function(){
			this.parent()
		},
		_removeOverlay:function(){
			this.parent();
			this.content.setStyles({
				'visibility':'hidden',
				'opacity':0
			})
			this.content.empty();
			
		}
	});
	
	/* Lightbox additional utils */
	this.Lightbox.implement({
		_loadImage : function(){
			var element = Asset.images([this.elements[this.currentIndex].get('href')], {
				onComplete: function(){
					this.lightbox.removeClass('image-loading')
					this.content.empty();
					this.content.adopt(element[0]);
					this.imageheight = element[0].get('height').toInt();
					this.imagewidth = element[0].get('width').toInt();
					this.newtop = (window.getSize().y / 2) - (this.imageheight / 2);
					this.newleft = (window.getSize().x / 2) - (this.imagewidth / 2);
					
					if(this.leftposition != this.newleft && this.topposition != this.newtop){
						this.lightbox.morph({
							'top':this.newtop - 15,
							'left':this.newleft - 15,
							'width':this.imagewidth + 30,
							'height':this.imageheight + 30
						})	
					} else {
						this.content.tween('opacity', 1);
					}
					this._setSize();
				}.bind(this)
			});			
		}
	})
	
	/* Lightbox Event handlers */
	this.Lightbox.implement({
		_clickHandler: function(event){
			event.stop();
			this.target = $(event.target).getParent(this.elements[0].get('tag')) || $(event.target);
			this.currentIndex = this.elements.indexOf(this.target)
			this._initOverlay();
		}
	})
	
	
	this.MakeClickable = new Class({
		Implements: [Events, Options],
		options: {
			elements : 'li.tab'
		},
		initialize: function(options){
			this.setOptions(options);
			this.elements = $$(this.options.elements);
			this.elements.setStyle('cursor','pointer');
			this.elements.addEvent('click', this._clickHandler.bindWithEvent(this));
		},
		_clickHandler: function(event){
			event.stop();
			var target = $(event.target).getParent(this.options.elements) || $(event.target);
			var atag = target.getElement('a');
			window.location = atag.get('href');
		}
	});


})(document.id)


$extend(Browser, {
	fixPNG: function(el) {
		try {
			if (Browser.Engine.trident4){
				el = document.id(el);
				if (!el) return el;
				if (el.get('tag') == "img" && el.get('src').test(".png")) {
					var vis = el.isDisplayed();
					try { //safari sometimes crashes here, so catch it
						dim = el.getSize();
					}catch(e){}
					if (!vis){
						var before = {};
						//use this method instead of getStyles 
						['visibility', 'display', 'position'].each(function(style){
							before[style] = this.style[style]||'';
						}, this);
						//this.getStyles('visibility', 'display', 'position');
						this.setStyles({
							visibility: 'hidden',
							display: 'block',
							position:'absolute'
						});
						dim = el.getSize(); //works now, because the display isn't none
						this.setStyles(before); //put it back where it was
						el.hide();
					}
					var replacement = new Element('span', {
						id:(el.id)?el.id:'',
						'class':(el.className)?el.className:'',
						title:(el.title)?el.title:(el.alt)?el.alt:'',
						styles: {
							display: vis?'inline-block':'none',
							width: dim.x,
							height: dim.y,
							filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader (src='" 
								+ el.src + "', sizingMethod='scale');"
						},
						src: el.src
					});
					if (el.style.cssText) {
						try {
							var styles = {};
							var s = el.style.cssText.split(';');
							s.each(function(style){
								var n = style.split(':');
								styles[n[0]] = n[1];
							});
							replacement.setStyle(styles);
						} catch(e){ dbug.log('fixPNG1: ', e)}
					}
					if (replacement.cloneEvents) replacement.cloneEvents(el);
					replacement.replaces(el);
					// adding class to avoid clashes with css
					replacement.addClass('fixedPng')
				} else if (el.get('tag') != "img") {
				 	var imgURL = el.getStyle('background-image');
				 	if (imgURL.test(/\((.+)\)/)){
				 		el.setStyles({
				 			background: '',
				 			filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='crop', src=" + imgURL.match(/\((.+)\)/)[1] + ")"
				 		});
				 	};
				}
			}
		} catch(e) {/* removal of debugging - dbug.log('fixPNG2: ', e) */}
	},
  pngTest: /\.png$/, // saves recreating the regex repeatedly
  scanForPngs: function(el, className) {
    className = className||'fixPNG';
    //TODO: should this also be testing the css background-image property for pngs?
    //Q: should it return an array of all those it has tweaked?
    if (document.getElements){ // more efficient but requires 'selectors'
      el = document.id(el||document.body);
      el.getElements('img[src$=.png]').addClass(className);
    } else { // scan the whole page
      var els = $$('img').each(function(img) {
        if (Browser.pngTest(img.src)){
          img.addClass(className);
        }
      });
    }
  }
});


