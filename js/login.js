/////////////////////////////////////////
/*
 * 1.点击显示/隐藏
 */
window.onload=function(){
	var ewm = document.getElementsByClassName("ewm")[0];
	var oImg = ewm.getElementsByTagName("img")[0];
	var login = document.getElementsByClassName("login")[0];
	var login1 = document.getElementsByClassName("login1")[0];
	var login_note2 = document.getElementsByClassName("login_note2")[0];
	var oA = login_note2.getElementsByTagName("a")[0];
	var right_note = document.getElementsByClassName("right_note")[0];
	var oP = right_note.getElementsByTagName("p")[0];
	var login1_ewmBox = document.getElementsByClassName("login1_ewmBox")[0];
	
	var user = document.getElementById("user");
	var oInput_user = user.getElementsByTagName("input")[0];
	var pass = document.getElementsByClassName("pass")[0];
	var oInput_pass = pass.getElementsByTagName("input")[0];
	
	//蒙版
	var mb = document.getElementById("mb");
	var mb1 = document.getElementById("mb1");
	var md_1 = document.getElementsByClassName("md_1")[0];
	var mb_btn = md_1.getElementsByClassName("mb_btn")[0];
	
	//验证提示
	var oReminder = document.getElementById("oReminder");
	var oSubmit = document.getElementsByClassName("submit")[0]; 
	
	//设置cookie过期时间
	var date_1 = new Date();
	date_1.setDate(date_1.getDate()+30);
	
	var n = 0;
	var t = null;
	var time = null;
	//二维码点击
	ewm.onclick=function(){
		if(n==0){
			login.style.display="none";
			login1.style.display="block";
			oP.innerHTML="密码登录在这里 ";
			oP.style.cssText="margin: -28px 22px 0 0;";
			oImg.src="img/login_fyf_2.png";
			oImg.style.cssText="display: block;float: right;";
			if(login.style.display=="block"){
				clearInterval(t);
			}else{
				t = setInterval(time,15000);
			}
			n=1;
		}
		else{
			login1.style.display="none";
			login.style.display="block";
			oP.innerHTML="扫码登录更加安全";
			oP.style.cssText="";
			oImg.src="img/ewm.jpg";
			if(login.style.display=="block"){
				clearInterval(t);
			}else{
				t = setInterval(time,15000);
			}
			n=0;
			oInput_user.focus();//获取焦点
			user.style.border="1px solid #6FA4F5";
		}
	};
	//密码登录
	oA.onclick=function(){
		login1.style.display="none";
		login.style.display="block";
		oInput_user.focus();
		user.style.border="1px solid #6FA4F5";
		oImg.src="img/ewm.jpg";
		if(login.style.display=="block"){
			clearInterval(t);
		}else{
			t = setInterval(time,10000);
		}
		n=0;
	}
	//input获取焦点
	oInput_user.onfocus=function(){
		user.style.border="1px solid #6FA4F5";
	}
	oInput_user.onblur=function(){
		user.style.border="";
	}
	oInput_pass.onfocus=function(){
		pass.style.border="1px solid #6FA4F5";
	}
	oInput_pass.onblur=function(){
		pass.style.border="";
	}
	//蒙版
	time=function(){
		mb.style.display="block";
		mb1.style.display="block";
		md_1.style.display="block";
	};
	mb_btn.onclick=function(){
		mb.style.display="none";
		mb1.style.display="none";
		md_1.style.display="none";
	};
	//浏览器获取/失去焦点
	window.onblur=function(){
		clearInterval(t);
	}
	window.onfocus=function(){
		t = setInterval(time,15000);
	}
	
	
	///////////////////////////////////////////////////////////////////
 	/*
	 * cookie input框中的id名要一样，要不获取不到cookie值
	 * 		1.ReLoginCookie 用户名(非手机号)  arr[0]
	 * 		2.ReLoginCookie2 密码                             arr[1]   
	 */
	if(getCookie("loginVip")){
		//会员名登录显示
		var arr_loginVip = getCookie("loginVip");
		arr_loginVip = arr_loginVip.split(",");
		$("#ReLoginCookie").val(arr_loginVip[0]);
		$("#ReLoginCookie2").val(arr_loginVip[1]);
	}
	//登录按钮点击事件
	oSubmit.onclick=function(){	
		//一、cookie：会员名登录与手机号登录
		oReminder.style.display="block";
		oReminder.getElementsByTagName("span")[0].innerHTML="一";
		//1.存在cookie
		if(oInput_user.value!=""&&oInput_pass.value!=""&&getCookie($("#ReLoginCookie").val())){
			oReminder.style.display="none";//成功隐藏提示信息
			//会员名登录
			var arr = getCookie($("#ReLoginCookie").val());
			arr = arr.split(",");
			if(arr[1]==$("#ReLoginCookie2").val()){
				//alert("当前登录为-->会员名登录，数据保存成功");
				setCookie("loginVip",[oInput_user.value,oInput_pass.value],date_1);
				window.location.href="index.html";
			}
			else{
				//密码错误
				oReminder.style.display="block";
				oReminder.getElementsByTagName("span")[0].innerHTML="一";
				oReminder.getElementsByTagName("span")[1].innerHTML="你输入的密码和账户名不匹配，是否<a href='register.html'>注册账号</a><br />或<a href='#'>忘记密码</a>";
			}
			//手机号码登录
		}
		//2.不存在cookie
		else if(oInput_user.value!=""&&oInput_pass.value!=""){
			//用户名错误
			oReminder.getElementsByTagName("span")[1].innerHTML="你输入的账户名和密码不匹配，是否<a href='register.html'>注册账号</a><br />或<a href='#'>忘记密码</a>";
		}
		else if(oInput_user.value==""&&oInput_pass.value==""){
			//内容为空
			oReminder.getElementsByTagName("span")[1].innerHTML="请输入账户名和密码";
		}
		else if((oInput_pass.value==""||oInput_pass.value==null)&&(oInput_user.value!=""||oInput_user.value!=null)){
			//会员名存在，密码不存在
			oReminder.getElementsByTagName("span")[1].innerHTML="请输入密码";
		}
		else if((oInput_pass.value!=""||oInput_pass.value!=null)&&(oInput_user.value==""||oInput_user.value==null)){
			//密码存在，会员名不存在
			oReminder.getElementsByTagName("span")[1].innerHTML="请输入账户名";
		}
		
		
	};
};
	