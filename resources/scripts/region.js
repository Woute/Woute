'use strict';

function setDestination(id) {  
    let characterID = localStorage.getItem('characterID');
    let clearOtherWaypoints = false;
    let first = false;
    if (event.shiftKey) {
		first = true;
	}
	if (event.ctrlKey) {
		clearOtherWaypoints = true;
	}
    let address = 'https://crest-tq.eveonline.com/characters/' + characterID.toString() + '/ui/autopilot/waypoints/';
	let data = {
		'clearOtherWaypoints': clearOtherWaypoints,
		'first': first,
		'solarSystem': {
			'href': 'https://crest-tq.eveonline.com/solarsystems/' + id.toString() + '/',
			'id': id
		}
	}
	httpRequest('POST', address, true, JSON.stringify(data))
	.catch(err => {
		console.log(err);
	})
}

function highlightSystem(sysId) {
	let sys = document.getElementById('rect' + sysId);
	sys.style.stroke = '#FFFFFF';
	sys.style.strokeWidth = '3';
}

function showJumps() {
	let texts = document.getElementsByClassName('st');
	httpRequest('GET', 'https://api.eveonline.com/map/Jumps.xml.aspx')
	.then(response => {
		let xmlDoc = null;
		if (window.DOMParser)
		{
			let parser = new DOMParser();
			xmlDoc = parser.parseFromString(response, "text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(response);
		}
		for (let i = 1 ; i < texts.length ; ++i) {
			let sysId = texts[i].id.substring(3);
			let row = xmlDoc.querySelector('[solarSystemID="' + sysId + '"]');
			let jumps = '0'
			if (row != null) jumps = row.getAttribute('shipJumps');
			texts[i].innerHTML = jumps;
			texts[i].classList.remove('so');
			let color = '#000000';
			switch (true) {
				case (jumps < 20):
					color = '#000000';
					break;
				case (jumps < 50):
					color = '#006600';
					break;
				case (jumps < 80):
					color = '#669933';
					break;
				case (jumps < 120):
					color = '#999900';
					break;
				case (jumps < 200):
					color = '#CC9900';
					break;
				default:
					color = '#990000';
					break;
			}
			let rect = document.querySelector('#rect' + sysId);
			rect.style.fill = color;
		}
	})
	.catch(err => {
		console.log(err);
	})
}
