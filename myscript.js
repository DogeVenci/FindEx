//$("a[href]").attr('href','http://www.geeku.org');
//$.each($("div"),function(){
//    bg=$(this).css('background');
//    //alert(color.search(/.*?\.jpg/));
//    if(bg.search(/.*?\.jpg/)!=-1){
//      //alert("123");
//      $(this).css('opacity',0.2);
//    }
//  });

var loader=chrome.extension.getURL("images/ajax-loader.gif");
var loadimg=$('<img src='+loader+'>');
var a = $('<div id="div2" style="background-color:#E8E9E6;border:1px solid #ccc;margin-top: 10px;padding: 5px 15px;overflow:auto;display:none"></div>');
$('body').append(a);
var x;
var y;
document.onmouseup = function(e) {
  if (e.button==2) {
    x = e.pageX;
    y = e.pageY;
  }
  
  // do what you want with x and y
};



function getData() {
  $.ajax({
    type: "get",
    url: "http://btdigg.org/search?info_hash=&q=HAZ-003",
    beforeSend: function(XMLHttpRequest) {
      //ShowLoading();
    },
    success: function(data, textStatus) {

    },
    complete: function(XMLHttpRequest, textStatus) {
      //HideLoading();
    },
    error: function() {
      //请求出错处理
    }
  });
}

function showDlg() {
  $("#div2").css('left', x);
  $("#div2").css('top', y);
  $("#div2").css('height',"300px");
  $("#div2").css('width',"700px");
  $("#div2").css('position', "absolute");
  $("#div2").append(loadimg);
  $("#div2").fadeIn(600);
  //getData();

};

function hideDlg() {
  $("#div2").fadeOut(600);
  $("#div2").empty();
};
$(document).click(function(){
   if ($(event.srcElement).is("#div2,#div2 *")) { 
     // alert('内部区域'); 
      } else {
      //alert('你的点击不在目标区域');
      hideDlg();
    } 
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting == "1")
      showDlg();
    else {
      sendResponse({
        farewell: request.greeting
      });
      var b = $(request.greeting);
      $('#div2 img').remove();
      $('#div2').append(b);
    }


  });