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
function yedu()
{
	$("#start").html("Game Started");
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
            default:
                break;
		}
	}
}
function appendText()
{
	carname=cars[Math.floor(Math.random()*7)];
	//var rand=("yedu"+(Math.floor(Math.random()*1000000))).toString();
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

function gover(a)
{
	$("#final_score").text(a);
	$("#start").text("start");
	$("#gover").fadeIn(100);
	$("#gover").css("color","white");
	$("#final_score").css("font-size","40px");
	$("#final_score").css("background","green");
	$("#final_score").css("padding-left","10px");
	$("#final_score").css("padding-right","10px");
	$("#gover").css("background","rgb(100,100,100)");
	$("#gover").css("text-shadow","1px 1px 1px white,2px 2px 2px black");
}
