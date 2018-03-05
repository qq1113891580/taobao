window.onload = function() {
	 /*
	 * 一、轮播图1
	 * 当前发现的bgu:
	 * 	  1.上下页开始/最后的一张要点击2次。
	 * 	  2.第一张图片的开始时间为其他的2倍(走完第一次之后出现2倍)。
	 */
	 ////////////////////////////////////////////////////////////
	clearInterval(t);
	//获取元素节点
	var mainBox = document.getElementById("index_Lbt_mainBox");
	var oLbt = document.getElementById("topLeft_lbt1");
	var oImg = oLbt.getElementsByTagName("img");
	var oYuan = document.getElementById("yuan");
	var oIndex_dot = document.getElementById("index_dot");
	var dotList = oIndex_dot.getElementsByTagName("li");
	var oIndex_prev = document.getElementById("index_prev");
	var oIndex_next = document.getElementById("index_next");

	//定义全局变量
	var num = null; //获取事件中当前的下标，通过全局变量获取出来
	var last = null;
	var t = null;
	oTime = function() {
		oYuan.style.display = "block";
		last.style.background = "white";
		num++;
		if(num >= oImg.length) {
			num = 0;
			oLbt.style.transition = "all ease 0.01s";
		} else {
			oLbt.style.transition = "all ease 0.4s";
		}
		oLbt.style.left = -520 * num + "px";
		if(num >= oImg.length - 1) {
			oYuan.style.transition = "all ease 0.01s";
			oYuan.style.marginLeft = 0 + "px";
		} else {
			oYuan.style.transition = "all ease 0.2s";
			oYuan.style.marginLeft = num * 13 + "px";
		}
	}

	//鼠标移入清除定时器
	mainBox.onmouseover = function() {
		clearInterval(t);
	}
	mainBox.onmouseout = function() {
		t = setInterval(oTime, 5000);
	}
	t = setInterval(oTime, 5000);

	//上一页
	oIndex_prev.onmousedown = function() {
		clearInterval(t);
		oYuan.style.display = "block";
		last.style.background = "white";
		num--;
		if(num <= -1) {
			num = 5;
			oLbt.style.transition = "all ease 0.01s";
			oLbt.style.left = -520 * num + "px";
		} else {
			oLbt.style.transition = "all ease 0.4s";
			oLbt.style.left = -520 * num + "px";
		}
		if(num >= 0) {
			oYuan.style.transition = "all ease 0.2s";
			oYuan.style.marginLeft = 13 * num + "px";
		} else {
			oYuan.style.transition = "all ease 0.01s";
		}
		if(num == 5) {
			oYuan.style.marginLeft = 0 + "px";
		}
	}
	//下一页
	oIndex_next.onmousedown = function() {
		oYuan.style.display = "block";
		last.style.background = "white";
		clearInterval(t);
		num++;
		if(num >= oImg.length) {
			num = 0;
			oLbt.style.transition = "all ease 0.01s";
			oLbt.style.left = -520 * num + "px";
		} else {
			oLbt.style.transition = "all ease 0.4s";
			oLbt.style.left = -520 * num + "px";
		}
		if(num >= oImg.length - 1) {
			oYuan.style.transition = "all ease 0.01s";
			oYuan.style.marginLeft = 0 + "px";
		} else {
			oYuan.style.transition = "all ease 0.2s";
			oYuan.style.marginLeft = num * 13 + "px";
		}
	}

	//小圆点
	for(var i = 0; i < dotList.length; i++) {
		last = dotList[0];
		dotList[i].index = i;
		dotList[i].onclick = function() {
			clearInterval(t);
			oYuan.style.display = "none";
			oIndex_next.style.cssText = "color:white";
			oIndex_prev.style.cssText = "color:white";

			last.style.background = "white";
			this.style.background = "red";
			last = this;
			oLbt.style.left = -520 * this.index + "px";
			num = this.index;
		}

	};

	//浏览器失去焦点，清除定时器
	window.onblur = function() {
		clearInterval(t);
	}
	window.onfocus = function() {
		t = setInterval(oTime, 5000);
	}
	
	////////////////////////////////////////////////////////////
	/*
	 * 二、二维码的隐藏
	 */
	var b = 0;
	var oError = document.getElementsByClassName("error")[0];
	var oIndexEwm = document.getElementsByClassName("indexEwm")[0];
	oError.onclick=function(){
		if(b==0){
			oIndexEwm.style.display="none";
			oError.style.display="none";
			b=1;
		}
	}
	
	////////////////////////////////////////////////////////////
	/*
	 * 三、轮播图2
	 * 当前发现的bgu:
	 * 	  1.上下页开始/最后的一张要点击2次。
	 * 	  2.第一张图片的开始时间为其他的2倍(点击事件后出现2倍)。
	 */
	//获取元素节点
	var bottomBox = document.getElementById("bottomBox_Left");
	var oLbt1 = document.getElementById("bottomBox_olbt");
	var oImg1 = oLbt1.getElementsByTagName("img");
	var oStrip = document.getElementById("strip");
	var oText = document.getElementById("text1");
	var oIndex_strip = document.getElementById("index_strip");
	var stripList = oIndex_strip.getElementsByTagName("li");
	var oIndex_prev1 = document.getElementById("index_prev1");
	var oIndex_next1 = document.getElementById("index_next1");

	//定义全局变量
	var num1 = null; //获取事件中当前的下标，通过全局变量获取出来
	var last1 = null;
	var t1 = null;
	oTime1 = function() {
		oStrip.style.display = "block";
		last1.style.background = "red";
		num1++;
		if(num1 >= oImg1.length) {
			num1 = 0;
			oLbt1.style.transition = "all ease 0.01s";
		} else {
			oLbt1.style.transition = "all ease 0.4s";
		}
		oLbt1.style.left = -520 * num1 + "px";
		if(num1 >= oImg1.length - 1) {
			oStrip.style.transition = "all ease 0.01s";
			oStrip.style.marginLeft = 0 + "px";
		} else {
			oStrip.style.transition = "all ease 0.2s";
			oStrip.style.marginLeft = num1 * 86.6 + "px";
		}
		if(num1 >= 6){
			oText.innerHTML = "1";
		}
		else{
			oText.innerHTML = num1+1;
		}
	}
	
	//鼠标移入清除定时器
	bottomBox.onmouseover = function() {
		clearInterval(t1);
	}
	bottomBox.onmouseout = function() {
		t1 = setInterval(oTime1, 4000);
	}
	t1 = setInterval(oTime1, 4000);
	
	//上一页
	oIndex_prev1.onmousedown = function() {
		clearInterval(t1);
		oStrip.style.display = "block";
		last1.style.background = "red";
		num1--;
		if(num1 <= -1) {
			num1 = 6;
			oLbt1.style.transition = "all ease 0.01s";
			oLbt1.style.left = -520 * num1 + "px";
		} else {
			oLbt1.style.transition = "all ease 0.4s";
			oLbt1.style.left = -520 * num1 + "px";
		}
		if(num1 >= 0) {
			oStrip.style.transition = "all ease 0.2s";
			oStrip.style.marginLeft = 86.6 * num1 + "px";
		} else {
			oStrip.style.transition = "all ease 0.01s";
		}
		if(num1 == 6) {
			oStrip.style.marginLeft = 0 + "px";
		}
		if(num1 == 6){
			oText.innerHTML = "1";
		}
		else{
			oText.innerHTML = num1+1;
		}
	}
	//下一页
	oIndex_next1.onmousedown = function() {
		oStrip.style.display = "block";
		last1.style.background = "red";
		clearInterval(t1);
		num1++;
		if(num1 >= oImg1.length) {
			num1 = 0;
			oLbt1.style.transition = "all ease 0.01s";
			oLbt1.style.left = -520 * num1 + "px";
		} else {
			oLbt1.style.transition = "all ease 0.4s";
			oLbt1.style.left = -520 * num1 + "px";
		}
		if(num1 >= oImg1.length - 1) {
			oStrip.style.transition = "all ease 0.01s";
			oStrip.style.marginLeft = 0 + "px";
		} else {
			oStrip.style.transition = "all ease 0.2s";
			oStrip.style.marginLeft = num1 * 86.6 + "px";
		}
		if(num1 >= 6){
			oText.innerHTML = "1";
		}
		else{
			oText.innerHTML = num1+1;
		}
	}

	//小长条
	for(var i = 0; i < stripList.length; i++) {
		last1 = stripList[0];
		stripList[i].index = i;
		stripList[i].onclick = function() {
			clearInterval(t1);
			oStrip.style.display = "none";

			last1.style.background = "red";
			this.style.background = "black";
			last1 = this;
			oLbt1.style.left = -520 * this.index + "px";
			num1 = this.index;
			oText.innerHTML = this.index+1;
		}
	};
	//浏览器失去焦点，清除定时器
	window.onblur = function() {
		clearInterval(t1);
	}
	window.onfocus = function() {
		t1 = setInterval(oTime1, 4000);
	}
	
	////////////////////////////////////////////////////////////
	/*
	 * index_Taobao:
	 * 		1.选项卡
	 */
	var Ad_list1 = document.getElementById("index_AdNavMenu");
	var oAdLi = Ad_list1.getElementsByTagName("li");
	var MainRight = document.getElementById("MainRight_bottomBox");
	var Ad_Five = MainRight.getElementsByClassName("index_AdFiveBox");
	Ad_Five[0].style.cssText="display: block;";
	
	for(var k = 0;k < oAdLi.length;k++){
		var last = oAdLi[0];
		oAdLi[k].index = k;
		oAdLi[k].onmouseover=function(){
			//文字
			last.firstChild.style.cssText="border:none;color: #3C3C3C;transition: all ease-in-out .3s;";
			oAdLi[this.index].firstChild.style.cssText="border-bottom:2px solid #ff4400;color:#ff4400;";
			//div显示隐藏
			Ad_Five[last.index].style.cssText="display: none;";
			Ad_Five[this.index].style.cssText="display: block;";
			//把当前的值赋给上一个
			last=this;
		}
	};
	
	////////////////////////////////////////////////////////////
	/*
	 * index_Taobao:
	 * 		2.选项卡
	 */
	var bottomBox = document.getElementById("bottomBox_MainRight");
	var twelve_Box1 = bottomBox.getElementsByClassName("twelve_Box1");
	var othree_box = bottomBox.getElementsByClassName("othree_box");
	var oSpan = othree_box[0].getElementsByTagName("span")[0];
	var oSpan1 = othree_box[1].getElementsByTagName("span")[0];
	var oSpan2 = othree_box[2].getElementsByTagName("span")[0];

	var last2 = null;
	for(var q = 0;q<twelve_Box1.length;q++){
		last2 = twelve_Box1[0];
		twelve_Box1[q].index = q;
		twelve_Box1[q].onmouseover=function(){
			last2.style.cssText="border:1px solid #f4f4f4;border-bottom:1px solid transparent;border-left:1px solid transparent;color:#3C3C3C;height: 74px;";
			this.style.cssText="border:1px solid red;border-bottom:none;background: white;color:red;position:relative;z-index:1;";//z-index: 999;
			othree_box[last2.index].style.display="none";
			othree_box[this.index].style.display="block";
			last2 = this;
		}
		oSpan.onclick=function(){
			othree_box[0].style.display="none";
			last2.style.cssText="border:1px solid #f4f4f4;border-bottom:1px solid transparent;border-left:1px solid transparent;color:#3C3C3C;height: 74px;";
		}
		oSpan1.onclick=function(){
			othree_box[1].style.display="none";
			last2.style.cssText="border:1px solid #f4f4f4;border-bottom:1px solid transparent;border-left:1px solid transparent;color:#3C3C3C;height: 74px;";
		}
		oSpan2.onclick=function(){
			othree_box[2].style.display="none";
			last2.style.cssText="border:1px solid #f4f4f4;border-bottom:1px solid transparent;border-left:1px solid transparent;color:#3C3C3C;height: 74px;";
		}
	};
		
	////////////////////////////////////////////////////////////
	/*
	 * index_Taobao:
	 * 		1.搜索框：Search input框值变化后图片的变化(显示/隐藏)
	 * 		2.宝贝 天猫 店铺切换
	 * 		3.滚动事件，搜索栏固定
	 * 		4.侧栏菜单滚动事件与点击事件
	 */
	//1.搜索框：Search input框值变化后图片的变化(显示/隐藏)
	var lyt_1 = document.getElementsByClassName("lyt_1")[0];
	var searchBox = document.getElementsByClassName("searchBox");
	var searchBox1 = document.getElementById("searchBox1");
	var inputPhoto = searchBox[0].getElementsByTagName("input")[0];
	var cameraPhoto = searchBox[0].getElementsByTagName("img")[0];//相机
	inputPhoto.oninput = function(){
		inputPhoto.style.backgroundImage="none";
		if(inputPhoto.value == null||inputPhoto.value == ""){
			inputPhoto.style.backgroundImage="url(img/searchPhoto.jpg)";
		}
	}
	//2.宝贝 天猫 店铺切换
	var searchNote = document.getElementsByClassName("searchNote")[0];
	var aList = searchNote.getElementsByTagName("a");
	var indexLink = document.getElementsByClassName("indexLink")[0];
	var searchBtn = document.getElementsByClassName("searchBtn")[0];//获取搜索按钮
	
	var last3 = null;
	aList[0].setAttribute("style","color: white;background:#ff7c00 !important;border-top-left-radius: 5px;border-top-right-radius: 5px;font-weight: 900;");
	for(var w = 0;w < aList.length;w++){
		last3 = aList[0];
		aList[w].index = w;
		aList[w].onclick=function(){
			last3.style.cssText="color: #ff5101;background: white;font-weight: normal;";
			this.style.cssText="color: white;background:#ff7c00 !important;border-top-left-radius: 5px;border-top-right-radius: 5px;font-weight: 900;";
			if(this.index==1){
				indexLink.style.display="none";
				cameraPhoto.style.display="none";
				searchBtn.style.cssText="margin-top: -2px;background: #FF5000;";
				searchBox1.style.borderColor="#FF5000";
				this.style.cssText="color: white;background:#FF5000 !important;border-top-left-radius: 5px;border-top-right-radius: 5px;font-weight: 900;";
			}else{
				indexLink.style.display="block";
				cameraPhoto.style.display="block";
				cameraPhoto.className="img";
				searchBtn.style.cssText="margin-top: 0px;background:#FF6900;";
				searchBox1.style.borderColor="#FF6900";
				this.style.cssText="color: white;background:#ff7c00 !important;border-top-left-radius: 5px;border-top-right-radius: 5px;font-weight: 900;";
			}
			if(this.index==2){
				inputPhoto.setAttribute("placeholder","输入要搜索的店铺名");
			}
			else if(this.index==0){
				inputPhoto.setAttribute("placeholder","淘宝网 - 淘！我喜欢");
			}
			else if(this.index==1){
				inputPhoto.setAttribute("placeholder","");
			}
			if(this.index==0||this.index==2){
				searchBtn.style.cssText="margin-top: -30px;";
			}
			inputPhoto.focus();//宝贝 天猫 店铺时，获得input框焦点。
			last3 = this;
		};
	};

	//4.侧栏菜单滚动事件
	var index_Bar = document.getElementsByClassName("index_sideBar")[0];
	var index_sideBar = document.getElementsByClassName("index_sideBarEightBox")[0];
	var sideBar = index_sideBar.getElementsByTagName("li");
	var mainContent = document.getElementsByClassName("mainContent")[0];
	var last4 = null;
	//3.滚动事件，搜索栏固定
	window.onscroll=function(){
		var mainLogoSearch = document.getElementsByClassName("mainLogoSearch")[0];
		var LogoSearch = document.getElementsByClassName("LogoSearch")[0];
		var indexLogo = document.getElementsByClassName("indexLogo")[0];//获取Logo
		var indexLogoPhoto = indexLogo.getElementsByTagName("img")[0];
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		
//		console.log(top);
		if(top>=200){
			//主盒子高度变化
			mainLogoSearch.style.cssText="position: fixed;top:0;z-index:9999;height: 54px;";
			//隐藏二维码
			oIndexEwm.style.display="none";
			oError.style.display="none";
			//隐藏搜索框下的链接
			indexLink.style.display="none";
			//隐藏天猫 淘宝 店铺
			searchNote.style.display="none";
			//设置logo图片大小
			indexLogoPhoto.style.cssText="display:block;width:80px;height:33px;margin-top: -22px;";
			inputPhoto.setAttribute("style","margin-left: 64px;");
			LogoSearch.style.cssText="height: 54px;";
			searchBox1.style.cssText="margin-top: -19px;position: relative;z-index: 9999;";
			lyt_1.style.cssText="display: block;";
		}
		else if(top<=199.9){
			mainLogoSearch.style.cssText="height: 120px;";
			//隐藏二维码
			if(b==0){
				oIndexEwm.style.display="block";
				oError.style.display="block";
			}
			else{
				oIndexEwm.style.display="none";
				oError.style.display="none";
			}
			//显示搜索框下的链接
			indexLink.style.display="block";
			//显示天猫 淘宝 店铺
			searchNote.style.display="block";
			indexLogoPhoto.style.cssText="display:inline-block;width:142px;height:58px;";
			LogoSearch.style.cssText="height: 120px;";
			searchBox1.style.cssText="margin-top:0px;";
			inputPhoto.setAttribute("style","margin-left: 2px;");
			lyt_1.style.cssText="display: none;";
		};
		
		//4.侧栏菜单滚动事件与点击事件
		if(top>=420){
			index_Bar.style.cssText="position: fixed;top:55px";
		}
		if(top<=419.9){
			index_Bar.style.cssText="position: absolute;top:480px";
		}
		//返回顶部按钮
		if(top>=1000){
			sideBar[5].style.display="block";
		}
		if(top<=999.9){
			sideBar[5].style.display="none";
		}
		//回到顶部
		sideBar[5].onclick=function(){
			$("html,body").animate({
				scrollTop:$("#goTop").offset().top
			},500);
		}
		
		if(top>=0&&top<1700){
			last4.style.cssText="background: white;font-weight:normal;";
			sideBar[0].style.cssText="background: #FF720D;font-weight: 900;color: white;border-color: #FF720D;";
			last4 = sideBar[0];
		}
		else if(top>=1700&&top<2500){
			last4.style.cssText="background: white;font-weight:normal;";
			sideBar[1].style.cssText="background: #FF720D;font-weight: 900;color: white;border-color: #FF720D;";
			last4 = sideBar[1];
		}
		else if(top>=2500&&top<3300){
			last4.style.cssText="background: white;font-weight:normal;";
			sideBar[2].style.cssText="background: #FF720D;font-weight: 900;color: white;border-color: #FF720D;";
			last4 = sideBar[2];
		}
		else if(top>=3300&&top<4500){
			last4.style.cssText="background: white;font-weight:normal;";
			sideBar[3].style.cssText="background: #FF720D;font-weight: 900;color: white;border-color: #FF720D;";
			last4 = sideBar[3];
		}
		else if(top>=4500){
			last4.style.cssText="background: white;font-weight:normal;";
			sideBar[4].style.cssText="background: #FF720D;font-weight: 900;color: white;border-color: #FF720D;";
			last4 = sideBar[4];
		}
	};
	//4.侧栏菜单点击事件
	for(var r = 0;r < sideBar.length-2;r++){
		last4 = sideBar[0];
		sideBar[r].index = r;
		sideBar[r].onclick=function(){
			last4.style.cssText="background: white;font-weight:normal;";
			this.style.cssText="background: #FF720D !important;font-weight: 900;color: white;";
			last4 = this;
			if(this.index==0){
				$("html,body").animate({
					scrollTop:$("#top_lyt").offset().top-60+"px"
				},500);
			}
			if(this.index==1){
				$("html,body").animate({
					scrollTop:$("#top_lyt1").offset().top-60+"px"
				},500);
			}
			if(this.index==2){
				$("html,body").animate({
					scrollTop:$("#top_lyt2").offset().top-60+"px"
				},500);
			}
			if(this.index==3){
				$("html,body").animate({
					scrollTop:$("#top_lyt3").offset().top-60+"px"
				},500);
			}
			if(this.index==4){
				$("html,body").animate({
					scrollTop:$("#top_lyt4").offset().top-60+"px"
				},500);
			}
		}
	};
	
	////////////////////////////////////////////////////////////
	/*
	 *  用户登录成功
	 *     2.退出按钮点击清除cookie
	 */
	if(getCookie("loginVip")){
		//会员名登录显示
		var arr_loginVip = getCookie("loginVip");
		arr_loginVip = arr_loginVip.split(",");
		$(".topNavLeft li:nth-of-type(2)").find("a").eq(0).html(arr_loginVip[0]);
		$(".topNavLeft li:nth-of-type(2)").find("a").eq(0).on("click",function(){
			window.location.href="#";
		});
		$(".topNavLeft li:nth-of-type(2)").on("mouseover",function(){
			$(".topNavLeft li:nth-of-type(2)").css("background","white");
			$(".userName1").css("display","block");
		});
		$(".topNavLeft li:nth-of-type(2)").on("mouseout",function(){
			$(".topNavLeft li:nth-of-type(2)").css("background","");
			$(".userName1").css("display","none");
		});
		//右侧登录/注册/开店 显示与隐藏
		$(".MainRight_topBox span:first-of-type").find("font").eq(0).html(arr_loginVip[0]);
		$(".index_btn").css("display","none");
		$(".index_UserPhoto a img").attr("src","img/index_Sea_Snap_up_threeBox1.jpg");
		$(".userName2").css("display","block");
		
	}else{
		$(".topNavLeft li:nth-of-type(2)").find("a").eq(0).on("click",function(){
			window.location.href="login.html";
		});
		$(".topNavLeft li:nth-of-type(2)").on("mouseover",function(){
			$(".topNavLeft li:nth-of-type(2)").css("cursor","pointer");
		});
		$(".topNavLeft li:nth-of-type(2)").on("mouseout",function(){
			$(".topNavLeft li:nth-of-type(2)").css("cursor","auto");
		});
		//右侧登录/注册/开店 显示与隐藏
		$(".userName2").css("display","none");
	}
	//2.退出按钮点击事件
	$(".userName_exit a:last-of-type").on("click",function(){
		removeCookie("loginVip");
		window.location=location;  //退出进行页面刷新
	});
};
	
	