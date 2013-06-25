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
function openStreamingVideo(url) {
	$('body').append('<div id="videowrapper" onclick="closeVideo();"><a href="javascript:void(0)" onclick="closeVideo();">x</a><video src="' + url + '" poster="http://www.flcbranson.org/images/Posters/Flcb.jpg" autoplay controls x-webkit-airplay="allow" loop></video></div>');
}
function openMp3Video(url) {
	$('body').append('<div id="videowrapper" onclick="closeVideo();"><a href="javascript:void(0)" onclick="closeVideo();">x</a><video src="' + url + '" poster="http://www.flcbranson.org/images/Posters/' + basename(url, '.mp3') + '.jpg" autoplay controls x-webkit-airplay="allow" loop></video></div>');
}
function openMp4Video(url) {
	$('body').append('<div id="videowrapper" onclick="closeVideo();"><a href="javascript:void(0)" onclick="closeVideo();">x</a><video src="' + url + '" poster="http://www.flcbranson.org/images/Posters/' + basename(url, '.mp4') + '.jpg" autoplay controls x-webkit-airplay="allow" loop></video></div>');
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







