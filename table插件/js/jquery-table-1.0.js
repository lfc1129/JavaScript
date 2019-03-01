//table 插件
;(function($){
   $.fn.table=function(options){
   	var defaults={
            oddClass:'odd',
            evenClass:'even',
            currentClass:'current',
            eventType:'mouseover',
            eventType2:'mouseout'
   	}
   	var options=$.extend(defaults, options);
   	this.each(function(){
   		var _this=$(this);
        _this.find("tr:odd").addClass(options.oddClass);
        _this.find("tr:even").addClass(options.evenClass);
        _this.find("tr").on(options.eventType,function(){
           $(this).addClass(options.currentClass)
        })
         _this.find("tr").on(options.eventType2,function(){
           $(this).removeClass(options.currentClass)
        })
   	})
   	return this;
   }
})(jQuery)