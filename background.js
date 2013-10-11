
var lastTab;

//chrome.browserAction.onClicked.addListener(function(tab) {
  //chrome.tabs.executeScript(null,{code:"document.body.bgColor='red'"});
  //getdata();
//});
BTDIGG="https://btdigg.org/search?info_hash=&q=";
XIAZAIFM="http://www.xiazai.fm/?s=";
function XHRSend(url,keyword){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url+keyword, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON解析器不会执行攻击者设计的脚本.
          var t=xhr.responseText;
          //$(t).find("#search_res tbody").each(function(){
            //var text=$(this).html();
            //var text=$(t).find("#search_res>table>tbody").html();
            var text=$(t).find("#minWMaxW>div.Main>div.Right>div.Result>ul.WebList").html()
            //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(lastTab, {greeting: text}, function(response) {
                console.log("SendMsg response text OK!!!");
              });
            //});
         // });
      }
    }
    xhr.send();
};

chrome.contextMenus.create({
  "type": "normal",
  "title": "FindEx '%s'",
  "contexts": ["selection"],
  "onclick": function(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      lastTab=tabs[0].id;
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "open"}, function(response) {
        
      });
    });

    XHRSend(XIAZAIFM,info.selectionText);
    
  }
}, function() {});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");

    chrome.tabs.sendMessage(sender.tab.id, {greeting: "open"}, function(response) {
    });
    lastTab=sender.tab.id;

    XHRSend(XIAZAIFM,request.greeting);
});