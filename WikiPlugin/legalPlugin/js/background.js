var keywords=null;
console.log("get keywords common");
var xmlhttp = new XMLHttpRequest();
var params = "bookId=" + 223;
xmlhttp.open("POST", "http://localhost:8080/read/chrome/wiki",
	false);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(params);
keywords = JSON.parse(xmlhttp.response);


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	if ("getWiki" == request.message) {
// 		var xmlhttp = new XMLHttpRequest();
// 		var params = "bookId=" + 223;
// 		xmlhttp.open("POST", "http://localhost:8080/read/chrome/wiki",
// 			false);
// 		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 		xmlhttp.send(params);
// 		keywords = JSON.parse(xmlhttp.response);
// 		// keywords.forEach(function (element) {
// 		// 	console.log("keyword:"+element.keyword);
// 		// });
//
// 	}
// });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("getOptions" == request.message) {
		console.log("receive getOptions background");
		if ("undefined" != typeof localStorage) {
			chrome.tabs.query({
					"active": true,
					"currentWindow": true
				},
				function(tabs) {
					if ("undefined" != typeof tabs[0].id && tabs[0].id) {
						chrome.tabs.sendMessage(tabs[0].id, {
							"message": "returnOptions",
							"remove": request.remove,
							"keywords":  keywords,
							"foreground": localStorage.getItem("foreground") || "#000000",
							"background": localStorage.getItem("background") || "#ffff00"
						});
					}
				}
			);
		}
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("removeKeywords" == request.message) {
		chrome.tabs.query({
				"active": true,
				"currentWindow": true
			},
			function(tabs) {
				if ("undefined" != typeof tabs[0].id && tabs[0].id) {
					chrome.tabs.sendMessage(tabs[0].id, {
						"message": "removeKeywords"
					});
				}
			}
		);
	}
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("showOccurrences" == request.message) {
		var showOccurrences = localStorage.getItem("showOccurrences");
		showOccurrences = "true" == showOccurrences || null == showOccurrences;

		chrome.browserAction.setBadgeText({
			"text": showOccurrences && request.occurrences ? String(request.occurrences) : "",
			"tabId": sender.tab.id
		});
	}
});
