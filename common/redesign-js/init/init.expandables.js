/**
 * @author bengazzard
 */
window.addEvent('domready', function(){
	var expand = new Expandables({
		index: 0,
		togglers: 'div.expandable-toggle',
		blocks: 'div.expandable-block',
		cssactiveblock: 'active-block',
		cssactivetoggle: 'active-toggle',
		morph: {
			duration : 500,
			transition : 'quad:in:out'
		}
	});
});