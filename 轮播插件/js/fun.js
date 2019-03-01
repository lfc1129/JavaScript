(function($){
	$.fn.slide=function(opts){
  
		var defaults={
			effect: 'default',//default, fade, horizontal, vertical
                                        btnPrev: '.prev',
                                        btnNext: '.next',
                                        pagination:'.pagination',
                                        paginationItem:'a',
                                        wrapper:'.slide-wrapper',
                                        slideItem:'.slide-item',
                                         switchTime: 500,
                                          autoPlay: 0,
                                     paginationFraction: '.simpleSlide-pagination-fraction',
                                        onStart: function () {
                                        },
                                        onEnd: function () {
                                        }
		}
		var options=$.extend(defaults,opts);
      //console.log(options)
	             var $container = $(this),
		    $pagination=$container.find(options.pagination),
		    $paginationItem=$pagination.find(options.paginationItem),
		    btnPrev=options.btnPrev,
		    btnNext=options.btnNext,
		    effect=options.effect,
                         autoPlay = options.autoPlay,
		    $wrapper=$container.find(options.wrapper),
		    $slideItem = $wrapper.find(options.slideItem),
		    paginationIndex=-1,
		    switchTime=1000,
                         interval = 2000,
		    len = $slideItem.length,
		    paginationItemsLen = len,
                        switchTime = options.switchTime,
                         $paginationFraction = $container.find(options.paginationFraction),
                          $paginationFractionCurrent = null,
                           timer = null,
                           ifInitTimer = false;
                         onStart = options.onStart,
		    onEnd = options.onEnd;
		var init = function () {
		  		var initSetting = {
		  			'default': function () {
                    },
                    'fade': function () {
                        $slideItem.css({
                            position: 'absolute',
                            left: 0,
                            top: 0
                        });
                    },
        'horizontal': function () {
            var containerWidth = $container.width(),
                wrapperWidth = containerWidth * len;
            $wrapper.width(wrapperWidth);
            $slideItem.width(containerWidth).show();
            return {
                containerWidth: containerWidth
            };
        },
        'vertical': function () {
            var containerHeight = $container.height(),
                wrapperHeight = containerHeight * len;
            $wrapper.height(wrapperHeight);
            $slideItem.height(containerHeight).show();
            return {
                containerHeight: containerHeight
            };
        }
		  		};
                $slideItem.eq(0).clone().appendTo($wrapper);
                $slideItem.eq(len - 1).clone().prependTo($wrapper);
                $slideItem = $wrapper.find('.slide-item');
                $slideImgs = $slideItem.find('img');
                len = $slideImgs.length;
	    return {
                    optionalArgs: initSetting[effect]
                }

		}();
      
        var optionalArgs = init.optionalArgs();
         function slideIndexToPaginationIndex(index){
                if (index === 0) {
                        return len - 1;
                    } else if (index === len - 1) {
                        return 0;
                    } else {
                       return index - 1;
                 }
                 //console.log(index);
            }
          function setDirection(index, size) {
                if (effect === 'horizontal') {
                    return {
                        'left': -size * index
                    }
                } else if (effect === 'vertical') {
                    return {
                        'top': -size * index
                    }
                }
            }
        function goToSlideItem(index, optionalArgs, switchTime) {
            var index2;
            var size;
                if (index === len - 1) {
                    index2 = 1;
                } else if (index === 0) {
                    index2 = len - 2;
            }
           if (effect === 'horizontal' || effect === 'vertical') {
              if (effect === 'horizontal') {
                        size = optionalArgs.containerWidth;

                    } else {
                        size = optionalArgs.containerHeight
                    }
                     $wrapper.stop(true, true).animate(setDirection(index,size),switchTime,function(){
                        if (index2) {
                            $wrapper.css(setDirection(index2, size));
                        }
                        onEnd(slideIndexToPaginationIndex(index));
                     })
           }
        	if(effect === 'fade'){

        		 $slideItem.stop().fadeOut(switchTime).eq(index).stop().fadeIn(switchTime, function () {
                        onEnd(slideIndexToPaginationIndex(index));
                 });
        	} else if(effect === 'default'){
                    $slideItem.hide().eq(index).show(0, function () {
                        onEnd(slideIndexToPaginationIndex(index));
                 });
            }
        }

         // 是否分数分页
                if ($paginationFraction[0]) {
                    $paginationFraction.html('<span></span>/' + paginationItemsLen);
                    $paginationFractionCurrent = $paginationFraction.find('span');
                }

        function move(switchTime,direction){
        	  if (direction === 'next') {
		            paginationIndex++;
		      } else if (direction === 'prev') {
		            paginationIndex--;
		      }
		      goToSlideItem(paginationIndex + 1, optionalArgs, switchTime);
		      if (paginationIndex === -1) {
                    paginationIndex = paginationItemsLen - 1;
              }
                if (paginationIndex === paginationItemsLen) {
                    paginationIndex = 0;
                }
                 //console.log(paginationIndex);
                 $paginationItem.removeClass('active').eq(paginationIndex).addClass('active');
                $paginationFractionCurrent.html(paginationIndex + 1);
        }
          // move(0, 'next');
             // 向前切换
	    $container.on('click', btnPrev, function (e) {
                    e.preventDefault();
                    // prev
                    move(switchTime, 'prev');
                });
                // 向后切换
                $container.on('click', btnNext, function (e) {
                            e.preventDefault();
                            // prev
                            move(switchTime, 'next');
                });

                 // pagination
              $pagination.on('click', 'a', function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    paginationIndex = $this.index();
                    // console.log(paginationIndex);
                    move(switchTime, 'current');
                });

                // autoPlay
                 function autoPlaySlide() {
                      if (!ifInitTimer) {
                         ifInitTimer = true;
                         move(0, 'next');
                      }else{
                        move(switchTime, 'next');
                      }
                      timer= setTimeout(autoPlaySlide, autoPlay);
                 }
                autoPlaySlide();

                // 停止
                 $container
                    .on('mouseenter', function () {
                        clearTimeout(timer);
                    })
                .on('mouseleave', function () {
                    autoPlaySlide();
                });
    }
})(jQuery);