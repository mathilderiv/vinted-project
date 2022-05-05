var _lm_pixel_url = "https://vinted-1.leadsmonitor.io/pixel.gif";

function _lm_add_to_querystring (theQueryString, theKey, theValue)
	{
	var myQueryString = theQueryString;
	myQueryString += (theQueryString == "") ? "?" : "&";
	myQueryString += theKey + "=" + theValue;
	return myQueryString;
	};

var _lm_pixel_url_querystring = "";

var _lm_id = "";
Date.now = Date.now || function() { return +new Date; };
var _default_lm_id = Math.floor(Date.now() * Math.random()).toString(36).toUpperCase()
		+ Math.floor(Date.now() * Math.random()).toString(36).toUpperCase();

if (typeof localStorage !== "undefined")
	{
	var localstorage_id = localStorage.getItem("_lm_id");
	if (localstorage_id) _lm_id = localstorage_id;
	};

if (_lm_id == "")
	{
	if (typeof document.cookie !== "undefined")
		{
		var myCookieMatches = document.cookie.match(/_lm_id=(.+)/);
		if (myCookieMatches != null)
			{
			var myId = myCookieMatches[1];
			_lm_id = myId;
			};
		};
	};

if (_lm_id == "") _lm_id = _default_lm_id;
	
if (typeof localStorage !== "undefined")
	{
	localStorage.setItem("_lm_id", _lm_id);
	};
var myExpirationDate = new Date();
myExpirationDate.setTime(myExpirationDate.getTime()+(365*24*60*60*1000));
document.cookie = "_lm_id=" + _lm_id + "; expires=" + myExpirationDate.toGMTString() + "; path=/;SameSite=None;Secure";

_lm_pixel_url_querystring += "?id=" + _lm_id;

if (typeof _lm_vars != "undefined")
	{
	if (typeof _lm_vars["device"] != "undefined")
		_lm_pixel_url_querystring = _lm_add_to_querystring(_lm_pixel_url_querystring, "device", _lm_vars["device"]);
	if (typeof _lm_vars["type"] != "undefined")
		_lm_pixel_url_querystring = _lm_add_to_querystring(_lm_pixel_url_querystring, "type", _lm_vars["type"]);
	if (typeof _lm_vars["zone"] != "undefined")
		_lm_pixel_url_querystring = _lm_add_to_querystring(_lm_pixel_url_querystring, "zone", _lm_vars["zone"]);
	if (typeof _lm_vars["revenue"] != "undefined")
		_lm_pixel_url_querystring = _lm_add_to_querystring(_lm_pixel_url_querystring, "revenue", _lm_vars["revenue"]);
	if (typeof _lm_vars["numclient"] != "undefined")
		_lm_pixel_url_querystring = _lm_add_to_querystring(_lm_pixel_url_querystring, "numclient", _lm_vars["numclient"]);
	if (typeof _lm_vars["toporder"] != "undefined")
		_lm_pixel_url_querystring = _lm_add_to_querystring(_lm_pixel_url_querystring, "toporder", _lm_vars["toporder"]);
	};

if (typeof document.referrer !== 'undefined') {
    _lm_pixel_url_querystring += '&ref=' + encodeURIComponent(document.referrer);
};

_lm_pixel_url += _lm_pixel_url_querystring;
var _lm_pixel_tag = "<img src=\"" + _lm_pixel_url + "\" width=\"1\" height=\"1\" border=\"0\">";

if (document.getElementById('_lm_pix') != null)
	{
	var _lm_old_pix = document.getElementById('_lm_pix').innerHTML;
	document.getElementById('_lm_pix').innerHTML = _lm_old_pix + _lm_pixel_tag;
	}
else document.write(_lm_pixel_tag);
