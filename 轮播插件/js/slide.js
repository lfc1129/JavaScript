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
		timeInterval=3000,
		switchTime = 500,
		paginationIndex = -1,
        $paginationItems = $pagination.find('a'),
		paginationItemsLen = $paginationItems.length,
		$simpleSlideIndex = $container.find('.simpleSlide-index'),
		$simpleSlideIndexCur = null,
		$simpleSlideIndex.html('<span></span>/' + paginationItemsLen);
   	    $simpleSlideIndexCur = $simpleSlideIndex.find('span'),
		effect = 'default';//default, fade, horizontal, vertical

	// $prev.on("click",function(){
	// 	index--;
	// 	if(index<0){
	// 		index=$length-1;
	// 	}
	// 	animate(index);
	// })
	// $next.on("click",function(){
	// 	index++;
	// 	if(index>$length-1){
	// 		index=0;
	// 	}
	// 	animate(index);
	// })
	// function animate(num){
	// 	var goWay=-num*$itemWidth+'px';
	// 	$wrapperWidth.animate({"left":goWay});
	// 	pagination(num);
	// }
	// var timer=setInterval(function(){
	// 	$next.click();
	// },timeInterval);
	
	// $container.on("mouseover",function(){
	// 	clearInterval(timer);
	// })
	// $container.on("mouseout",function(){
	// 	timer=setInterval(function(){
	// 		$next.click();
	// 	},timeInterval);
	// })

	// function pagination(curIndex){
	// 	$pagination.find("a").eq(curIndex).addClass("on").siblings("a").removeClass("on");
	// }

	// $pagination.on("click","a",function(){
	// 	var index=$(this).index();
	// 	animate(index);
	// })
	// $pagination.eq(0).addClass("on");

	var initSetting={
		'default':function(){
		},
		'fade':function(){
			$item.css({"position":"absolute","top":0,"left":0});
		},
		'horizontal':function(){
			  var containerWidth = $container.width();
		},
		'vertical':function(){

		}
	}
	 

	var optionalArgs = initSetting[effect]();
 // console.log(optionalArgs);
	var switchEffect = {
		'default':function(slideItemIndex,switchTime,optionalArgs){
			$item.hide().eq(slideItemIndex).show();
		},
		 'fade': function (slideItemIndex, switchTime, optionalArgs) {
            $item.stop().fadeOut(switchTime).eq(slideItemIndex).stop().fadeIn(switchTime);
        }
	}

	function move(switchTime, direction) {
		console.log(paginationIndex);
        if (direction === 'next') {
            paginationIndex++;
        } else if (direction == 'prev') {
            paginationIndex--;
        }
        switchEffect[effect](paginationIndex + 1, switchTime, optionalArgs);
        if (paginationIndex === -1) {
            paginationIndex = paginationItemsLen + 1;
        }
        if (paginationIndex === paginationItemsLen) {
            paginationIndex = -1;
        }
        $paginationItems.removeClass('on').eq(paginationIndex+1).addClass('on');
        // $simpleSlideIndexCur.html(paginationIndex + 1);
    }
    $paginationItems.eq(0).addClass('on');
	
	$prev.on("click",function(){
		 move(switchTime, 'prev');
	})

	$next.on("click",function(){
		 move(switchTime, 'next');
	})
})