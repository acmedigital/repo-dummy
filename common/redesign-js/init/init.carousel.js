/**
 * @author bengazzard
 */
window.addEvent('domready', function(){
	/*
	var shoplanding = new LandingGallery({
		index : 0,
		togglers : 'div#bottom-bar-nav a.toggle',
		blocks : 'div#image-container div.container',
		links: 'div#bottom-bar-links a',
		tween : {
			duration : 500,
			transition : 'quad:in:out'
		},
		transport : {
			autoplay : true,
			linkid : 'transport',
			cssplay : 'play',
			csspause : 'pause'
		}
	});
	*/
	var productOverview = new SimpleGallery({
		index : 0,
		togglers : '#product-overview-thumbs a',
		blocks : '#product-overview-image img',
		tween : {
			duration : 500,
			transition : 'quad:in:out'
		}
	});
	
});