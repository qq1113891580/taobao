window.onload=function(){
	////////////////////////////////////////////////////////////////
	/*
	 * 一、设置用户名
	 *    1.界面一
	 *      1.1 手机号码验证
	 *         1.11 cookie中存在手机号码，显示该手机号码已注册
	 *      1.2 拖动验证
	 *      1.3 下一步点击按钮事件
	 *    2.界面二
	 *      2.1 发送验证码验证手机
	 *      2.2 按钮点击事件
	 *    3.界面三
	 *      3.1 是否存在手机号码
	 *      3.2 不是我的，继续注册点击事件
	 */
	var body = document.getElementsByTagName("body")[0];
	var oSelect = document.getElementsByClassName("select")[0];
	var register_xiala = document.getElementsByClassName("register_xiala")[0];
	var list = register_xiala.getElementsByTagName("li");
	
	//设置cookie过期时间
	var date_1 = new Date();
	date_1.setDate(date_1.getDate()+30);

	//1.手机号地区：按钮点击事件
	var n = 0;
	oSelect.onclick=function(evt){
		var Oevent = event || evt;
		if(n==0){
			register_xiala.style.cssText="display: block;";
			n=1;
		}else{
			register_xiala.style.cssText="display: none;";
			n=0;
		}
		//阻止事件冒泡(2种方法)
		Oevent.stopPropagation();
//		Oevent.cancelBubble=true;
	};
	body.onclick=function(){
		register_xiala.style.cssText="display: none;";
		n=0;
	};
	for (var i = 0;i < list.length;i++) {
		var last = list[0];
		list[i].index = i;
		list[i].onclick=function(){
			oSelect.getElementsByTagName("span")[0].innerHTML= this.getElementsByTagName("span")[0].innerHTML;
			oSelect.getElementsByTagName("span")[1].innerHTML= this.getElementsByTagName("span")[1].innerHTML;
			last.style.cssText="";
			this.style.cssText="background: #FF5000;color:white";
			last = this;
			register_xiala.style.cssText="display: none;";
			n=0;
		}
	};
	
	
	//addEventListener 无效
//	oSelect.addEventListener("click",function(){
//		if(n==0){
//			register_xiala.style.cssText="display: block;";
//			n=1;
//		}else{
//			register_xiala.style.cssText="display: none;";
//			n=0;
//		}
//	});
//	for (var i = 0;i < list.length;i++) {
//		var last = list[0];
//		list[i].index = i;
//		list[i].addEventListener("click",function(){
//			oSelect.getElementsByTagName("span")[0].innerHTML= this.getElementsByTagName("span")[0].innerHTML;
//			oSelect.getElementsByTagName("span")[1].innerHTML= this.getElementsByTagName("span")[1].innerHTML;
//			last.style.cssText="";
//			this.style.cssText="background: #FF5000;color:white";
//			last = this;
//			register_xiala.style.cssText="display: none;";
//			n=0;
//		});
//	}
//	body.addEventListener("click",function(){
//			register_xiala.style.cssText="display: none;";
//			n=0;
//	});
	
	////////////////////////////////////////////////////////////////
	//2.验证拖动
	var yz = document.getElementsByClassName("yz")[0];
	var oImg = yz.getElementsByTagName("img")[0];
	var oDiv = yz.getElementsByTagName("div")[0];
	var next = document.getElementsByClassName("next")[0];
	var pmd = document.getElementById("pmd");//跑马灯
	//验证手机
	var yzPhone_1 = document.getElementById("yzPhone");
	var zy_content = document.getElementsByClassName("zy_content")[0];
	var yz_oSpan1 = zy_content.getElementsByTagName("span")[1];
	var yz_yzm = document.getElementById("yz_yzm");//手机验证码盒子提示 
	var yz_yzmSpan = yz_yzm.getElementsByTagName("span")[0];
	
	var b = null; //拖动验证
	var d = null;
	var time = null;
	
	oImg.onmousedown = function(evt){
		btncliek();
		var oEvent = evt || event;
		var a = oEvent.clientX - oImg.offsetLeft; //1.图片拖动
		var c = oEvent.clientX - oDiv.offsetWidth;//2.背景的盒子拖动
		document.onmousemove = function(evt){
			oImg.style.cssText="transition: all ease-in-out 0s;";
			oDiv.style.cssText="transition: all ease-in-out 0s;height: 34px;";
			var oEvent = evt || event;
			b = oEvent.clientX-a;
			d = oEvent.clientX-c;
			if(b<=0){
				oImg.style.left =0+"px";
			}
			else if(b>=258){
				oImg.src="img/regiseter_yz1.jpg";
				oImg.style.cssText ="left: 258px;-webkit-user-select: none;cursor: auto";
				yz.style.cssText="background: limegreen;color: white;";
				yz.getElementsByTagName("font")[0].innerHTML = "验证通过";
				yz.getElementsByTagName("font")[0].style.cssText="padding-left: 32px;";
				next.style.cssText="background: #FF6900;color: white;";
				oImg.onmousedown = null;
			}
			else if(b>0&&b<258){
				oImg.style.left =b+"px";
				oDiv.style.width = d +"px";
				oDiv.style.background="limegreen";
				oDiv.style.height="height: 34px;";
			}
			if(b>=258){
				next.onmouseover=function(){
					next.style.cssText="background: #FF5000;";
				}
				next.onmouseout=function(){
					next.style.cssText="background:#FF6900;color: white;";
				}
				//下一步点击事件
				next.onclick=function(){
					oReminder.style.display="block";
					if(photoNum.test(oInput.value)!=true){
						oSpan[0].innerHTML="x";
						oSpan[0].style.backgroundColor="";
						oInput.style.borderColor="red";
						if(oInput.value == "" || oInput.value == ""){
							oReminder.getElementsByTagName("span")[1].innerHTML="请输入你的手机号码";
						}else{
							oReminder.getElementsByTagName("span")[1].innerHTML="手机号码格式不正确，请重新输入";
						}
					}
					//5.验证手机
					if(oSpan[0].style.backgroundColor=="limegreen"){
						yzPhone_1.style.display="block";
						Ad.style.display="block";//蒙版
						yz_oSpan1.innerHTML=oInput.value;//把手机号码赋值给当前页面指定位置
						oFont.innerHTML=oInput.value;//把手机号码赋值给当前页面指定位置
						$("#idInformation p > span").eq(1).html($(".text > input[type=text]").val());
						//1.显示登录名(注册成功)
						$("#reg_successfully").find("span").eq(2).html($(".text > input[type=text]").val());
						//2.显示绑定的手机(注册成功)
						$("#reg_successfully").find("span").eq(3).html($(".text > input[type=text]").val());
						//等价于：Ospan_1.innerHTML=oInput.value;
						yz_oSpan1.style.color="#FF5000";
						time = setTimeout(function(){
							yz_yzm.style.cssText="transition: all ease .7s;margin-left: 0;";//延时显示验证码提示
						},1000);
					}
				};
				pmd.style.display="none";//隐藏跑马灯
			};
		}
		document.onmouseup = function(){
			if(b<258){
				oImg.style.cssText="left: 0px;transition: all ease-in-out .7s;";
				oDiv.style.cssText="width: 0px;transition: all ease-in-out .7s;";
			}
			document.onmousemove = null;
			document.onmouseup = null;
		}
	};
	//阻止浏览器默认的图片拖拽效果
	var oEvent1 = null;
	function btncliek(evt){
		oEvent1 = evt || event;
	    if (oEvent1.preventDefault) {
	        oEvent1.preventDefault();
	    }
	    else {
	        oEvent1.returnvalue = false;
	    }
	};
	
	////////////////////////////////////////////////////////////////
	//3.号码验证
	var oReminder = document.getElementsByClassName("reminder")[0];
	var oSpan = oReminder.getElementsByTagName("span");
	var text_1 = document.getElementsByClassName("text")[0];
	var oInput = text_1.getElementsByTagName("input")[0];
	
	var photoNum = /^[1-3]\d{10}$/;
	oInput.oninput=function(evt){
		var Oevent = event || evt;
		oReminder.style.display="block";
		if(photoNum.test(oInput.value)==true){
			oSpan[0].innerHTML="√";
			oSpan[1].innerHTML="";
			oSpan[0].style.backgroundColor="limegreen";
			oInput.style.borderColor="";
		}
		else{
			oSpan[0].innerHTML="x";
			oSpan[0].style.backgroundColor="";
			oInput.style.borderColor="red";
			if(oInput.value == "" || oInput.value == ""){
				oReminder.getElementsByTagName("span")[1].innerHTML="请输入你的手机号码";
			}else{
				oReminder.getElementsByTagName("span")[1].innerHTML="手机号码格式不正确，请重新输入";
			}
		}
		Oevent.preventDefault();
	};
	oInput.onfocus=function(){
		oInput.style.borderColor="";
	}

	/*cookie保存手机号码(已注册显示-->手机号码已注册)
	 *  1.$(".text > input[type=text]").val():用一个变量去装cookie，值不会被覆盖
	 *  2.getCookie()，获取的值是局部的，外部引用为null。？？id 或者 class要相同。
	 *  3.所以这里一步一步进行判断
	 */
	oInput.onblur=function(){
		if($(".text > input[type=text]").val()!=""||$(".text > input[type=text]").val()!=null){
			if(getCookie($(".text > input[type=text]").val())){
				oSpan[0].innerHTML="x";
				oSpan[0].style.backgroundColor="";
				oInput.style.borderColor="red";
				oReminder.getElementsByTagName("span")[1].innerHTML="手机号码被已注册";
				next.onclick=null;
			}else{
				setCookie($(".text > input[type=text]").val(),$(".text > input[type=text]").val(),date_1);
			}
		}
	};
	
	////////////////////////////////////////////////////////////////
	//4.注册协议
	var deal = document.getElementById("deal");
	var Ad = document.getElementById("Ad");//蒙版,阻止后面的元素被点击到
	
	//4.1 创建一个DIV
	var oDivMainBox = document.createElement("div");
	//4.2 把DIV添加到指定位置
	deal.appendChild(oDivMainBox);
	//4.3 为DIV添加样式
	oDivMainBox.className="oDivMainBox";
	var oDivBox = document.createElement("div");
	oDivMainBox.appendChild(oDivBox);
	oDivBox.className="oDivBox";
	
	//4.4 创建文本
	//标题盒子
	var div_TitleBox = document.createElement("div");
	div_TitleBox.className="div_TitleBox";
	oDivBox.appendChild(div_TitleBox);
	//注册协议标题
	var oP = document.createElement("span");
	div_TitleBox.appendChild(oP);
	oP.className="span_a";
	var dealText1 = document.createTextNode("注册协议");
	oP.appendChild(dealText1);
	//关闭按钮
	var oSpan_1 = document.createElement("span");
	var oClose = document.createTextNode("X");
	oSpan_1.appendChild(oClose);
	div_TitleBox.appendChild(oSpan_1);
	oSpan_1.className="oSpan_1";
	
	//关闭按钮点击事件
	oSpan_1.onclick=function(){
		oDivMainBox.style.display="none";
		Ad.style.display="none";//蒙版
		window.location.href="index.html";
	}
	
	//内容主盒子
	var div_1 = document.createElement("div");
	oDivBox.appendChild(div_1);
	div_1.className="div_1";
	
	//同意协议
	var div_2 = document.createElement("div");
	oDivBox.appendChild(div_2);
	div_2.className="div_2";
	var ty_txt = document.createTextNode("同意协议");
	div_2.appendChild(ty_txt);
	
	//同意协议按钮点击事件
	div_2.onclick=function(){
		oDivMainBox.style.display="none";
		Ad.style.display="none";//蒙版
	}
	
	
	
	/*
	 *  ajax
	 */
	//兼容性写法
	function createxhr(){
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else{
			return ActiveXObject("Microsoft.XMLHTTP");
		}
	};
	var xhr = createxhr();
//	function ajax(){
		xhr.open("get","js/register.json",true);
		xhr.send(null);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var list_lyt = JSON.parse(xhr.responseText);
				for(var f = 0;f < list_lyt.length;f++){
					//一、创建标签
					var oUl = document.createElement("ul");
					//1
					var oLi1 = document.createElement("li");
					var oSpan_lyt_1 = document.createElement("span");
					var oSpan_lyt_2 = document.createElement("span");
					//2
					var oLi2 = document.createElement("li");
					var oSpan_lyt_3 = document.createElement("span");
					//3
					var oLi3 = document.createElement("li");
					var oSpan_lyt_4 = document.createElement("span");
					//4
					var oLi4 = document.createElement("li");
					var oSpan_lyt_5 = document.createElement("span");
					//5
					var oLi5 = document.createElement("li");
					//6
					var oLi6 = document.createElement("li");
					var oSpan_lyt_6 = document.createElement("span");
					//7
					var oLi7 = document.createElement("li");
					//3个a标签
					var a_1 = document.createElement("a");
					var a_2 = document.createElement("a");
					var a_3 = document.createElement("a");
					
					//二、添加到指定标签
					div_1.appendChild(oUl);
					//1
					oUl.appendChild(oSpan_lyt_1);
					oUl.appendChild(oLi1);
					oUl.appendChild(oSpan_lyt_2);
					//2
					oUl.appendChild(oSpan_lyt_3);
					oUl.appendChild(oLi2);
					//3
					oUl.appendChild(oSpan_lyt_4);
					oUl.appendChild(oLi3);
					//4
					oUl.appendChild(oSpan_lyt_5);
					oUl.appendChild(oLi4);
					//5
					oUl.appendChild(oLi5);
					//6
					oUl.appendChild(oSpan_lyt_6);
					oUl.appendChild(oLi6);
					//7
					oUl.appendChild(oLi7);
					//3个a标签
					oUl.appendChild(a_1);
					oUl.appendChild(a_2);
					oUl.appendChild(a_3);
					
					//三、赋值给标签
					//1
					oSpan_lyt_1.innerHTML=list_lyt[f].span_1;
					oLi1.innerHTML=list_lyt[f].name_1;
					oSpan_lyt_2.innerHTML=list_lyt[f].span_2+"<br/>";
					oLi1.className="oLi1_txt";
					oSpan_lyt_1.className="oSpan_lyt_1";
					oSpan_lyt_2.className="oSpan_lyt_2";
					//2
					oSpan_lyt_3.innerHTML=list_lyt[f].span_3;
					oSpan_lyt_3.className="oLi1_txt_1";
					oLi2.innerHTML=list_lyt[f].name_2;
					oLi2.className="oSpan_lyt_3";
					//3
					oSpan_lyt_4.innerHTML=list_lyt[f].span_4;
					oSpan_lyt_4.className="oLi1_txt_1";
					oLi3.innerHTML=list_lyt[f].name_3;
					oLi3.className="oSpan_lyt_3";
					//4
					oSpan_lyt_5.innerHTML=list_lyt[f].span_5;
					oSpan_lyt_5.className="oLi1_txt_1";
					oLi4.innerHTML=list_lyt[f].name_4;
					oLi4.className="oSpan_lyt_3";
					//5
					oLi5.innerHTML=list_lyt[f].name_4+"<br/>";
					oLi5.className="oLi1_txt";
					//6
					oSpan_lyt_6.innerHTML=list_lyt[f].span_7;
					oLi6.innerHTML=list_lyt[f].name_6;
					oLi6.className="oLi1_txt";
					oSpan_lyt_6.className="oSpan_lyt_1";
					//7
					oLi7.innerHTML=list_lyt[f].name_7;
					oLi7.className="oSpan_lyt_2";
					//3个a标签
					a_1.innerHTML=list_lyt[f].a_1;
					a_2.innerHTML=list_lyt[f].a_2;
					a_3.innerHTML=list_lyt[f].a_3;
					a_1.className="a_1";
					a_2.className="a_1";
					a_3.className="a_1";
					a_1.onclick=function(){
						window.location.href="#";
					}
					a_2.onclick=function(){
						window.location.href="#";
					}
					a_3.onclick=function(){
						window.location.href="#";
					}
				}
			}
		}
//	}
//	ajax();
	
	////////////////////////////////////////////////////////////////
	//5.验证手机点击事件
	var yz_TitleBox = document.getElementsByClassName("yz_TitleBox")[0];
	var yz_oSpan = yz_TitleBox.getElementsByTagName("span")[1];
	var yzm = document.getElementsByClassName("yzm")[0];
	var yz_oInput = yzm.getElementsByTagName("input")[0];
	var yz_oSpan2 = yzm.getElementsByTagName("span")[1];
	var yzPhone_box = document.getElementsByClassName("yzPhone_box")[0];
	var yzPhone_Span = yzPhone_box.getElementsByTagName("span")[3];
	var ts = document.getElementsByClassName("ts")[0];
	var tsoSpan = ts.getElementsByTagName("span");
	var yz_submit = document.getElementsByClassName("yz_submit")[0];
	
	var t = null;
	var num = 60;//60s
	var n_1 = 0; //控制当定时器正在倒计时时，免费获取验证码按钮不可以点击按钮
	var n_2 = 0;//如果超过3次，那么就提醒 获取语音校验码
	var n_3 = 0;//控制当定时器正在倒计时时，获取语音校验码按钮不可以点击
	//1.获取验证码关闭按钮点击事件
	yz_oSpan.onclick=function(){
		yzPhone_1.style.display="none";
		Ad.style.display="none";//蒙版
		yz_yzm.style.cssText="transition: all ease .7s;margin-left: -140px;";//获取验证码关闭按钮，验证码提示进行隐藏
	}
	//2.获取验证码
	yz_oSpan2.onclick=function(){
		if(n_1==0){
			t = setInterval(function(){
				num--;
				yz_oSpan2.innerHTML="重发验证码("+num+"s)";
				if(num==0){
					yz_oSpan2.innerHTML="免费获取验证码";
					clearInterval(t);
					yz_oSpan2.className="";
					n_1=0;
					num = 60;
					n_3++;
					n_2++;
				}
			},100);
			n_1=1;
		}
		if(n_3==2){	//获取语音校验码按钮
			if(n_2>1){
				clearInterval(t);
				yzPhone_Span.innerHTML="如您无法收到短信验证码，请点击'获取语音验证码'。我们将给您拨打电话，请您留意接听";
				yz_oSpan2.innerHTML="获取语音校验码";
				tsoSpan[1].innerHTML="已给您拨打电话，注意接听哦";
				tsoSpan[0].innerHTML="√";
				tsoSpan[0].style.background="limegreen";
				tsoSpan[1].style.color="";
			}
		}
		yz_oSpan2.className="yz_oSpan2";
	}
	//3.确认按钮点击事件
	//随机获取6位数作为验证码
	var $num = parseInt(Math.random()*1000000);
	if($num<100000){
		$num+=100000;	
	}
	$("#yz_yzm p").find("span").eq(1).html($num);

	var num_2 = /^\d{6}$/;
	yz_submit.onclick=function(){
		if(yz_oInput.value=="" || yz_oInput.value==null){
			tsoSpan[0].innerHTML="x";
			tsoSpan[1].innerHTML="您未输入内容，请重新输入";
			tsoSpan[0].style.background="#FF3F13";
			tsoSpan[1].style.color="#FF3F13";
		}
		else if((num_2.test(yz_oInput.value)==true)&&yz_oInput.value!=$num){
			tsoSpan[0].innerHTML="x";
			tsoSpan[1].innerHTML="校验码不正确，请重新输入";
			tsoSpan[0].style.background="#FF3F13";
			tsoSpan[1].style.color="#FF3F13";
		}
		else if((num_2.test(yz_oInput.value)==true)&&yz_oInput.value==$num){
			tsoSpan[0].innerHTML="√";
			tsoSpan[0].style.background="limegreen";
			tsoSpan[1].innerHTML="校验码正确";
			tsoSpan[1].style.color="";
		}
		else if(num_2.test(yz_oInput.value)==false){
			tsoSpan[0].innerHTML="x";
			tsoSpan[1].innerHTML="校验码是6位数字，请重新输入";
			tsoSpan[0].style.background="#FF3F13";
			tsoSpan[1].style.color="#FF3F13";
		}
		//正确进行跳转
		if(tsoSpan[0].style.background=="limegreen"){
			yzPhone_1.style.display="none";
			UserSelect.style.display="block";
			yz_yzm.style.cssText="transition: all ease .7s;margin-left: -140px;";//点击确认且正确，验证码提示进行隐藏
		}
	};
	
	////////////////////////////////////////////////////////////////
	//5.验证手机点确认按钮击事件
	/*
	 * 6.查找账号是否存在
	 */
	var UserSelect = document.getElementById("UserSelect");
	var UserSelect_close = document.getElementsByClassName("UserSelect_close")[0];
	var UserContentBox = document.getElementsByClassName("UserContentBox")[0];
	var oFont = UserContentBox.getElementsByTagName("font")[0];
	var Ospan = UserContentBox.getElementsByTagName("span")[4];
	var idInformation = document.getElementById("idInformation");
	var Ospan_1 = idInformation.getElementsByTagName("span")[1];
	
	//关闭按钮
	UserSelect_close.onclick=function(){
		UserSelect.style.display="none";
		Ad.style.display="none";//蒙版
	};
	
	////////////////////////////////////////////////////////////////
	//7.手机验证码盒子提示点击事件
	yz_yzmSpan.onclick=function(){
		yz_yzm.style.cssText="transition: all ease .7s;margin-left: -140px;";//隐藏
	}
	//该账户是我的，立即登录
	$(".UserContentBox").find("span").eq(3).on("click",function(){
		window.location.href="login.html";
	});
	////////////////////////////////////////////////////////////////
	//7.不是我的，继续注册点击事件
	Ospan.onclick=function(){
		UserSelect.style.display="none";
		Ad.style.display="none";//蒙版
		$("#idInformation").css("display","block");
		$(".registerPhone").css("display","none");
		//填写账号信息下划线+2按钮变色 find(),还有其他的方法，这不是唯一
		$(".regesiter_note").find("span").eq(1).css("background","#FF5000");
		$(".regesiter_note").find("li").eq(1).css({"border-bottom":"2px solid #FF5000","color":"#3C3C3C"});
	}
	
	
	////////////////////////////////////////////////////////////////
	/*
	 * 二、填写账号信息(jquery)
	 *    1.input 框失去焦点
	 *    2.input 框获取焦点
	 * 	  3.填写账号信息提交按钮点击事件
	 * 		3.1 cookie保存用户注册信息
	 *          3.11 登录名
	 * 			3.12 绑定手机
	 * 			3.13 淘宝会员名
	 */
	//1.input 框失去焦点
	var login_pass = /^[A-Za-z0-9-]{6,18}$/;  //密码
	var login_Name = /^[a-zA-Z0-9_\u4e00-\u9fa5]{5,25}$/; //匹配中文:[\u4e00-\u9fa5]
	//input框1
	var $login_oInput = $(".login_pass").find("input").eq(0);
	var $login_oSpqn_1 = $(".login_pass:eq(0)").find("span").eq(1);
	var $login_oSpqn_2 = $(".login_pass:eq(0)").find("span").eq(2);
	var $login_oSpqn_3 = $(".login_pass:eq(0)").find("span").eq(3);
	var $login_oSpqn_4 = $(".login_pass:eq(0)").find("span").eq(4);
	//input框2
	var $login_oInput2 = $(".login_pass").find("input").eq(1);
	var $login_oSpqn_21 = $(".login_pass:eq(1)").find("span").eq(1);
	var $login_oSpqn_22 = $(".login_pass:eq(1)").find("span").eq(2);
	//input框3
	var $login_oInput3 = $(".login_pass").find("input").eq(2);
	var $login_oSpqn_31 = $(".login_pass:eq(2)").find("span").eq(1);
	var $login_oSpqn_32 = $(".login_pass:eq(2)").find("span").eq(2);
	
	//input框1：失去焦点
	$login_oInput.on("input",function(){
		$login_oSpqn_1.css("opacity","1");
		if(login_pass.test($login_oInput.val())==true){
			$login_oSpqn_1.html("√");
			$login_oSpqn_1.css("background","limegreen");
			$login_oSpqn_2.html("");
			$login_oInput.css("border-color","");
			if($login_oInput.val().length>=6&&$login_oInput.val().length<=10){
				$login_oSpqn_3.html("强度：");
				$login_oSpqn_4.html("低");
			}
			else if($login_oInput.val().length>=11&&$login_oInput.val().length<=16){
				$login_oSpqn_3.html("强度：");
				$login_oSpqn_4.html("中");
			}
			else{
				$login_oSpqn_3.html("强度：");
				$login_oSpqn_4.html("高");
			}
		}
		else if($login_oInput.val()==null||$login_oInput.val()==""){
			$login_oSpqn_2.html("请设置您的登录密码");
			$login_oInput.css("border-color","red");
			$login_oSpqn_1.html("x");
			$login_oSpqn_1.css("background","");
			$login_oSpqn_3.html("");
			$login_oSpqn_4.html("");
		}
		else if($login_oInput.val().length<7){
			$login_oSpqn_2.html("密码长度过低(6-18位)");
			$login_oInput.css("border-color","red");
			$login_oSpqn_1.html("x");
			$login_oSpqn_1.css("background","");
			$login_oSpqn_3.html("");
			$login_oSpqn_4.html("");
		}
		else{
			$login_oSpqn_2.html("密码设置不符合要求(字母、数字、-组合)");
			$login_oInput.css("border-color","red");
			$login_oSpqn_1.html("x");
			$login_oSpqn_1.css("background","");
			$login_oSpqn_3.html("");
			$login_oSpqn_4.html("");
		}
	});
	//input框2：失去焦点
//	$login_oInput2.blur(function(){});
	$login_oInput2.on("input",function(){
		$login_oSpqn_21.css("opacity","1");
		if($login_oInput2.val()==$login_oInput.val()&&$login_oInput2.val()!=""){
//			console.log($login_oInput2.val());
			$login_oSpqn_21.html("√");
			$login_oSpqn_21.css("background","limegreen");
			$login_oSpqn_22.html("");
			$login_oInput2.css("border-color","");
		}
		else if($login_oInput2.val()==null||$login_oInput2.val()==""){
			$login_oSpqn_22.html("请再次设置您的登录密码");
			$login_oInput2.css("border-color","red");
			$login_oSpqn_21.html("x");
			$login_oSpqn_21.css("background","");
		}
		else if($login_oInput2.val()!=$login_oInput.val()){
			$login_oSpqn_22.html("两次密码输入不一致");
			$login_oInput2.css("border-color","red");
			$login_oSpqn_21.html("x");
			$login_oSpqn_21.css("background","");
		}
	});
	//input框3：失去焦点
	$login_oInput3.on("input",function(evt){
		var Oevent = event || evt;
		$login_oSpqn_31.css("opacity","1");
		if(login_Name.test($login_oInput3.val())==true){
			$login_oSpqn_31.html("√");
			$login_oSpqn_31.css("background","limegreen");
			$login_oSpqn_32.html("");
			$login_oInput3.css("border-color","");
		}
		else if($login_oInput3.val()==null||$login_oInput3.val()==""){
			$login_oSpqn_32.html("建议会员名使用简体中文，方便好记");
			$login_oSpqn_32.css("color","#3C3C3C");
			$login_oInput3.css("border-color","red");
			$login_oSpqn_31.html("i");
			$login_oSpqn_31.css("background","#00C0FF");
		}
		else{
			$login_oSpqn_32.html("5-25个字符，推荐使用中文，一旦设置成功无法修改");
			$login_oInput3.css("border-color","red");
			$login_oSpqn_31.html("x");
			$login_oSpqn_31.css("background","");
			$login_oSpqn_32.css("color","");
		}
		Oevent.preventDefault();
	});
	
	//2.input 框获取焦点
	//input框1：获取焦点
	//$login_oInput.on({"fours":fn1,"input":fn2});  //绑定多个事件
	$login_oInput.on("focus",function(){
		$login_oInput.css("border-color","");
	});
	//input框2：获取焦点
	$login_oInput2.on("focus",function(){
		$login_oInput2.css("border-color","");
	});
	//input框3：获取焦点
	$login_oInput3.on("focus",function(){
		$login_oInput3.css("border-color","");
	});
	$login_oInput3.on("input",function(){//oninput 事件在用户输入时触发。
		$(".login_pass > font").html($login_oInput3.val().length+"字符");
		if($login_oInput3.val()==""||$login_oInput3.val()==null){
			$(".login_pass > font").css("display","none");
		}else{
			$(".login_pass > font").css("display","block");
		}
	});
		
	//3.填写账号信息提交按钮点击事件
	var idInformation_submit_1 =  document.getElementsByClassName("idInformation_submit")[0];
	idInformation_submit_1.onclick=function(){
		if((login_pass.test($login_oInput.val())==true)&&($login_oInput2.val()==$login_oInput.val()&&$login_oInput2.val()!="")&&(login_Name.test($login_oInput3.val())==true)&&(getCookie($login_oInput3.val()))){
			$login_oSpqn_32.html("会员名已被注册，请重新输入");
			$login_oInput3.css("border-color","red");
			$login_oSpqn_31.html("x");
			$login_oSpqn_31.css("background","");
			$login_oSpqn_32.css("color","");
		}
		else if((login_pass.test($login_oInput.val())==true)&&($login_oInput2.val()==$login_oInput.val()&&$login_oInput2.val()!="")&&(login_Name.test($login_oInput3.val())==true)){
			$("#idInformation").css("display","none");
			$(".regesiter_note").find("span").eq(2).css("background","#FF5000");
			$(".regesiter_note").find("li").eq(2).css({"border-bottom":"2px solid #FF5000","color":"#3C3C3C"});
			$("#register_payment").css("display","block");
			//3.显示淘宝会员名(注册成功)
			$("#reg_successfully").find("span").eq(4).html($login_oInput3.val());
			//$login_oInput3.val()-->会员名,$login_oInput.val()-->密码,$(".text > input[type=text]").val()-->绑定的手机号
			setCookie($("#ReLoginCookie").val(),[$("#ReLoginCookie").val(),$("#ReLoginCookie2").val(),$(".text > input[type=text]").val()],date_1);	
		}
		if(($login_oInput.val()==null||$login_oInput.val()=="")&&($login_oInput2.val()==null||$login_oInput2.val()=="")&&($login_oInput3.val()==null||$login_oInput3.val()=="")){
			$login_oSpqn_1.css("opacity","1");
			$login_oSpqn_21.css("opacity","1");
			$login_oSpqn_31.css("opacity","1");
			$login_oSpqn_2.html("请设置您的登录密码");
			$login_oInput.css("border-color","red");
			$login_oSpqn_1.html("x");
			
			$login_oSpqn_22.html("请再次设置您的登录密码");
			$login_oInput2.css("border-color","red");
			$login_oSpqn_21.html("x");
			
			$login_oSpqn_32.html("建议会员名使用简体中文，方便好记");
			$login_oSpqn_32.css("color","#3C3C3C");
			$login_oInput3.css("border-color","red");
			$login_oSpqn_31.html("i");
			$login_oSpqn_31.css("background","#00C0FF");
		}
	};
	
	
	////////////////////////////////////////////////////////////////
	/*
	 * 三、设置支付方式(jquery)
	 * 	  1.我同意快捷支付服务协议按钮点击事件
	 * 	  2.姓名验证        //匹配中文:[\u4e00-\u9fa5]
	 * 	  3.身份证号验证
	 *    4.银行卡号验证
	 *    5.支付密码验证
	 * 	  6.快捷支付服务协议点击事件
	 * 	  7.确认按钮点击事件
	 *    8.直接跳过点击事件
	 */
	//1.我同意快捷支付服务协议按钮点击事件
	var n_4 = 0;
	$(".oinput").on("click",function(){
		if(n_4==0){
			$(".oinput").css("background","white");
			n_4 = 1;
		}
		else{
			$(".oinput").css("background","limegreen");
			n_4 = 0;
		}
//		console.log(n_4);
	});
	//2.姓名验证
	var payment_userName = /^[\u4e00-\u9fa5]{2,6}$|^[a-zA-Z]{2,10}$/;
	var $payment_input1 = $(".userName_1").find("input").eq(0);
	var $payment_oSpan1 = $(".userName_1:eq(0)").find("span").eq(1);
	var $payment_oSpan12 = $(".userName_1:eq(0)").find("span").eq(2);
	$payment_input1.on("input",function(){
		$payment_oSpan1.css("opacity","1");
		if(payment_userName.test($payment_input1.val())==true){
			$payment_oSpan1.html("√");
			$payment_oSpan1.css("background","limegreen");
			$payment_oSpan12.html("");
			$payment_input1.css("border-color","");
		}
		else if($payment_input1.val()==null||$payment_input1.val()==""){
			$payment_oSpan1.html("x");
			$payment_oSpan1.css("background","");
			$payment_oSpan12.html("请输入真实姓名");
			$payment_input1.css("border-color","red");
		}
		else{
			$payment_oSpan1.html("x");
			$payment_oSpan1.css("background","");
			$payment_oSpan12.html("格式错误(全中文、全英文、长度2-5、非数字、无空格)");
			$payment_input1.css("border-color","red");
		}
	});
	$payment_input1.on("focus",function(){
		$payment_input1.css("border-color","");
	});
	//3.身份证号验证
	var payment_sfzNum = /^[\d]{17}(\d|X)$/;
	var $payment_input2 = $(".userName_1").find("input").eq(1);
	var $payment_oSpan2 = $(".userName_1:eq(1)").find("span").eq(1);
	var $payment_oSpan22 = $(".userName_1:eq(1)").find("span").eq(2);
	$payment_input2.on("input",function(){
		$payment_oSpan2.css("opacity","1");
		if(payment_sfzNum.test($payment_input2.val())==true){
			$payment_oSpan2.html("√");
			$payment_oSpan2.css("background","limegreen");
			$payment_oSpan22.html("");
			$payment_input2.css("border-color","");
		}
		else if($payment_input2.val()==null||$payment_input2.val()==""){
			$payment_oSpan2.html("x");
			$payment_oSpan2.css("background","");
			$payment_oSpan22.html("请输入身份证号");
			$payment_input2.css("border-color","red");
		}else{
			$payment_oSpan2.html("x");
			$payment_oSpan2.css("background","");
			$payment_oSpan22.html("身份证号格式错误,请检查是否正确(18位)");
			$payment_input2.css("border-color","red");
		}
	});
	$payment_input2.on("focus",function(){
		$payment_input2.css("border-color","");
	});
	//4.银行卡号验证
	var payment_yhkNum = /^([1-9]{1})(\d{14}|\d{18})$/;  //()为分组匹配
	var $payment_input3 = $(".userName_1").find("input").eq(2);
	var $payment_oSpan3 = $(".userName_1:eq(2)").find("span").eq(1);
	var $payment_oSpan32 = $(".userName_1:eq(2)").find("span").eq(2);
	$payment_input3.on("input",function(){
		$payment_oSpan3.css("opacity","1");
		if(payment_yhkNum.test($payment_input3.val())==true){
			$payment_oSpan3.html("√");
			$payment_oSpan3.css("background","limegreen");
			$payment_oSpan32.html("");
			$payment_input3.css("border-color","");
		}
		else if($payment_input3.val()==null||$payment_input3.val()==""){
			$payment_oSpan3.html("x");
			$payment_oSpan3.css("background","");
			$payment_oSpan32.html("请输入银行卡号");
			$payment_input3.css("border-color","red");
		}else{
			$payment_oSpan3.html("x");
			$payment_oSpan3.css("background","");
			$payment_oSpan32.html("银行卡号格式错误,请检查是否正确(16位或18位)");
			$payment_input3.css("border-color","red");
		}
	});
	$payment_input3.on("focus",function(){
		$payment_input3.css("border-color","");
	});
	//5.支付密码验证
	var payment_pass = /(((\d{5,18})([A-Za-z._-]+))|(([A-Za-z._-]+)(\d{5,18})))/;  //密码,至少匹配一个.号,顺序随机
	var $payment_input4 = $(".userName_1").find("input").eq(3);
	var $payment_oSpan4 = $(".userName_1:eq(3)").find("span").eq(1);
	var $payment_oSpan42 = $(".userName_1:eq(3)").find("span").eq(2);
	var $payment_oSpan43 = $(".userName_1:eq(3)").find("span").eq(3);
	var $payment_oSpan44 = $(".userName_1:eq(3)").find("span").eq(4);
	//5.1 再次支付密码验证
	var $payment_input5 = $(".userName_1").find("input").eq(4);
	var $payment_oSpan5 = $(".userName_1:eq(4)").find("span").eq(1);
	var $payment_oSpan52 = $(".userName_1:eq(4)").find("span").eq(2);
	
	$payment_input4.on("input",function(){
		$payment_oSpan4.css("opacity","1");
		if(payment_pass.test($payment_input4.val())==true){
			$payment_oSpan4.html("√");
			$payment_oSpan4.css("background","limegreen");
			$payment_oSpan42.html("");
			$payment_input4.css("border-color","");
			if($payment_input4.val().length>=5&&$payment_input4.val().length<=10){
				$payment_oSpan43.html("强度：");
				$payment_oSpan44.html("低");
			}
			else if($payment_input4.val().length>=11&&$payment_input4.val().length<=16){
				$payment_oSpan43.html("强度：");
				$payment_oSpan44.html("中");
			}
			else{
				$payment_oSpan43.html("强度：");
				$payment_oSpan44.html("高");
			}
		}
		else if($payment_input4.val()==null||$payment_input4.val()==""){
			$payment_oSpan4.html("x");
			$payment_oSpan4.css("background","");
			$payment_oSpan42.html("请设置支付密码");
			$payment_input4.css("border-color","red");
			$payment_oSpan43.html("");
			$payment_oSpan44.html("");
		}
		else{
			$payment_oSpan4.html("x");
			$payment_oSpan4.css("background","");
			$payment_oSpan42.html("格式错误(非中文、字母+数字(最低5位数字)");
			$payment_input4.css("border-color","red");
			$payment_oSpan43.html("");
			$payment_oSpan44.html("");
		}
	});
	//5.1 再次支付密码验证
	$payment_input5.on("input",function(){
		$payment_oSpan5.css("opacity","1");
		if(($payment_input4.val()==$payment_input5.val())&&$payment_input5.val()!=""){
			$payment_oSpan5.html("√");
			$payment_oSpan5.css("background","limegreen");
			$payment_oSpan52.html("");
			$payment_input5.css("border-color","");
		}
		else if($payment_input5.val()==null||$payment_input5.val()==""){
			$payment_oSpan5.html("x");
			$payment_oSpan5.css("background","");
			$payment_oSpan52.html("请确认支付密码");
			$payment_input5.css("border-color","red");
		}
		else if(($payment_input4.val()!=$payment_input5.val())&&$payment_input5.val()!=""){
			$payment_oSpan5.html("x");
			$payment_oSpan5.css("background","");
			$payment_oSpan52.html("两次密码输入不一致");
			$payment_input5.css("border-color","red");
		}
	});
	
	$payment_input4.on("focus",function(){
		$payment_input4.css("border-color","");
	});
	$payment_input5.on("focus",function(){
		$payment_input5.css("border-color","");
	});
	//6.快捷支付服务协议点击事件
	var $userName_2 = $(".userName_2").find("font");
	$userName_2.on("click",function(){
		$("#paymentHttp").css("display","block");
		Ad.style.display="block";//蒙版
	});
	//关闭按钮
	$(".paymentHttp").find("span").on("click",function(){
		$("#paymentHttp").css("display","none");
		Ad.style.display="none";//蒙版
	});
	//jq拖动
//	$(".paymentHttp").on("mousedown",function(evt){
//		var oEvent = evt || event;
//		
//	});
	//js原生拖动
//	var paymentHttp = document.getElementById("paymentHttp");
//	var paymentHttp1 = document.getElementsByClassName("paymentHttp");
//	paymentHttp.onmousedown=function(evt){
//		var oEvent = evt || event;
//		var a_6 = oEvent.clientX - paymentHttp.offsetLeft;
//		var b_6 = oEvent.clientY - paymentHttp.offsetTop;
//		var bodyWidth = document.body.clientWidth;
//		var bodyheight = document.body.clientHeight;
//		document.onmousemove=function(evt){
//			var oEvent = evt || event;
//			paymentHttp.style.left=oEvent.clientX-a_6+"px";
//			paymentHttp.style.top=oEvent.clientY-b_6+"px";
//		}
//		document.onmouseup=function(){
//			document.onmousemove=null;
//			document.onmouseup=null;
//		}
//	};

	//7.确认按钮点击事件
	$(".payment_submit").on("click",function(){
		if((payment_userName.test($payment_input1.val())==true)&&(payment_sfzNum.test($payment_input2.val())==true)&&(payment_yhkNum.test($payment_input3.val())==true)&&(payment_pass.test($payment_input4.val())==true)&&(($payment_input4.val()==$payment_input5.val())&&$payment_input5.val()!="")&&(n_4==0)){
			$("#register_payment").css("display","none");
			$(".regesiter_note").find("span").eq(3).css("background","#FF5000");
			$(".regesiter_note").find("li").eq(3).css({"border-bottom":"2px solid #FF5000","color":"#3C3C3C"});
			$("#reg_successfully").css("display","block");
		}
		if(($payment_input1.val()=="")&&($payment_input2.val()=="")&&($payment_input4.val()=="")&&($payment_input5.val()=="")&&(n_4==0)){
			$payment_oSpan1.css("opacity","1");
			$payment_oSpan2.css("opacity","1");
			$payment_oSpan3.css("opacity","1");
			$payment_oSpan4.css("opacity","1");
			$payment_oSpan5.css("opacity","1");
			
			$payment_oSpan1.html("x");
			$payment_oSpan1.css("background","");
			$payment_oSpan12.html("请输入真实姓名");
			$payment_input1.css("border-color","red");
			
			$payment_oSpan2.html("x");
			$payment_oSpan2.css("background","");
			$payment_oSpan22.html("请输入身份证号");
			$payment_input2.css("border-color","red");
			
			$payment_oSpan3.html("x");
			$payment_oSpan3.css("background","");
			$payment_oSpan32.html("请输入银行卡号");
			$payment_input3.css("border-color","red");
			
			$payment_oSpan4.html("x");
			$payment_oSpan4.css("background","");
			$payment_oSpan42.html("请设置支付密码");
			$payment_input4.css("border-color","red");
			$payment_oSpan43.html("");
			$payment_oSpan44.html("");
			
			$payment_oSpan5.html("x");
			$payment_oSpan5.css("background","");
			$payment_oSpan52.html("请确认支付密码");
			$payment_input5.css("border-color","red");
		}
	});
	//8.直接跳过点击事件
	$(".userName").find("span").eq(3).on("click",function(){
		$("#register_payment").css("display","none");
		$(".regesiter_note").find("span").eq(3).css("background","#FF5000");
		$(".regesiter_note").find("li").eq(3).css({"border-bottom":"2px solid #FF5000","color":"#3C3C3C"});
		$("#reg_successfully").css("display","block");
	});
	
	////////////////////////////////////////////////////////////////
	/*
	 * 四、注册成功
	 *   1.显示登录名
	 *   2.显示绑定的手机
	 *   3.显示淘宝会员名
	 *   4.确定按钮点击事件
	 */
	//4.确定按钮点击事件
	$("#reg_successfully").find("p").eq(3).on("click",function(){
		$("#reg_successfully").css("display","none");
		window.location.href = "login.html";
	});
	
};
