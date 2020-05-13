var obj2 = chrome.extension.getBackgroundPage().enrichObj;
var number_of_annotations = obj2.qaNum;

for ( var i = 0; i < number_of_annotations; i++) {

    document.write("<div class='feeds'>")
    document.write("<div class='content'><span class='yellow'><a> question: "
        + obj2.qas[i].question + "</a></span></div>");
    document.write("<div><a> answer: " + obj2.qas[i].answer + "</a></div></div>");
}

