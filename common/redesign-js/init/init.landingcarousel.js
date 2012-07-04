// JavaScript Document
window.addEvent('domready', function(){
	var landingCarousel = new Carousel.LandingGallery({
		togglers: 'div#bottom-bar-nav a',
		blocks: 'div#image-container div',
		links: 'div#bottom-bar-links a',
		tween: {
			duration:500,
			transition: 'quad:in:out'
		}
	});									 
})