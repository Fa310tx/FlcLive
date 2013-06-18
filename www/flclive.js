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
		window.location = 'http://www.flcbranson.org/liveapp';
	} else {
		document.getElementById('content').innerHTML = '\
<header>\n\
	<h1><abbr title="Faith Life Church">FLC</abbr> Live</h1>\n\
</header>\n\
<div id="boxes">\n\
	<section id="livebroadcasts" class="box">\n\
		<h2>Live Broadcasts</h2>\n\
		<dl>\n\
			<dt>Sunday</dt>\n\
			<dd>9:00 AM &amp; 11:00 AM Central</dd>\n\
			<dt>Friday</dt>\n\
			<dd>6:30 PM Central</dd>\n\
		</dl>\n\
	</section>\n\
	<section id="rebroadcasts" class="box">\n\
		<h2>Rebroadcasts</h2>\n\
		<dl>\n\
			<dt>Most Recent, Full Service</dt>\n\
			<dd><a href="javascript:sundayRebroadcast();">Sunday</a></dd>\n\
			<dd><a href="javascript:fridayRebroadcast();">Friday</a></dd>\n\
		</dl>\n\
	</section>\n\
	<section id="featuredseries" class="box">\n\
		<h2>Featured Series</h2>\n\
		<div id="featuredseriestitle"></div>\n\
		<div id="sermons"></div>\n\
	</section>\n\
	<section id="externallinks" class="box">\n\
		<h2>External Links <small>opens in system browser</small></h2>\n\
		<ul>\n\
			<li><a href="javascript:redirectToSystemBrowser(\'http://www.flcbranson.org/\');">Official <abbr title="Faith Life Church">FLC</abbr> Website</a></li>\n\
			<li><a href="javascript:redirectToSystemBrowser(\'https://faithlifechurchbranson.thankyou4caring.org/\');">Sow to <abbr title="Faith Life Church">FLC</abbr></a></li>\n\
		</ul>\n\
	</section>\n\
</div>\n\
<div id="pointlessdivforbackgroundimage"></div>\
';
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
					// date.js (included separately) string format (Sunday, March 05, 2012)
					var date = Date.parse(xx[0].firstChild.nodeValue).toString('dddd, MMMM dd, yyyy');
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
		var sundayrebroadcastlink = 'http://www.flcbranson.org/liveapp/?rebroadcastsite=' + data.sunday + '&rebroadcastday=sun';
		window.location = sundayrebroadcastlink;
	});
}
function fridayRebroadcast() {
	// tell the function where the JSON data is
	fetchJSONFile('http://www.flcbranson.org/api/rebroadcast', function(data){
		// do something with your data
		// alert(JSON.stringify(data));
		// alert(data.sunday + ', ' + data.friday);
		var fridayrebroadcastlink = 'http://www.flcbranson.org/liveapp/?rebroadcastsite=' + data.friday + '&rebroadcastday=fri';
		window.location = fridayrebroadcastlink;
	});
}

// window.open wasn't opening a link in the system browser on iOS, so we have to use this function
function redirectToSystemBrowser(url) {
	// Wait for Cordova to load
	document.addEventListener('deviceready', onDeviceReady, false);
	// Cordova is ready
	function onDeviceReady() {
		// open URL in default web browser
		var ref = window.open(encodeURI(url), '_system', 'location=yes');
	}
}

/* keeps splash screen on if live broadcast is going (some conflict with window.location?)
// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39575525-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
*/