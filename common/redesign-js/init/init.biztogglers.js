window.addEvent('domready', function(){
	var togglers = new Togglers({
		toggle: true,
		togglers: '.toggler',
		blocks: '.toggler-block',
		csson: 'onstyle',
		cssoff: 'offstyle'
	});
});