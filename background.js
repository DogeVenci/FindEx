var isUrlAvailable=false;
var a=$('<div id="div2" style="width:300;height:300;display:none">这是tip</div>');
$('body').append(a);
function showDlg(){
  $("#div2").css('left',event.clientX+10); 
  $("#div2").css('top',event.clientY+5); 
  $("#div2").css('position',"absolute"); 
  $("#div2").fadeIn(600);
};
function hideDlg(){
  $("#div2").fadeOut(600);
  $("#div2").empty();
};

chrome.browserAction.onClicked.addListener(function(tab) {
  //chrome.tabs.executeScript(null,{code:"document.body.bgColor='red'"});
  //getdata();
});

chrome.contextMenus.create({
  "type": "normal",
  "title": "'%s'",
  "contexts": ["all"],
  "onclick": function(info, tab) {
    //alert(info.selectionText);
    //checkurl("http://www.163.com");
    //$("a[href]").attr('href','http://www.geeku.org');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "1"}, function(response) {
        
      });
    });

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://btdigg.org/search?info_hash=&q="+info.selectionText, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON解析器不会执行攻击者设计的脚本.
          var t=xhr.responseText;
          $(t).find("#search_res").each(function(){
            var text=$(this).html();
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {greeting: text}, function(response) {
                console.log(response.farewell);
              });
            });
          });
      }
    }
    xhr.send();
    
  }
}, function() {});