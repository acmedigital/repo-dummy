window.addEvent('domready', function(){
									 
	var objanimation = {
		duration : 500,
		transition : 'quad:in:out'
	}
	
	var tips = new StaticTip($$('a.standard-tips'), {
		classname:'standard-tip'
	});
	var expand = new Expandables({
		index: 0,
		togglers: 'div.expandable-toggle',
		blocks: 'div.expandable-block',
		cssactiveblock: 'active-block',
		cssactivetoggle: 'active-toggle',
		morph: objanimation
	});
	var productOverview = new SimpleGallery({
		index : 0,
		togglers : '#product-overview-thumbs a',
		blocks : '#product-overview-image img',
		tween : objanimation
	});
	var togglers = new Togglers({
		toggle: true,
		togglers: '.toggler',
		blocks: '.block',
		csson: 'onstyle',
		cssoff: 'offstyle'
	});
	var tabs = new Tabs({
		toggle: true,
		togglers: '.tab-magenta',
		blocks: '.tabcontent-magenta',
		csson: 'onstyle',
		cssoff: 'offstyle',
		index: 0
	});
	
});