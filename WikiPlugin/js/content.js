function keywordsHighlighter(options, remove) {

	function highlight(node, pos, element, options) {

		//popover whole
		var div1=document.createElement("div");
		div1.id="popover-"+count;
		div1.className="popover";
		div1.className+=" fade";
		div1.className+=" top";
		div1.className+=" in";
		div1.setAttribute("role","tooltip");
		div1.setAttribute("style","visibility:hidden;top: 27.6px; left: 0px;display:block;width:430px;max-width:600px;");

		//arrow
		var div11=document.createElement("div");
		div11.className="arrow";
		div11.setAttribute("style","left: 45.4214%;");

		//popover title
		var h3=document.createElement("h3");
		h3.className="popover-title";
		h3.innerText=element.title;

		//popover content
		var div12=document.createElement("div");
		var len=element.summary.length-5;
		var minlen=Math.min(len,290);
		var index=element.summary.indexOf(' ',minlen);
		if(index!=-1) var text=element.summary.substring(0,index);
		else text=element.summary.substring(0,300);
		div12.className="popover-content";
		div12.innerText=text+"...";

		//popover link
		var button=document.createElement("button");
		button.setAttribute("type","button");
		button.className="btn";
		button.className+=" btn-link";
		button.innerText=element.url;
		var linkdiv=document.createElement("div");
		linkdiv.innerText="Read more: ";
		linkdiv.appendChild(button);

		div12.appendChild(linkdiv);

		div1.appendChild(div11);
		div1.appendChild(h3);
		div1.appendChild(div12);

		//pop span
		var span=document.createElement("span");
		span.className="highlighted";
		span.id = "highlighted-"+count;
		span.style.backgroundColor = options.background;
		span.style.color = options.foreground;
		span.style.cursor="pointer";
		span.innerText=element.keyword;

		//parent div
		var div0=document.createElement("div");
		div0.setAttribute("style","display: inline-block;");
		div0.appendChild(span);
		div0.appendChild(div1);

		//get keyword in node
		var highlighted = node.splitText(pos);
		/*var afterHighlighted = */highlighted.splitText(element.keyword.length);
		// var highlightedClone = highlighted.cloneNode(true);
		// span.appendChild(highlightedClone);
		highlighted.parentNode.replaceChild(div0, highlighted);



		let popSpan=document.getElementById('highlighted-'+count);
		let popover=document.getElementById('popover-'+count);
		let popoverHeight=popover.offsetHeight;

		let left=popSpan.offsetLeft-178;
		let top=popSpan.offsetTop-popoverHeight-5;

		popover.style.top=top+"px";
		popover.style.left=left+"px";



		let arrow=document.getElementsByClassName("arrow");

		console.log("popover height:"+popoverHeight);
		console.log("popover位置："+$('#popover-'+count).offset().left+","+$('#popover-'+count).offset().top);
		console.log("arrow位置 ："+$('.arrow').offset().left+","+$('.arrow').offset().top);
		console.log("span位置 ："+$('#highlighted-'+count).offset().left+","+$('#highlighted-'+count).offset().top);

		popSpan.addEventListener('click', popup);

		function popup(){
			let style=popover.style;
			if(popover.style.visibility=="visible"){
				popover.style.visibility="hidden";
			}else{
				popover.style.visibility="visible";
			}
		}
	}

	function addHighlights(node, keywords, options) {
		var skip = 0;
		var i;
		if (3 == node.nodeType) {
			options.keywords.forEach(function (element) {
				var keyword=element.keyword.toLowerCase();
				var pos = node.data.toLowerCase().indexOf(keyword);
				if (0 <= pos) {
					// console.log("document:"+node.data+"\nkeyword:"+keyword+" pos:"+pos);

					highlight(node, pos, element,options);
					count=count+1;
					skip = 1;
				}
			});
		}
		else if (1 == node.nodeType && !/(script|style|textarea)/i.test(node.tagName) && node.childNodes) {
			for (i = 0; i < node.childNodes.length; i++) {
				i += addHighlights(node.childNodes[i], keywords, options);
				// console.log("childNodex"+i+":"+node.childNodes[i].data);
			}
		}

		return skip;
	}

	function removeHighlights(node) {
		var span;
		while (span = node.querySelector("span.highlighted")) {
			span.outerHTML = span.innerHTML;
		}
	}

	if (remove) {
		removeHighlights(document.body);
	}


	var newKeywords=[];
	options.keywords.forEach(function (element) {
		newKeywords.push(element.keyword);
		// console.log("content keyword:"+element.keyword);
	});
	// delete options.keywords;
	var count=0;
	addHighlights(document.body, newKeywords, options);

	//显示高亮个数
	// chrome.runtime.sendMessage({
	// 	"message": "showOccurrences",
	// 	"occurrences": occurrences
	// });
}

function removeHighlights(node) {
	var span;
	while (span = node.querySelector("span.highlighted")) {
		span.outerHTML = span.innerHTML;
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("removeKeywords" == request.message) {
		removeHighlights(document.body);
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("returnOptions" == request.message) {
		if ("undefined" != typeof request.keywords && request.keywords) {
			keywordsHighlighter({
					"keywords": request.keywords,
					"foreground": request.foreground,
					"background": request.background
				},
				request.remove
			);
		}
	}
});


// chrome.runtime.sendMessage({
// 	"message": "getOptions",
// 	"remove": false
// });
