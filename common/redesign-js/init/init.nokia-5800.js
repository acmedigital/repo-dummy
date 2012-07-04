window.addEvent('domready', function(){
	var tabs = new Tabs({
		toggle: true,
		togglers: '.inner-tab',
		blocks: '.inner-tab-content',
		csson: 'onstyle',
		cssoff: 'offstyle',
		index: 0
	}); 
	var hb = new HTMLbox({
		width:680,
		height:400
	});
})