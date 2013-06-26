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
	// false tells it to be synchronous instead of asynchronous
	httpRequest.open('GET', path, false);
	httpRequest.send(); 
}

// window.open wasn't opening a link in the system browser on iOS, so we have to use this function (requires phonegap.js)
function redirectToSystemBrowser(url) {
	// Wait for Cordova to load
	document.addEventListener('deviceready', onDeviceReady, false);
	// Cordova is ready
	function onDeviceReady() {
		// open URL in default web browser
		var ref = window.open(encodeURI(url), '_system', 'location=yes');
	}
}

// opens and closes the video lightbox (jquery)
function openVideo(url) {
	poster = 'http://www.flcbranson.org/images/Posters/Flcb.jpg';
	$('body').append('<div id="videowrapper" onclick="closeVideo();"><a href="javascript:void(0)" onclick="closeVideo();">x</a><video src="' + url + '" poster="' + poster + '" autoplay controls x-webkit-airplay="allow" loop></video></div>');
}
function closeVideo() {
	$('#videowrapper video')[0].pause();
	$('#videowrapper').remove();
	document.location.reload(true);
}

// a JavaScript equivalent of PHP’s basename() function
function basename(path, suffix) {
	// http://kevin.vanzonneveld.net
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Ash Searle (http://hexmen.com/blog/)
	// +   improved by: Lincoln Ramsay
	// +   improved by: djmix
	// *     example 1: basename('/www/site/home.htm', '.htm');
	// *     returns 1: 'home'
	// *     example 2: basename('ecra.php?p=1');
	// *     returns 2: 'ecra.php?p=1'
	var b = path.replace(/^.*[\/\\]/g, '');
	if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
		b = b.substr(0, b.length - suffix.length);
	}
	return b;
}

// start javascript countdown (http://www.developphp.com/view.php?tid=1248)
// don't forget to pass the broadcast variable
function cdtd(broadcast) {
	/* just about any standard date format is accepted */
	var nextinternetbroadcast = new Date(broadcast);
	var now = new Date();
	var timeDiff = nextinternetbroadcast.getTime() - now.getTime();
	if (timeDiff <= 0) {
		clearTimeout(timer);
		document.getElementById('nextinternetbroadcast').innerHTML = '<a href="javscript:openVideo(' + livepublishingpoint + ');">Join live service now<\/a>';
		/* Run any code needed for countdown completion here */
	}
	var seconds = Math.floor(timeDiff / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	hours %= 24;
	minutes %= 60;
	seconds %= 60;
	document.getElementById('nextinternetbroadcast').className += " notlive";
	document.getElementById('nextinternetbroadcast').innerHTML = 'Live in <span class="days">' + days + '</span>, <span class="hours">' + hours + '</span>, <span class="minutes">' + minutes + '</span>';
	/*
	// if you want to break out the time bits (useful if you want to be able to shorten (D)ays and such
	document.getElementById("daysBox").innerHTML = days + " D";
	document.getElementById("hoursBox").innerHTML = hours + " H";
	document.getElementById("minsBox").innerHTML = minutes + " M";
	// seconds isn't in our html code (javascript error if this isn't commented out)
	// document.getElementById("secsBox").innerHTML = seconds + " S";
	*/
	var timer = setTimeout(function() { cdtd(broadcast); }, 1000);
}

// get URL queries ?name1=value1&name2=value2 and turns them into javascript variables
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39575525-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/* testing functions
function yo() {
	alert('Yo')
};
$(document).ready(yo);
*/







