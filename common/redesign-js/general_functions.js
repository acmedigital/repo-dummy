// JavaScript Document


//function for simple goto menu
function openURL(){
	selInd = document.country.sites.selectedIndex;
	goURL = document.country.sites.options[selInd].value;
	top.location.href = goURL;
}

// function to eopen popup
function popUp(URL,width,height) {
	window.open(URL, 'popup', 'toolbar=0,scrollbars=1,location=0,status=0,menubar=0,resizable=0,width=' + width + ',height=' + height + ',left = 50,top = 50');
	return false;
}