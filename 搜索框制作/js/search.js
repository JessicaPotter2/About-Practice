$(window).on('load',function(){
	$('#search_input').bind('keyup',function(){
		$('#search-suggest').show();
	});
});