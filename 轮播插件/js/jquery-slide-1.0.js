;(function($){
   $.fn.slide=function(options){
   	var defaults={
         prev:'.prev',
         next:'.next',
         slideWrapper:'.slide-wrapper',
         slideItem:'.slide-item',
         pagination:'.pagination',
         paginationA:'.pagination a',
         speed:500,
         aotoPlay:false,
         time:1000
   	}
   	var options=$.extend(defaults,options);
   	this.each(function(){
   		$contains=$(this);
   		$prev=$contains.find(options.prev);
   		$next=$contains.find(options.next);
   		$slideWrapper=$contains.find(options.slideWrapper);
   		$slideItem=$slideWrapper.find(options.slideItem);
   		slideItemWidth=$slideItem.eq(0).width()
   		$pagination=$contains.find(options.pagination);
           $paginationA=$contains.find(options.paginationA);
           time=options.time;
           var index=0;
           var speed=options.speed;
           var aotoPlay=options.aotoPlay;
           var timer;
           //slideWrapperW=slideItemWidth*length;
          // $slideWrapper.append($slideItem.eq(0).clone())
          // $slideWrapper.prepend($slideItem.eq(length-1).clone())
           var length=$slideItem.length;
           $slideItem.width(slideItemWidth);
           $wrapperWidth=$slideWrapper.width(slideItemWidth*length),
           //点击左键
           $prev.on("click",function(){
           	index--;
                if(index<0){
                	index=length-1;
                }
                animate(index);
           })
            //点击右键
           $next.on("click",function(){
           	index++;
                if(index>length-1){
                	index=0;
                }
                animate(index);
           })
           //偏移量
          function animate(num){
           	$slideWrapper.animate({
                    'left':'-'+num*slideItemWidth+'px'
           	}, speed)
           	$paginationA.eq(num).addClass('active').siblings().removeClass('active');
           	index=num;
           }
            //点击焦点
            $paginationA.on("click",function(){
            	var index=$(this).index();
            	animate(index)
            }).eq(0).trigger('click')
            //自动轮播
            function autoPlay(){
               if(aotoPlay){
               	    timer=setInterval(function(){
	              	$next.click()
	              },time);
               }
            }
		    autoPlay();           
            $contains.on("mousemove",function(){
            	clearInterval(timer);
            })
            $contains.on("mouseout",function(){
                if(aotoPlay){
               	    timer=setInterval(function(){
	              	$next.click()
	              },time);
               }
            })
   	})
   	return this;
   }
})(jQuery)