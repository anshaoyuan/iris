/**
 * 提示框
 */

define(function() {
	
	
	 // global configs to be use accross the whole page
	  var globalConfigs = {},
	  
	  // global var to store the auto generate msgID
	  msgID = 0,
	  
	  // global var to store the setTimeout function,
	  // it would be call later with clearTimeout
	  autoUnblock,

	  // a global var to store the beforeUnblock event handler for each msg
	  beforeUnblock = [ function(){}];
     
	 
	  // the jquery plugin
	  $.msg = function(){
	    var $overlay, $content, options, type, configs, _, publicMethods;
	    
	    options = [].shift.call( arguments );
	    type = {}.toString.call( options );
	    
	    // merge default setting with globalConfigs
	    configs = $.extend({
	      // after block event handler
	      afterBlock : function(){},
	      autoUnblock : true,
	      
	      // options for $.center( center ) plugin
	      center : { topPercentage : 0.4 },
	      css : {},
	      
	      // click overlay to unblock
	      clickUnblock : true,
	      content : "请稍等..." ,
	      fadeIn : 200,
	      fadeOut : 200,
	      bgPath : sysPath + '/assets/js/plug-in/jquery-msg/',
	      confirm:false,
	      cancel:false,
	      clickOk:$.noop,
	      clickCancel:$.noop,
	      // default theme
	      klass : 'black-on-white',
	      
	      // jquery methodds, can be appendTo, after, before...
	      method : 'appendTo',
	      
	      // DOM target to be insert into the msg
	      target : 'body',
	      
	      // default auto unblock count down
	      timeOut : 1000,
	      
	      // default z-index of the overlay
	      z : 10000

	    }, globalConfigs );
	    
	
	    // merge default setting with user options
	    type === '[object Object]' && $.extend( configs, options );
	    
	    if (configs.confirm) {
	    	configs.autoUnblock=false;
	    	configs.clickUnblock=false;
		}
	    
	    
	    // private methods
	    _ = {
	      // private unblock method
	      unblock : function(){
	        // remove msg after fade out
	        $overlay = $( '.jquery-msg-overlay' ).fadeOut( configs.fadeOut, function(){

	          // beforeUnblock event callback
	          beforeUnblock[ configs.msgID ]( $overlay );
	          $overlay.remove();
	        });
	        
	        // clear the auto unblock function
	        clearTimeout( autoUnblock );
	      }
	    };

	    publicMethods = {
	      
	      // unblock the screen
	      unblock : function( ms, _msgID ){
	        
	        // default unblock delay is 0 ms
	        var _ms = ms === undefined ? 0 : ms;
	        
	        // set msgID
	        configs.msgID = _msgID === undefined ? msgID : _msgID;
	        
	        setTimeout( function(){
	          _.unblock();
	        }, _ms );
	      },
	      
	      // replace current content in the msg
	      replace : function( content ){
	        if({}.toString.call( content ) !== '[object String]' ){
	          throw '$.msg(\'replace\'); error: second argument has to be a string';
	        }
	        
	        // replace old contant with new content and set the msg box to center
	        $( '#jquery-msg-content' ).empty().html( content ).center( configs.center );
	      },
	      
	      overwriteGlobal : function( name, config ){
	        globalConfigs[ name ] = config;
	      }
	    };
	    
	    // generate msgID
	    msgID--;
	    
	    // if not specified use the auto generate msgID
	    configs.msgID = configs.msgID === undefined ? 
	      msgID : 
	      configs.msgID;
	    
	    // check if the beforeUnblock event handler is defined in the user option
	    // otherwise assign it a empty function
	    beforeUnblock[ configs.msgID ] = configs.beforeUnblock === undefined ? 
	      function(){} :
	      configs.beforeUnblock;

	    // if options is a string execute public method
	    if( type === '[object String]' ){
	      publicMethods[ options ].apply( publicMethods, arguments );
	    }else{
	    	var cont='';
	    	if (configs.confirm && configs.cancel) {
			cont='<div class="btn-wrap"  style="padding:10px 10px 0px 10px;"><ul class="nav btn btn-signup box-round3 go-r" style="padding:0px 3px;margin:0px;"><li><a>确定</a></ul>&nbsp&nbsp&nbsp<ul class="nav btn btn-signup box-round3 go-r" style="padding:0px 3px;float: right;margin:0px;"><li><a>取消</a></li></ul></div>';	
			}else if (configs.cancel) {
			cont='<div class="btn-wrap"  style="padding:10px 10px 0px 10px;"><ul class="nav btn btn-signup box-round3 go-r pull-right" style="padding:0px 3px;margin:0px;"><li><a>取消</a></li></ul></div>';
			}else if(configs.confirm){
				cont='<div class="btn-wrap"  style="padding:10px 10px 0px 10px;"><ul class="nav btn btn-signup box-round3 go-r pull-right" style="padding:0px 3px;margin:0px;"><li><a>确定</a></li></ul></div>';
			}
	      // DOM el
	      // for ie fade in trans we have to use img instead of div
	      $overlay = $(
	        '<div  class="' + configs.klass + ' jquery-msg-overlay" style="position:absolute; z-index:' + configs.z + '; top:0px; right:0px; left:0px; height:' + $(document).height() + 'px;">' +
	          '<img src="' + configs.bgPath + 'blank.gif" id="jquery-msg-bg" style="width: 100%; height: 100%; top: 0px; left: 0px;"/>' +
	          '<div id="jquery-msg-content" class="jquery-msg-content" style="position:absolute;">' +
	            configs.content +cont+
	          '</div>' +
	        '</div>'
	      );
	      
	      // configs.method can be appendTo, after ...
	      $overlay[ configs.method ]( configs.target );
	      
	      // set content ( msg ) to center before hiding
	      // and apply user option css if any
	      $content = $( '#jquery-msg-content' ).
	        center( configs.center ).
	        css( configs.css ).
	        hide();
	      
	      // fadein the content after fade in the bg
	      // then trigger afterBlock event handler
	      $overlay.
	        hide().
	        fadeIn( configs.fadeIn, function(){
	          $content.fadeIn( 'fast' ).children().andSelf().bind( 'click', function( e ){
	            e.stopPropagation();
	          });
	          
	          // execute afterBlock callback
	          configs.afterBlock.call( publicMethods, $overlay );

	          // apply click unblock if the config set to true
	          configs.clickUnblock &&
	            $overlay.bind( 'click', function( e ){
	              e.stopPropagation();
	              _.unblock();
	            });
	          
	          // apply auto unblock if the config set to true
	          if( configs.autoUnblock ){
	            autoUnblock = setTimeout( _.unblock , configs.timeOut );
	          }
	          
	          $overlay.find('.btn-wrap>ul:first>li>a').bind('click',function(e){
	        	  e.stopPropagation();
	        	  _.unblock();
	        	  setTimeout(function(){configs.clickOk()},configs.fadeOut+100);
	        	  
	          });
	          
	          $overlay.find('.btn-wrap>ul:last>li>a').bind('click',function(e){
	        	  e.stopPropagation();
	        	  _.unblock();
	        	  setTimeout(function(){configs.clickCancel()},configs.fadeOut+100);
	          });
	        });
	    }

	    // return this to enable chaining
	    return this;
	  };
	
	  $.fn.center = function(c) {		
			var a=window;
		    var	b=$;
			var d, e;
			d = b(a);
			e = d.scrollTop();
			return this.each(function() {
				var h, g, f;
				h = b(this);
				g = b.extend( {
					against : "window",
					top : false,
					topPercentage : 0.5
				}, c);
				f = function() {
					var k, j, i, l;
					k = g.against;
					if (k === "window") {
						j = d;
					} else {
						if (k === "parent") {
							j = h.parent();
							e = 0;
						} else {
							j = h.parents(k);
							e = 0;
						}
					}
					i = ((j.width()) - (h.outerWidth())) * 0.5;
					l = ((j.height()) - (h.outerHeight())) * g.topPercentage + e;
					if (g.top) {
						l = g.top + e;
					}
					h.css( {
						left : i,
						top : l
					});
				};
				f();
				d.resize(f);
			});
		};
	  
	function init(options) {
		$( '.jquery-msg-overlay' ).remove();
		$.msg(options); 
	};
	
	return init;
})
