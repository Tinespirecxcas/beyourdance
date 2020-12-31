$(document).ready(function(){function e(e,t,s,i){$.ajax({url:API_ROOT+"/api/popup-rules/",type:"POST",contentType:"application/json",data:JSON.stringify(e),success:t,error:s,complete:i})}function t(t){var s=function(t){var s=!0,n=window.popupsRules[t].ruleUpTimes,a=window.popupsRules[t].ruleDisableDevices;n&&(n.status&&(n.count+=1,n.status=n.count<=n.limit,e({pageId:pageId,popupId:t,field:"ruleUpTimes"},function(e){n.count=e.count})),s=n.status);s&&a&&a.devices.length&&(a.status=i(a.devices));return s&&o(t)}(t);return s&&($(".modal-visible").removeClass("modal-visible"),$("#"+t).addClass("modal-visible")),s}function s(){return $(".modal-visible").length}function i(e){var t,s=$(window).width();return t=s>961?"desktop":s<=960&&s>769?"tablet":"mobile",!e.includes(t)}function o(e){return Object.values(window.popupsRules[e]).every(function(e){return e.status})}!function(){window.popupsTriggers={},window.popupsRules={};var n=function(e,t){return function(){window.popupsRules[e][t]=!0}};$(".modal-element").each(function(){var a=$(this),u=a.attr("id"),r=0,l=function(e){e&&r&&r--,!r&&o(u)&&function(e){var i=e,o=i.attr("id");if(window.popupsTriggers[o]={},i.data("page-load")){var n=parseInt(i.data("page-load-delay"));setTimeout(function(){t(o)&&(window.popupsTriggers[o].onPageLoad={status:!0})},1e3*n)}if(i.data("scroll")){var a=i.data("scroll-type"),u=parseInt(i.data("scroll-value")),r=$(window).scrollTop();window.popupsTriggers[o].onScroll={status:!1};var l=window.popupsTriggers[o].onScroll,p=function(){if(!s()){var e=$(window).scrollTop(),i=100*e/($(document).height()-$(window).height()),n=u-5,c=u+5;!l.status&&("down"===a&&e>r||"up"===a&&e<r)&&i>n&&i<c&&(t(o)&&(l.status=!0),$(window).off("scroll resize",p)),r=e}};$(window).on("scroll resize",p),p()}if(i.data("scroll-element")){var c=i.data("scroll-element-selector"),d=$(c);if(d.length){window.popupsTriggers[o].onScrollElement={status:!1};var w=window.popupsTriggers[o].onScrollElement,g=function(){if(!s()){var e=d.offset().top,i=e+d.outerHeight()/2,n=$(window).scrollTop();i<n+$(window).height()&&e>n&&!w.status&&(t(o)&&(w.status=!0),$(window).off("resize scroll",g))}};$(window).on("resize scroll",g),g()}}if(i.data("click")){window.popupsTriggers[o].onClick={status:!1,count:0};var v=window.popupsTriggers[o].onClick,f=parseInt(i.data("click-count")),m=function(){s()||(v.count+=1,!v.status&&v.count>=f&&(t(o)&&(v.status=!0),document.removeEventListener("click",m)))};document.addEventListener("click",m)}if(i.data("inactivity")){var T=parseInt(i.data("inactivity-time"));window.popupsTriggers[o].onInactivity={status:!1,time:0};var I=window.popupsTriggers[o].onInactivity,h=function(){I.time=0};$(window).on("mousemove click keypress",h);var b=setInterval(function(){I.time+=1,I.time>=T&&(t(o)&&(I.status=!0),$(window).off("mousemove click keypress",h),clearInterval(b))},1e3)}i.data("page-exit")&&$("body").one("mouseleave",function(){t(o)&&(window.popupsTriggers[o].onPageExit={status:!0})})}(a)};window.popupsRules[u]={};var p={pageId:pageId,popupId:u};if(a.data("arriving")){var c=a.data("arriving-include"),d=a.data("arriving-exclude"),w=!0,g=!0;c&&(w=!!document.referrer&&(document.referrer.includes(c)||c.includes(document.referrer))),d&&document.referrer&&(g=!document.referrer.includes(d)&&!d.includes(document.referrer)),window.popupsRules[u].ruleArriving={status:w&&g}}var v=window.popupsRules[u].ruleDisableDevices={status:!0,devices:[]};if(["desktop","tablet","mobile"].forEach(function(e){a.data(e)&&v.devices.push(e)}),v.devices.length&&(v.status=i(v.devices)),a.data("page-views")){var f=parseInt(a.data("page-views-count"));r++,e(Object.assign({},p,{field:"rulePageViews"}),function(e){window.popupsRules[u].rulePageViews={count:e.count,limit:f,status:e.count>=f}},n(u,"rulePageViews"),l)}if(a.data("page-sessions")){var m=parseInt(a.data("page-sessions-count")),T=!!sessionStorage.getItem("popupRuleSession"+u);r++,e(Object.assign({},p,{field:"rulePageSessions",value:T?0:1}),function(e){T||sessionStorage.setItem("popupRuleSession"+u,"1"),window.popupsRules[u].rulePageSessions={count:e.count,limit:m,status:e.count>=m}},n(u,"rulePageSessions"),l)}if(a.data("times")){var I=parseInt(a.data("times-count"));r++,e(Object.assign({},p,{field:"ruleUpTimes",value:0}),function(e){window.popupsRules[u].ruleUpTimes={count:e.count,limit:I,status:e.count<=I}},n(u,"ruleUpTimes"),l)}r||l()})}()});