var loader=chrome.extension.getURL("images/ajax-loader.gif");
var loadimg=$('<img src='+loader+'>');
var a = $('<div id="divFloat" style="background-color:#E8E9E6;border:1px solid #ccc;margin-top: 10px;padding: 0.5% 0.6%;overflow:auto;display:none"></div>');
$('body').append(a);
var x;
var y;

document.onmouseup = function(e) {
  if (e.button==2) {
    x = e.clientX;
    y = e.clientY;
    var test=$(window).width();
    if (x>($(window).width()-750)) {
      x=$(window).width()-750;
    }
    if (y>($(window).height()-350)) {
      y=$(window).height()-350;
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
  $("#divFloat").css({"left":x,"top":y,"height":"300px","width":"700px","position":"fixed","text-align":"center","overflow":"auto","line-height":"300px","font-size":"12px"});
  $("#divFloat").append(loadimg);
  $("#divFloat").fadeIn(600);
  $("#divFloat").css('z-index',"99999");
};

function hideDlg() {
  $("#divFloat").empty();
  $("#divFloat").fadeOut(600);
};

function showSearch(){
  $("#divFloat").empty();

  $("#divFloat").css({"left":"35%","top":$(window).height()/2,"height":"25px","width":"30%","position":"fixed","overflow":""});
  var search=$('<input type="text" style="width:100%;height:90%" >');
  $("#divFloat").append(search);
  $("#divFloat").fadeIn(600);
  $("#divFloat").css('z-index',"99999");
  $("#divFloat input")[0].focus();
  $("#divFloat input").bind('keydown', function (e){
    if(e.keyCode==13){
      var val=$("#divFloat input").val();
      //hideDlg();
      $("#divFloat").empty();
      chrome.runtime.sendMessage("", {greeting: val}, function(response) {
                console.log("SendMsg response text OK!!!");
       });
      
    }
  });
};



$(document).click(function(){
   if ($(event.srcElement).is("#divFloat,#divFloat *")) { 
     // alert('内部区域'); 
      } else {
      //alert('你的点击不在目标区域');
      hideDlg();
    } 
});


$(document).keyup(function(e){
  if (e.which==86&&!($("input,textarea").is(":focus"))) {
       showSearch();
  }
  else if (e.which==27) {
     hideDlg();
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
      $('#divFloat img').remove();
      $("#divFloat").css({"text-align":"","line-height":""});
      $('#divFloat').append(b);

      $("#divFloat a:link").css("color","#0038da");
      $("#divFloat li").css({"float":"left","width":"auto","list-style":"none","margin-right":"25px"});
      $("#divFloat .T1").css("padding-top","20px");
      $("#divFloat .BotInfo").css("font-size","small!important");
      var _href=$("#divFloat .T1 a").attr("href");
      if(_href){
        $("#divFloat .T1 a").attr("href","https://www.google.com.hk/search?q="+_href.split("/")[2]);
      }
      
    }
});