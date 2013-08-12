 var loader=chrome.extension.getURL("images/ajax-loader.gif");
var loadimg=$('<img src='+loader+'>');
var a = $('<div id="div2" style="background-color:#E8E9E6;border:1px solid #ccc;margin-top: 10px;padding: 0.5% 0.6%;overflow:auto;display:none"></div>');
$('body').append(a);
var x;
var y;

document.onmouseup = function(e) {
  if (e.button==2) {
    x = e.pageX;
    y = e.pageY;
    var test=$(window).width();
    if (x>($(window).width()-750)) {
      x=$(window).width()-750;
    }
    if (y>($(document).height()-350)) {
      y=$(document).height()-350;
    }
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
  $("#div2").css('text-align',"center");
  $("#div2").css('overflow',"auto");
  $("#div2").css('line-height',"300px");
  $("#div2").append(loadimg);
  $("#div2").fadeIn(600);
  $("#div2").css('z-index',"99999");
  //getData();

};

function hideDlg() {
  $("#div2").fadeOut(600);
  $("#div2").empty();
};

function showSearch(){
  $("#div2").empty();
  $("#div2").css('left', "35%");
  $("#div2").css('top', $(window).height()/2);
  $("#div2").css('height',"25px");
  $("#div2").css('width',"30%");
  $("#div2").css('position', "fixed");
  $("#div2").css('overflow',"");
  var search=$('<input type="text" style="width:100%;height:90%" >');
  $("#div2").append(search);
  $("#div2").fadeIn(600);
  $("#div2").css('z-index',"99999");
  $("#div2 input")[0].focus();
  $("#div2 input").bind('keydown', function (e){
    if(e.keyCode==13){
      var val=$("#div2 input").val();
      chrome.runtime.sendMessage("", {greeting: val}, function(response) {
                console.log("SendMsg response text OK!!!");
       });
      hideDlg();
      
    }
  });
};



$(document).click(function(){
   if ($(event.srcElement).is("#div2,#div2 *")) { 
     // alert('内部区域'); 
      } else {
      //alert('你的点击不在目标区域');
      hideDlg();
    } 
});


$(document).keyup(function(e){
  if (e.which==86) {
    
       //alert("123");
       showSearch();
  }
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting == "open")
      showDlg();
    else {
      sendResponse({
        farewell: request.greeting
      });
      var b = $(request.greeting);
      $('#div2 img').remove();
      $("#div2").css('text-align',"");
      $("#div2").css('line-height',"");
      $('#div2').append(b);
    }
});