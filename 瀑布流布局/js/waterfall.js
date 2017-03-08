$( window ).on( "load", function(){
    waterfall('main','box');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oBox = $('<div>').addClass('box').appendTo( $( "#main" ) );
                var $oPic = $('<div>').addClass('pic').appendTo( $oBox );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oPic);
            });
            waterfall();
        };
    }
});

/*
    parend 父级id
    box 元素id
*/
function waterfall(parent,box){
    var $aBox = $( "#main>div" );
    var iBoxW = $aBox.eq( 0 ).width();// 一个块框box的宽
    var num = Math.floor( $( window ).width() / iBoxW );//每行中能容纳的box个数【窗口宽度除以一个块框宽度】
    //oParent.style.cssText='width:'+iBoxW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
    $( "#main" ).css({
        'width:' : iBoxW * num,
        'margin': '0 auto'
    });

    var boxHArr=[];//用于存储 每列中的所有块框相加的高度。

    $aBox.each( function( index, value ){
        var boxH = $aBox.eq( index ).height();
        if( index < num ){
            boxHArr[ index ] = boxH; //第一行中的num个块框box 先添加进数组boxHArr
        }else{
            var minH = Math.min.apply( null, boxHArr );//数组boxHArr中的最小值minH
            var minHIndex = $.inArray( minH, boxHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH + 15,
                'left': $aBox.eq( minHIndex ).position().left
            });
            //数组 最小高元素的高 + 添加上的aBox[i]块框高
            boxHArr[ minHIndex ] += $aBox.eq( index ).height() + 15;//更新添加了块框后的列高
        }
    });
}

function checkscrollside(){
    var $aBox = $( "#main>div" );
    var lastBoxH = $aBox.last().get(0).offsetTop + Math.floor($aBox.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( document ).width();//页面高度
    return (lastBoxH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}