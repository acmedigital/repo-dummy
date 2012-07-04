window.addEvent('domready',function(){
	var basket = new Basket({
		parentBasketContainer:'#basket-container',
		parentBasketIframe:'#basket-iframe',
		parentBasketLink:'#basket_btn',
		iframeContent: 'rightbar'
		closeBtn: 'close-btn'
	});
});