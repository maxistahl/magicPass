(function( $ ) {
 
    $.fn.magicPass = function(options) {
 
        var settings = $.extend({
            icon: "fa-star-o",
            backgroundColor: "white"
        }, options );
        
        var $this = this;
        
		$($this).wrap("<div class='input-password'></div>");
		$($this).closest(".input-password").append('<div class="input"></div><div class="focus-fx"></div>');

		var input = $($this).parent().find('.input');
        var icon  = input.find('.' + settings.icon);
        
		var lasticon = input.find('.' + settings.icon + ':last-child');
        
        var words = [];
	    var selected = 0;
	    var count = 0;
	    
	    $($this).parent().append('<i id="pass-cached" style="visibility:hidden; opacity: 0; height:0; width: 0; overflow:hidden;" class="fa ' + settings.icon + ' fa-lg"></i>');
        
		$($this).on('keypress',function(e){ 
			createLetter(this);
		});
		
		$($this).on('keydown',function(e){
			if(e.keyCode==8){
				destroyLetter(this);
			}
		});
		
		$( $this )
			.keyup(function(e) {
				if(e.keyCode==37){
					if(selected>0){
						--selected;
						input.find('.selected').removeClass('selected');
						input.find('.' + settings.icon + ':nth-child(' + (selected) + ')').addClass('in-place selected');
					}
				}
				if(e.keyCode==39){
					if(selected<count){
						++selected;
						input.find('.selected').removeClass('selected');
						input.find('.' + settings.icon + ':nth-child(' + (selected) + ')').addClass('in-place selected');
					}
				}
			})
			.keyup();
		
		
		var createLetter = function(){
			count++;
			selected++;
			
			words.splice(selected, 0, {
				add: function(){
					this.adding(function(o){
						setTimeout(function(){
							input.find('.selected').removeClass('selected');
							o.addClass('in-place selected');
						}, 10);
					});
				},
				destroy: function(){
					var removing = input.find('.' + settings.icon + ':nth-child(' + (selected + 1) + ')');
					
					removing.addClass('removing');
					input.find('.selected').removeClass('selected');
					input.find('.' + settings.icon + ':nth-child(' + (selected) + ')').addClass('selected');
					setTimeout(function(){
						removing.remove();
						words.splice(selected - 1, 1);
					}, 500);
				},
				adding: function(callback){
					if(count>1){
						this.selected = input.find('.' + settings.icon + ':nth-child(' + (selected - 1) + ')');
						$('<i class="fa ' + settings.icon + ' fa-lg"></i>').insertAfter(this.selected);
					}else{
						input.append('<i class="fa ' + settings.icon + ' fa-lg"></i>');
					}
					this.selected = input.find('.' + settings.icon + ':nth-child(' + (selected) + ')');
					
					callback(this.selected);
					return;
				},
				selected: {}
			});
			words[selected - 1].add();
		}
		
		var destroyLetter = function (obj){
			if(selected==0) return false;
			
			if(count>0){
				--count;
			}
			
			if(selected>0){
				--selected;
			}
			
			if(selected>count) selected = count;//esto es para que si el selected es mayor al total, el selected sea el ultimo
			
			if(selected>=0){
				words[selected].destroy();
			}
		}
 
        return this;
 
    };
 
}( jQuery ));