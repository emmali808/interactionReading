function loadOptions() {
	// chrome.runtime.sendMessage({
	// 	"message": "getWiki"
	// });
	// var xmlhttp = new XMLHttpRequest();
	// var params = "bookId=" + 223;
	// xmlhttp.open("POST", "http://localhost:8080/read/chrome/wiki",
	// 	false);
	// xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	// xmlhttp.send(params);
	// var keywords = JSON.parse(xmlhttp.response);
	// //cannot use localstorage to store keywords
	// chrome.extension.getBackgroundPage().keywords=keywords;
	if ("undefined" != typeof localStorage) {
		document.getElementById("colorForeground").value = localStorage.getItem("foreground") || "#000000";
		document.getElementById("colorBackground").value = localStorage.getItem("background") || "#ffff00";
	}
}

function saveOptions() {

	if ("undefined" != typeof localStorage) {
		localStorage.setItem("foreground", document.getElementById("colorForeground").value);
		localStorage.setItem("background", document.getElementById("colorBackground").value);
	}
}
