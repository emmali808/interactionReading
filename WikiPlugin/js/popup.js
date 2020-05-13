document.addEventListener("DOMContentLoaded", function() {
	loadOptions();
	document.getElementById("buttonCancel").addEventListener("click", function() {
		window.close();
	});

	document.getElementById("buttonRemove").addEventListener("click", function() {
		window.close();
		chrome.runtime.sendMessage({
			"message": "removeKeywords"
		});
	});

	document.getElementById("buttonSave").addEventListener("click", function() {
		saveOptions();
		// window.close();
		chrome.runtime.sendMessage({
			"message": "getOptions",
			"remove": true
		});
	});
});

