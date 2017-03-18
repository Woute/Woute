'use strict';

window.onload = function() {
	setInterval(getLocation, 5000);
	if (window.location.href.match('?') && typeof highlightSystem === 'function') {
		highlightSystem(getParameterByName('sys'));
	}
}

document.onkeyup = function(e) {
	if (e.keyCode == 32) { // Space
		let location = JSON.parse(localStorage.getItem('location'));
		goTo('system.html', location.region + '/' + location.name + '/' + location.id);
	}
	if (e.keyCode == 8) { // Backspace
		if (document.title != 'New Eden') {
			goTo('/index.html');
		}
	}
}

function authSSO() {
	let url = 'https://login.eveonline.com/oauth/authorize/';
	let redirect_uri = 'https%3A%2F%2Fwoute.github.io%2Fcallback.html';
	let scope = 'characterLocationRead%20characterNavigationWrite';
	let state = (Math.random() * 10).toString() + '_' + window.location.href;
	let clientID = localStorage.getItem('clientID');
	url = url + '?response_type=code&redirect_uri=' + redirect_uri + '&client_id=' + clientID + '&scope=' + scope + '&state=' + state;
	localStorage.setItem('state', state);
	window.location.href = url;
}

function readCredentials() {
	let clientID = document.getElementById('clientID').value;
	let secret = document.getElementById('secret').value;
	localStorage.setItem('clientID', clientID);
	localStorage.setItem('secret', secret);
	clientID = '';
	secret = '';
}
