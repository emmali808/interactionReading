document.getElementById("signin").onclick = function() {
	document.getElementById("error").innerHTML ="loading";
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	var xmlhttp = new XMLHttpRequest();
	var params = "name=" + username + "&pass="
		+ password;
	xmlhttp.open("POST",
					"http://localhost:8080/login", false);
	xmlhttp.setRequestHeader("Content-type",
		"application/x-www-form-urlencoded");
	xmlhttp.send(params);
	var obj = eval("(" + xmlhttp.responseText + ")");
	if (xmlhttp.status != 200) {
		document.getElementById("error").innerHTML = obj.message;
	}
	if (xmlhttp.status == 200) {
		chrome.extension.getBackgroundPage().isLogin=true;
		chrome.extension.getBackgroundPage().uid=obj.id;
		chrome.extension.getBackgroundPage().account=obj.account;
		location.href="profile.html";
	}
};

document.getElementById("signup").onclick = function() {
	location.href="signup.html";
};
