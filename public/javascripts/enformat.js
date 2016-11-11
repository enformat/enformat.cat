$(document).ready(function(){
 	 
     if (!checkCookie()){     
        $('#privacity').show();       
     }
     
     
     $('.close-privacity').click(function(){
        
           $('#privacity').hide();  
           setCookie('privacity', '777', '1000000'); 
     })
     
     
 	 $('.bxslider').bxSlider({
		 auto: true,
		 pager: false,
		 speed : 700 
 	 });

 
 	 $('.action-menu').click(function(){

 	 			if ($(this).is('.open')){

 	 					$('.action-menu').animate({ right : '10' },100).removeClass('open');
 	 					$('header nav ul').stop().hide().animate({ right : '-322' },100)
 	 			}else{

 	 					$('.action-menu').animate({ right : '309' },100).addClass('open');
 	 					$('header nav ul').stop().show().animate({ right : '0' },100)

 	 			}

 	 })

 	 
 	 $('.jump').click(function(){
 	 	if (is_mobile()) {$('.action-menu').click()};
        var link = $(this);
        var anchor  = link.attr('href');
        $('html, body').stop().animate({
            scrollTop: jQuery(anchor).offset().top
        }, 2000);
        return false;
     });

 	 
 	 if(window.location.hash) {
 	 			$('nav ul a[href="'+window.location.hash+'"]').click()
	 }  

});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var privacity = getCookie("privacity");
    return (privacity != "") ? true : false;
     
}

function is_mobile(){
    
        var w = $(window).width();
        
        return (w <= 480) ? true : false;
    
}