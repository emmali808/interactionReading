document.getElementById("signin").onclick = function() {
	location.href = "popup.html";
};

document.getElementById("signup").onclick = function() {
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	email = document.getElementById("email").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:8080/register", false);
	xmlhttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	xmlhttp
			.send("name="
					+ username + "&pass=" + password + "&email=" + email);
	var obj = eval("(" + xmlhttp.responseText + ")");
	if (xmlhttp.status != "200") {
		document.getElementById("error").innerHTML = obj.message;
	}
	if (xmlhttp.status == "200") {
		chrome.extension.getBackgroundPage().isLogin = true;
		chrome.extension.getBackgroundPage().uid = obj.id;
		chrome.extension.getBackgroundPage().account = obj.account;
		location.href = "profile.html";
	}
};
