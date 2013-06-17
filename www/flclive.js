// get some JSON data
function fetchJSONFile(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				var data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
		}
	};
	httpRequest.open('GET', path);
	httpRequest.send(); 
}

// tell the function where the JSON data is
fetchJSONFile('http://www.flcbranson.org/api/livebroadcast', function(data){
	// do something with your data
	// alert(JSON.stringify(data));
	// alert(data.datetime + ', ' + data.status);
	if (data.status == 'flcb' || data.status == 'flcs') {
		window.location = "http://www.flcbranson.org/liveapp";
	}
});

// tell the function where the JSON data is
fetchJSONFile('http://www.flcbranson.org/api/featuredseries', function(data) {
	// do something with your data
	// alert(JSON.stringify(data));
	// alert(data.title + ', ' + data.camelcase);
	document.getElementById('featuredseriestitle').innerHTML = '<a href="#">' + data.title + '</a>';
	loadXML('http://www.flcbranson.org/rss/' + data.camelcase + '.xml');
});

function loadXML(url) {
	var xmlhttp;
	var x, i, xx;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// do something with your data
			txt = '<div>';
			x = xmlhttp.responseXML.documentElement.getElementsByTagName('item');
			for (i = 0; i < x.length; i++) {
				txt = txt + '<dl>';
				txt = txt + '<dt>Sermon Title</dt>';
				xx = x[i].getElementsByTagName('title'); {
					try {
						txt = txt + '<dd>Pt. ' + xx[0].firstChild.nodeValue + '</dd>';
					}
					catch (er) {
						txt = txt + '<dd> </dd>';
					}
				}
				txt = txt + '<dt>Speaker</dt>';
				xx = x[i].getElementsByTagName('dc:creator'); {
					try {
						txt = txt + '<dd style="font-size:0.85em;">' + xx[0].firstChild.nodeValue + '</dd>';
					}
					catch (er) {
						txt = txt + '<dd> </dd>';
					}
				}
				txt = txt + '<dt>Date Preached</dt>';
				xx = x[i].getElementsByTagName('pubDate'); {
					// D is the CultureInfo longDate Format Pattern (dddd, MMMM dd, yyyy)
					var date = Date.parse(xx[0].firstChild.nodeValue).toString('D');
					try {
						txt = txt + '<dd style="font-size:0.65em;">' + date + '</dd>';
					}
					catch (er) {
						txt = txt + '<dd> </dd>';
					}
				}
				txt = txt + '<dt>Download Link</dt>';
				xx = x[i].getElementsByTagName('guid'); {
					try {
						txt = txt + '<dd><a href="' + xx[0].firstChild.nodeValue + '">Audio (MP3)</a></dd>';
					}
					catch (er) {
						txt = txt + '<dd> </dd>';
					}
				}
				txt = txt + '</dl>';
			}
			txt = txt + '</div>';
			document.getElementById('sermons').innerHTML = txt;
		}
	}
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

function sundayRebroadcast() {
	// tell the function where the JSON data is
	fetchJSONFile('http://www.flcbranson.org/api/rebroadcast', function(data){
		// do something with your data
		// alert(JSON.stringify(data));
		// alert(data.sunday + ', ' + data.friday);
		var sundayrebroadcastlink = "http://www.flcbranson.org/liveapp/?rebroadcastsite=" + data.sunday + "&rebroadcastday=sun";
		window.location = sundayrebroadcastlink;
	});
}
function fridayRebroadcast() {
	// tell the function where the JSON data is
	fetchJSONFile('http://www.flcbranson.org/api/rebroadcast', function(data){
		// do something with your data
		// alert(JSON.stringify(data));
		// alert(data.sunday + ', ' + data.friday);
		var fridayrebroadcastlink = "http://www.flcbranson.org/liveapp/?rebroadcastsite=" + data.friday + "&rebroadcastday=fri";
		window.location = fridayrebroadcastlink;
	});
}

// window.open wasn't opening a link in the system browser on iOS, so we have to use this function
function redirectToSystemBrowser(url) {
	// Wait for Cordova to load
	document.addEventListener("deviceready", onDeviceReady, false);
	// Cordova is ready
	function onDeviceReady() {
		// open URL in default web browser
		var ref = window.open(encodeURI(url), '_system', 'location=yes');
	}
}