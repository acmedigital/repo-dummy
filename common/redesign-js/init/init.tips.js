/**
 * @author bengazzard
 */
window.addEvent('domready', function(){
	
	/* init standard tips */
	
	var tips = new StaticTip($$('a.standard-tips'), {
		classname:'standard-tip'
	});
	
	var exTips = new ExtendedTip($$('a.extended-tips'), {
		classname:'extended-tip'
	});
	
});
