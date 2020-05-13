if (chrome.extension.getBackgroundPage().profile == null) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://localhost:8080/getInfo/"
		+ chrome.extension.getBackgroundPage().uid , false);
	xmlhttp.send();
	chrome.extension.getBackgroundPage().profile = JSON
			.parse(xmlhttp.responseText);
}
var profile = chrome.extension.getBackgroundPage().profile;

document.getElementById("1").innerHTML = "Account:"+profile.account;
document.getElementById("2").innerHTML = "Salt: "+ profile.salt;
document.getElementById("3").innerHTML = "Email:  " + profile.email;
