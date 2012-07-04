window.addEvent('domready', function(){
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
	
	var tabsmtm = new Tabs({
		toggle: true,
		togglers: '.tab-green',
		blocks: '.tabcontent-green',
		csson: 'onstyle',
		cssoff: 'offstyle',
		index: 0
	});
	
});