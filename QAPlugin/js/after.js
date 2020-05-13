var range = null;
var port = chrome.runtime.connect();
var left = null;
var topp = null;
var obj2 = null;
var isSearch = null;

var sidebarDiv          = document.createElement("div");
var resultDiv           = document.createElement("div");
var navDiv              = document.createElement("div");
sidebarDiv.id           = "sidebarDiv";
resultDiv.id            = "resultDiv";
navDiv.id               = "navDiv";
navDiv.innerHTML        = "<button id = 'minButton' class = 'windowButton'>-</button><button id = 'maxButton' class = 'windowButton'>+</button>";
sidebarDiv.appendChild(navDiv);
sidebarDiv.appendChild(resultDiv);
document.body.appendChild(sidebarDiv);


document.getElementById("minButton").onclick=function(){
	sidebarDiv.style.height = "25px";
};

document.getElementById("maxButton").onclick=function(){
	sidebarDiv.style.height = window.innerHeight-50 + "px";
};


var available = false;
port.onMessage.addListener(function(msg) {
	if (msg.value != undefined) {
		if (msg.value == "true")
			available = true;
		else
			available = false;
	}
	if (msg.type == "searchOver"){
		obj2 = msg.object;
		isSearch = true;
		if (msg.search == "done"){
			displaySearchResults();
		}
	}
});


var array = [];
array.push(document.body);
var s = '';
while (array.length != 0) {
	var element = array.pop();
	if (element.nodeType == 3) {
		s = s + element.nodeValue;
	} else {
		if (element.nodeType == 1
			&& (element.nodeName == 'SCRIPT' || element.nodeName == 'STYLE')) {

		} else {
			// console.log(element.nodeName);
			var num = element.childNodes.length - 1;
			for (; num >= 0; num--) {
				array.push(element.childNodes[num]);
			}
		}
	}
}
s= s.replace("&","")
s=s.replace(/<[^>]*>|/g,"");
s= s.replace(/[^a-zA-Z ]/g, "");
port.postMessage({
	check : "test",
	innerHtml : s
});

window.document.body.addEventListener("mouseup", function() {
	document.getElementById('search1').style.display = "block";
	if (available == true) {
		if (window.rangy.getSelection().getRangeAt(0).toString() != "") {
			document.getElementById('search1').style.display = "block";
			document.getElementById('search1').style.left = left + "px";
			document.getElementById('search1').style.top = topp + "px";
			if (range != null) {
				var a = document.getElementsByTagName("span");
				for ( var i = 0; i < a.length; i++) {
					if (a.item(i).className == "highlight")
						a.item(i).className = "";
				}
			}
			cssApplier.applyToRange(window.rangy.getSelection().getRangeAt(0));
			var a = document.getElementsByTagName("span");
			var str = "";
			for ( var i = 0; i < a.length; i++) {
				if (a.item(i).className == "highlight")
					str = str + a.item(i).innerHTML;
			}
			range = window.rangy.getSelection().getRangeAt(0);
			isSearch = false;
			port.postMessage({
				selection : str
			});
		}
	}
});


document.onmousemove = function(ev) {
	left = ev.clientX;
	topp = ev.clientY;
};

var para = document.createElement("div");
para.id = "search1";
var a1 = document.createElement("a");
var i1 = document.createElement("img");
i1.src = "http://chuantu.xyz/t6/731/1587905975x2890211638.png";
i1.width = "20";
i1.height = "20";
i1.title = "Search the selection";
a1.appendChild(i1);
para.appendChild(a1);



document.body.appendChild(para);

a1.onclick = function() {
	document.getElementById('search1').style.display = "none";
	port.postMessage({
		search : "keywords"
	});

};



var displaySearchResults = function() {
	var number_of_annotations = obj2.qaNum;
	resultDiv.innerHTML = "";
	for (var i = 0; i < number_of_annotations; i++) {
		var innerHTML = "";
		var annotationDiv = document.createElement("div");
		innerHTML += "<div class='feeds'>";
		innerHTML += "<div class='inner'><span class='yellow'><a> question: "
			+ obj2.qas[i].question + "</a></span></div>";
		innerHTML += "<div class='inner'><a> answer: " + obj2.qas[i].answer.substring(0, 150) + "</a></div></div>";
		annotationDiv.innerHTML = innerHTML;
		resultDiv.appendChild(annotationDiv);
	}
	var bodyWidth                        = window.innerWidth-320;
	var sidebarHeight                    = window.innerHeight-50
	document.body.style.width            = bodyWidth+'px';
	sidebarDiv.style.width               = "310px";
	sidebarDiv.style.height              = sidebarHeight+'px';
};



