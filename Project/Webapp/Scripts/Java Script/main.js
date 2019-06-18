let firstPost = false;

function fun(e)
{
	var a=e.which;
	var x=$('#car');
	if(a==37)
	{
		//left
		var pos=x.position();
		var poss=pos.left;
		if(poss>432)
		x.css("left",poss-68+"px");

	}
	else if(a==39)
	{
		//right
		var pos=x.position();
		var poss=pos.left;
		if(poss<770)
		x.css("left",poss+50+"px");
	}
	else if(a==38)
	{
		//up
		var pos=x.position();
		var poss=pos.top;
		if(poss>100)
		x.css("top",poss-30+"px");
	}
	else if(a==40)
	{
		//down
		var pos=x.position();
		var poss=pos.top;
		if(poss<490)
		x.css("top",poss+30+"px");
	}
}
window.addEventListener("keydown",fun,false);
	var cars=Array("Images/car_1.png","Images/car_2.png","Images/car_3.png","Images/car_4.png","Images/car_5.png","Images/car_6.png","Images/car_7.png","Images/car_8.png");
	var inte;
$(document).ready(function  () {
	$("#gover").hide();
})
function game()
{
	$("#start").html("Game started");
	$("#gover").fadeOut(100);
	$("#score").html(0);
	inte=setInterval(main,1000);
	function main()
	{
		var i=Math.floor(Math.random()*8);
		switch(i)
		{
			case 0:
                appendText();
                break;
			case 1:
								appendText2();
								break;
			case 3:
								appendText3();
								break;
			case 4:
								appendText4();
								break;
			case 5:
								appendText5();
								break;
			case 6:
								appendText6();
								break;
      default:
                break;
		}
	}
}
function appendText()
{
	carname=cars[Math.floor(Math.random()*7)];
	var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
	$("#sec1").append("<img id='"+rand+"' style='position:absolute;left:480px;top:40px;transition:0.2s;' src='"+carname+"' width='50px' height='100px' >");
	var abcd=setInterval(append,50);
	var margin=90;
	function append()
	{
		//alert(rand);
		$("#"+rand).css('top',margin+"px");
		margin+=10;
		var car_position=$("#car").position();
		var car_left=Math.floor(car_position.left);
		var car_top=Math.floor(car_position.top);
		var cm=$("#"+rand).position();
		var top=Math.floor(cm.top);
		var left=Math.floor(cm.left);
		if((top+100>=car_top && top+100<=car_top+100 && left>=car_left && left<=car_left+50 )||(car_top>=top && car_top<=top+100 && car_left>=left && car_left<=left+50 ))
		{
			var sc=$("#score").text();
			clearInterval(inte);
			gover(sc);
			
		}

		if(margin>540)
		{
			clearInterval(abcd);
			$("#"+rand).remove();
			$("#score").html(parseInt($("#score").text())+1);
			return;
		}
	}
}
function appendText2()
{
	carname=cars[Math.floor(Math.random()*7)];
	var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
	$("#sec1").append("<img id='"+rand+"' src='"+carname+"' style='position:absolute;left:630px;top:40px;transition:0.2s;' width='50px' height='100px' >");
	var abcd2=setInterval(append2,50);
	var margin2=90;

	function append2()
	{
		//alert(rand);
		$("#"+rand).css('top',margin2+"px");
		margin2+=10;
		var car_position=$("#car").position();
		var car_left=Math.floor(car_position.left);
		var car_top=Math.floor(car_position.top);
		var cm=$("#"+rand).position();
		var top=Math.floor(cm.top);
		var left=Math.floor(cm.left);
		if((top+100>=car_top && top+100<=car_top+100 && left>=car_left && left<=car_left+50 )||(car_top>=top && car_top<=top+100 && car_left>=left && car_left<=left+50 ))
		{
			var sc=$("#score").text();
			clearInterval(inte);
			gover(sc);
			
		}

		if(margin2>540)
		{
			clearInterval(abcd2);
			$("#"+rand).remove();
			$("#score").html(parseInt($("#score").text())+1);
			return;
		}
	}
}
function appendText3()
{
	carname=cars[Math.floor(Math.random()*7)];
	var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
	$("#sec1").append("<img id='"+rand+"' src='"+carname+"' style='position:absolute;left:780px;top:40px;transition:0.2s;' width='50px' height='100px' >");
	var abcd3=setInterval(append3,50);
	var margin3=40;

	function append3()
	{
		//alert(rand);
		$("#"+rand).css('top',margin3+"px");
		margin3+=10;
		var car_position=$("#car").position();
		var car_left=Math.floor(car_position.left);
		var car_top=Math.floor(car_position.top);
		var cm=$("#"+rand).position();
		var top=Math.floor(cm.top);
		var left=Math.floor(cm.left);
		if((top+100>=car_top && top+100<=car_top+100 && left>=car_left && left<=car_left+50 )||(car_top>=top && car_top<=top+100 && car_left>=left && car_left<=left+50 ))
		{
			var sc=$("#score").text();
			clearInterval(inte);
			gover(sc);
			
		}

		if(margin3>540)
		{
			clearInterval(abcd3);
			$("#"+rand).remove();
			$("#score").html(parseInt($("#score").text())+1);
			return;
		}
	}
}
function appendText4()
{
	carname=cars[Math.floor(Math.random()*7)];
	var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
	$("#sec1").append("<img id='"+rand+"' src='"+carname+"' style='position:absolute;left:710px;top:40px;transition:0.2s;' width='50px' height='100px' >");
	var abcd4=setInterval(append4,50);
	var margin4=90;

	function append4()
	{
		//alert(rand);
		$("#"+rand).css('top',margin4+"px");
		margin4+=10;
		var car_position=$("#car").position();
		var car_left=Math.floor(car_position.left);
		var car_top=Math.floor(car_position.top);
		var cm=$("#"+rand).position();
		var top=Math.floor(cm.top);
		var left=Math.floor(cm.left);
		if((top+100>=car_top && top+100<=car_top+100 && left>=car_left && left<=car_left+50 )||(car_top>=top && car_top<=top+100 && car_left>=left && car_left<=left+50 ))
		{
			var sc=$("#score").text();
			clearInterval(inte);
			gover(sc);
		
		}

		if(margin4>540)
		{
			clearInterval(abcd4);
			$("#"+rand).remove();
			$("#score").html(parseInt($("#score").text())+1);
			return;
		}
	}
}



function appendText5()
{
	carname=cars[Math.floor(Math.random()*7)];
	var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
	$("#sec1").append("<img id='"+rand+"' src='"+carname+"' style='position:absolute;left:575px;top:40px;transition:0.2s;' width='50px' height='100px' >");
	var abcd5=setInterval(append5,50);
	var margin5=90;
	function append5()
	{
		//alert(rand);
		$("#"+rand).css('top',margin5+"px");
		margin5+=10;
		var car_position=$("#car").position();
		var car_left=Math.floor(car_position.left);
		var car_top=Math.floor(car_position.top);
		var cm=$("#"+rand).position();
		var top=Math.floor(cm.top);
		var left=Math.floor(cm.left);
		if((top+100>=car_top && top+100<=car_top+100 && left>=car_left && left<=car_left+50 )||(car_top>=top && car_top<=top+100 && car_left>=left && car_left<=left+50 ))
		{
			var sc=$("#score").text();
			clearInterval(inte);
			gover(sc);
			
		}
		if(margin5>540)
		{
			clearInterval(abcd5);
			$("#"+rand).remove();
			$("#score").html(parseInt($("#score").text())+1);
			return;
		}
	}
}
function appendText6()
{
	carname=cars[Math.floor(Math.random()*7)];
	var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
	$("#sec1").append("<img id='"+rand+"' src='"+carname+"' style='position:absolute;left:410px;top:40px;transition:0.2s;' width='50px' height='100px' >");
	var abcd6=setInterval(append6,50);
	var margin6=90;
	function append6()
	{
		//alert(rand);
		$("#"+rand).css('top',margin6+"px");
		margin6+=10;
		var car_position=$("#car").position();
		var car_left=Math.floor(car_position.left);
		var car_top=Math.floor(car_position.top);
		var cm=$("#"+rand).position();
		var top=Math.floor(cm.top);
		var left=Math.floor(cm.left);
		if((top+100>=car_top && top+100<=car_top+100 && left>=car_left && left<=car_left+50 )||(car_top>=top && car_top<=top+100 && car_left>=left && car_left<=left+50 ))
		{
			var sc=$("#score").text();
			clearInterval(inte);
			gover(sc);
			
		}
		if(margin6 > 540)
		{
			clearInterval(abcd6);
			$("#" + rand).remove();
			$("#score").html(parseInt($("#score").text())+1);
			return;
		}

	}
}

function gover(a)
{
	if(!firstPost)
	{
		firstPost = true;
		Post(a);
	}
	$("#final_score").text(a);
	$("#start").text("Start");
	$("#gover").fadeIn(100);
	$("#gover").css("color","white");
	$("#final_score").css("font-size","40px");
	$("#final_score").css("background","green");
	$("#final_score").css("padding-left","10px");
	$("#final_score").css("padding-right","10px");
	$("#gover").css("background","rgb(100,100,100)");
	$("#gover").css("text-shadow","1px 1px 1px white,2px 2px 2px black");	
}

function Post(scores)
{
	PostScores(scores);
}
