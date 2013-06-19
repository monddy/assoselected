/**
 * assoselected - jQuery plugin
 * @version: 1.2.0 - (2012/11/19)
 * @author Monddy (monddy.na@gmail.com)
 * Copyright (c) 2012 www.drugadmin.com
 * Licensed under the GPL (LICENSE) licens.
 * Requires: jQuery v1.4+  jquery.autocomplete.js
 */
 
(function($){

$.assoselected = function(tagParam, codeData, opts) {

	var opts	= $.extend({},{isenter:true, ischeck:true, checkWidth:920},opts); 
	
	(function(){
		tagParam.css('width',opts.checkWidth);
	})();
	if(opts.ischeck){
		(function(){
			$('#assowrap').append('<div id="checkarea"><div><input type="checkbox" id="selectall" />全选</div><ul></ul></div>');
			$('#checkarea').css('width',opts.checkWidth+'px').scroll(function(){$('#selectall').parent('div').css('top',$(this).scrollTop())});
			$('#selectall').parent('div').css({'width':$('#checkarea').get(0).offsetWidth-19 + 'px','text-indent':'15px'});
			$.each(codeData,function(k,v){
				checkItem = '<li>'+'<input type="checkbox" name="'+v+'" />'+v+'</li>';
				$('#checkarea').children('ul').append(checkItem);
			});
		})();
		//全选
		$('#selectall').click(function(){
			if($(this).attr('checked')){
				$('#checkarea').find('ul').find('input').attr('checked',$(this).attr('checked'))
				tagParam.empty();
				$('#checkarea').find('ul').find('input').each(function(){
					var currCode = $(this).parent('li').text();
					var codeLab = '<a href="javascript:void(0)">'+currCode+'</a>';
					tagParam.append(codeLab);
				})
			} else{
				$('#checkarea').find('ul').find('input').attr('checked',false);
				tagParam.empty();
			}
		})
		//点选复选框同步追加标签
		$('#checkarea').find('ul').find('input').each(function(){
			$(this).click(function(){
				var currCode = $(this).parent('li').text();
				var codeLab = '<a href="javascript:void(0)">'+currCode+'</a>';
				if($(this).attr('checked')){
					tagParam.append(codeLab);
				} else{
					tagParam.find('a').each(function(){
						if(currCode == $(this).text()){
							$(this).remove();
						}	
					})	
				}
			})
		})
	}
	
	//关闭标签同步取消复选框勾选
	tagParam.find('a').live('click',function(){
		$(this).remove();
		var labText = $(this).text();
		if(opts.ischeck){
			$('#checkarea').find('input[type=checkbox]').each(function(){
				if($(this).parent('li').text() == labText){
					$(this).attr('checked',false);
				}	
			})
		}
	})

	if(opts.isenter){
		(function(){
			$('#assowrap').append('<div id="autoComplete"><input type="text" name="textfield" id="enterInp" value="" /><ul></ul><button class="enterAdd" id="enterAdd">添加</button></div>');
			$('#autoComplete').css('width',opts.checkWidth+'px');
		})();
		//输入框方式添加码标签
		$('#enterAdd').click(function(){
			var currCode = $('#enterInp').val();
			var codeLab = '<a href="javascript:void(0)">'+currCode+'</a>';
			if(opts.ischeck){
				$('#checkarea').find('input[type=checkbox]').each(function(){
					if($(this).parent('li').text() == currCode){
						$(this).attr('checked',true);
					}
				})
			}
			var flag = null;
			if(tagParam.find('a').text() != ''){
				tagParam.find('a').each(function(){
					if($(this).text() == currCode){
						flag = 1;
					}
				});
				if(flag == 1){
					return false;	
				} else {
					tagParam.append(codeLab);
				}
			} else {
				tagParam.append(codeLab);
			}
		})
		//自动补全
		$("#autoComplete").autoComplete({
			source:codeData,
			elemCSS:{ focus:{'color':'#0f0'}, blur:{'color':'#f00'} }
		});
	}
};
})(jQuery);