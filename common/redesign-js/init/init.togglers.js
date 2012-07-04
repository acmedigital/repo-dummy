window.addEvent('domready', function(){
	var togglers = new Togglers({
		toggle: true,
		togglers: '.toggler',
		blocks: '.block',
		csson: 'onstyle',
		cssoff: 'offstyle'
	});
});