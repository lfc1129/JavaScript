$(function(){
	var	$container=$("#container"),
		$wrapper=$container.find(".slide-wrapper"),
		$item=$wrapper.find(".slide-item"),
		$prev=$("#prev"),
		$next=$("#next"),
		$pagination=$("#pagination");
		$itemWidth=$item.width(),
		$length=$item.length,
		$wrapperWidth=$wrapper.width($itemWidth*$length),
		index=0,
		timer=0,
		timeInterval=3000;

	$prev.on("click",function(){
		index--;
		if(index<0){
			index=$length-1;
		}
		animate(index);
	})
	$next.on("click",function(){
		index++;
		if(index>$length-1){
			index=0;
		}
		animate(index);
	})
	function animate(num){
		var goWay=-num*$itemWidth+'px';
		$wrapperWidth.animate({"left":goWay});
		pagination(num);
	}
	function autoPlay(){
		timer=setInterval(function(){
			$next.click();
		},timeInterval);
	}
	 autoPlay();
	$container.on("mouseover",function(){
		clearInterval(timer);
	})
	$container.on("mouseout",function(){
		autoPlay();
	})

	function pagination(curIndex){
		$pagination.find("a").eq(curIndex).addClass("on").siblings("a").removeClass("on");
	}

	$pagination.on("click","a",function(){
		var index=$(this).index();
		animate(index);
	})

})