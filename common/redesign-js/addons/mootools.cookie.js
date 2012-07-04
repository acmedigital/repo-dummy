
/* login / logout functionality */
var loginPanel = document.id('mtm-btn');
var logoutPanel = document.id('mtm-logout');
var loggedIn = Cookie.read('logged_in_mtm') || false;

if($type(loginPanel) != false && $type(logoutPanel) != false){
	if(loggedIn){
		loginPanel.hide();
		logoutPanel.show();
	} else {
		loginPanel.show();
		logoutPanel.hide();
	}
}

/* remember me functionality */
var mtmForm = document.id('mtm-login');
var userNameCookie = 'mtm_user_name';
var rememberMeCookie = Cookie.read('mtm_user_name') || false;
var usernameInput = document.id('username');
var checkbox = document.id('saveUserName');

if($type(mtmForm) != false){
	mtmForm.addEvent('submit', function(){
		if(checkbox && checkbox.get('checked') == true){
			Cookie.write('mtm_user_name', usernameInput.get('value'))
		} else {
			Cookie.dispose('mtm_user_name');
		}		
		return true;
	});
}

if($type(usernameInput) != false && rememberMeCookie != false){
	if(rememberMeCookie){
		usernameInput.set('value', rememberMeCookie);
		checkbox.set('checked','checked');	
	} else {
		usernameInput.set('value', 'Enter your username...')		
		checkbox.set('checked','');	
	}
} 