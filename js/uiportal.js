$(document).ready(function(){function ruzhu(){location.href=""==portal.user.userCode?"enterprise.html#/guide/isNotLogin":"enterprise.html#/guide/isLogined"}function login(){var loginName=$("#loginName").val(),password=$("#password").val(),rememberMe="on"==$("#rememberMe").val()?1:0;portal.login(loginName,password,rememberMe,function(data){data.success?(portal.showUser(),$("#loginModal").hide(),portal.getPortals(portal.user.userCode,function(data){data.success&&(console.log("ucenter::login::getPortals"),portal.getAppModules(portal.getCurrentUser().portal.groupId,function(){console.log("ucenter::login::success"),$.event.trigger({type:"LoginEvent",message:{}})},function(){}))})):($("#errorMsg .error").html(data.error),$("#errorMsg").show())})}function loginInfoChange(){$("#errorMsg").hide()}function showRegister(){window.location.href="/reg.html#/cell"}function close(){$("#loginModal").hide()}function search(){var query=$("#searchInput").val();if(encodeQuery=encodeURIComponent(encodeURIComponent(query)),void 0==query||""==query||""==query.trim())return $("#searchmsg").html("请输入查询信息!").show(300).delay(3e3).hide(300),void 0;var searchUrl="/projectHome.html#/search/:enterpriseCode/:qtext",orgId=$("#org").val();searchUrl=searchUrl.replace(":enterpriseCode",orgId),searchUrl=searchUrl.replace(":qtext",encodeQuery);var url=searchUrl;searchHistory._addCookie(query),window.open(url)}function close(){$("#consoleLoginModal").hide()}$("#ulogin").click(portal.showLogin),$("#ruzhuBtn").click(ruzhu),$("#header_rz").bind("click",ruzhu),$("#loginBtn").click(login),$(".user-login.header-userinfo").hover(function(){$("#menu").css("display","block")},function(){$("#menu").css("display","none")}),$("#loginModal input").change(loginInfoChange),$("#ulogout").click(function(){portal.logout(function(){console.log("ucenter::logout::success"),$.event.trigger({type:"LogOutEvent",message:{}})})}),$("#uregister").click(showRegister),$("#loginModal .close").on("click",function(){$("#loginModal").hide()}),$("#org").change(function(){$(".nlogo img").attr("src",$("#org").find("option:selected").attr("data-logo")),$("#org").attr("title",$("#org").find("option:selected").text().trim());var ustate=$("#org").find("option:selected").attr("data-ustate");"true"==ustate?$(".houtai").show():$(".houtai").hide(),portal.getAppModules($("#org").find("option:selected").val(),function(){})}),$(".nlogo").on("click",function(){var orgId=$("#org").val();if("1"!=orgId){var enterprisePage="/projectHome.html#/enterprisePage/"+orgId;window.open(enterprisePage)}else window.location.href="/"}),$('form[name="searchForm"] .ninput-group button').click(search),$(".nwarp .phone").hover(function(){$(".nwarp .phone div").css("display","block")},function(){$(".nwarp .phone div").css("display","none")}),$("#uinfo").click(function(){window.location.href="/userInfo.html#/base"}),$("#uattention").click(function(){window.location.href="userInfo.html#/attention/1"}),$("#ucollection").click(function(){window.location.href="userInfo.html#/collection"}),$("#consoleLoginModal .close").click(close),$("#consoleLoginModal input").change(function(){$("#consoleErrorMsg").hide()}),portal.showConsoleLogin=function(){$('form[name="consoleLoginForm"]')[0].reset(),$("#consoleLoginModal").show()},$(".houtai").bind("click",function(){portal.showConsoleLogin()}),$("#consoleLoginBtn").bind("click",function(){$("#consoleErrorMsg").hide();var flag=!1,pw=$("#consolePassword").val();if(void 0==pw||""==pw||""==pw.trim())return $("#consoleErrorMsg .error").html("请输入密码!"),$("#consoleErrorMsg").show(),!1;var enterpriseCode=portal.getCurrentUser().portal.groupId,loginName=portal.getCurrentUser().user.loginPhone;return $.ajax({url:"/console/sys/login?t="+(new Date).getTime(),data:JSON.stringify({loginName:loginName,password:pw}),type:"POST",dataType:"json",async:!1,contentType:"application/json; charset=utf-8",success:function(data){return data.success?($.cookie("userCode",'"'+data.code+'"',{path:"/console"}),$.cookie("loginName",'"'+data.loginName+'"',{path:"/console"}),$.cookie("name",'"'+data.name+'"',{path:"/console"}),$.cookie(data.code,'"'+enterpriseCode+'"',{path:"/console/resources"}),$.cookie("web.session.id",data.session,{path:"/console"}),$.cookie("app-token",data.app_token,{path:"/console"}),$("#consoleLoginModal").hide(),window.open("/console/resources/main.html"),!0):($("#consoleErrorMsg .error").html("登录失败，请输入正确的密码!"),$("#consoleErrorMsg").show(),!1)},failure:function(){return $("#consoleErrorMsg .error").html("登录失败，请输入正确的密码!"),$("#consoleErrorMsg").show(),!1}}),flag})});