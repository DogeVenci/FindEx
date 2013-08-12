
var lastTab;

chrome.browserAction.onClicked.addListener(function(tab) {
  //chrome.tabs.executeScript(null,{code:"document.body.bgColor='red'"});
  //getdata();
});

chrome.contextMenus.create({
  "type": "normal",
  "title": "FindEx '%s'",
  "contexts": ["selection"],
  "onclick": function(info, tab) {
    //alert(info.selectionText);
    //checkurl("http://www.163.com");
    //$("a[href]").attr('href','http://www.geeku.org');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      lastTab=tabs[0].id;
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "open"}, function(response) {
        
      });
    });

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://btdigg.org/search?info_hash=&q="+info.selectionText, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON解析器不会执行攻击者设计的脚本.
          var t=xhr.responseText;
          //$(t).find("#search_res tbody").each(function(){
            //var text=$(this).html();
            var text=$(t).find("#search_res>table>tbody").html();
            //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(lastTab, {greeting: text}, function(response) {
                console.log("SendMsg response text OK!!!");
              });
            //});
         // });
      }
    }
    xhr.send();
    
  }
}, function() {});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
});