/**
 * @author bengazzard
 */
window.addEvent('domready', function(){
	var tips = new StaticTip($$('a.standard-tips'), { classname:'standard-tip' });

	var quickview = new FilterQuickView({
		togglers: '.handset-list-item',
		blocks: '.handset-overlay',
		csson: 'onstyle',
		cssoff: 'offstyle'
	});
	
	var hb = new HTMLbox();			
	
	if($('filtergroup')){
		var filter = new FilterInterface($('filtergroup'), {
			elements : $$('.handset-list-item'),
			update: 'amount'
		});
	}

	if($('sorting')){
		var sorting = new SortInterface($('sorting'), { elements : $$('.handset-list-item') });	
	}

	var togglers = new Togglers({
		toggle: true,
		togglers: '.toggler',
		blocks: '.block',
		csson: 'onstyle',
		cssoff: 'offstyle'
	});
	
});
/*
window.addEvent('unload', function(){
	tips = null;
	quickview = null;
	hb = null;
	filter = null;
	sorting = null;
});*/