var isLogin = false;
var selection = null;
var obj = null;
var enrichObj = null;
//监听ContentScripts的port传递过来的msg
chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		//预处理选择内容
		if (msg.selection != undefined) {
			selection = msg.selection;
			var xmlhttp = new XMLHttpRequest();
			var params =  "content=" + selection;
			xmlhttp.open("POST", "http://localhost:8080/read/chrome/highlight",
					false);
			xmlhttp.setRequestHeader("Content-type",
					"application/x-www-form-urlencoded");
			xmlhttp.send(params);
			obj = eval("(" + xmlhttp.responseText + ")");
			port.postMessage({
				search : "done",
				type: "searchOver",
				object: obj
			});
		}
		//进入新页面
		if (msg.check != undefined) {
			//判断是否登录
			if (isLogin)
				port.postMessage({
					value : "true"
				});
			else
				port.postMessage({
					value : "false"
				});
			//预处理将网页内容全文增强。
			var xmlhttp = new XMLHttpRequest();
			var params =  "content=" + msg.innerHtml;
			xmlhttp.open("POST", "http://localhost:8080/read/chrome/algorithmEnhance/", false);
			xmlhttp.setRequestHeader("Content-type",
				"application/x-www-form-urlencoded");
			xmlhttp.send(params);
			enrichObj = eval("(" + xmlhttp.responseText + ")");
		}
		//当用户点击了高亮搜索按钮，type为display，则ContentScripts显示侧边栏
		if (msg.search != undefined) {
			if (msg.search == "keywords") {
					port.postMessage({
						search : "done",
						type: "display",
						object: obj
					});
				}
			}
	});
});

