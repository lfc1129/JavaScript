//tab插件
;(function($){
   $.fn.tab=function(options){
   	var defaults={
   	   currentClass:'on',
        tabTit:".tabTit>li",
        tabContent:".tabContent>div",
        eventType:'click'
   	};
   	var options=$.extend({},defaults, options);
   	this.each(function(){
   		var _this=$(this);
            _this.find(options.tabTit).on(options.eventType,function(){
            	$(this).addClass(options.currentClass).siblings('li').removeClass(options.currentClass);
            	var index=$(this).index();
            	_this.find(options.tabContent).eq(index).show().siblings().hide();
            })
   	});
   	return this;
   }
})(jQuery)