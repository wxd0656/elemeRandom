$(function () {
    var run = 0,
        heading = $("h1"),
        timer,
        selected,
        list = [];

    $("#start").click(function () {
        if (list.length===0) {
            alert('这个收货地址附近可没有餐馆哦！你不会填了火星吧？！');
            return;
        }
        if (!run) {
            heading.html(heading.html().replace("揍吃这！", "吃点儿嘛啊？"));
            $(this).val("停止");
            timer = setInterval(function () {
                var r = Math.ceil(Math.random() * list.length);    
                selected = list[r - 1];
                var food = selected.name;
                $("#what").html("<a style='color:#FF9733' href='https://www.ele.me/shop/"+ selected.id +"'>"+ food +"</a>");
                var rTop = Math.ceil(Math.random() * $(document).height()),
                    rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
                    rSize = Math.ceil(Math.random() * (37 - 14) + 14);
                $("<span class='temp'></span>").html(food).hide().css({
                    "top": rTop,
                    "left": rLeft,
                    "color": "rgba(0,0,0,." + Math.random() + ")",
                    "fontSize": rSize + "px"
                }).appendTo("body").fadeIn("slow", function () {
                    $(this).fadeOut("slow", function () {
                        $(this).remove();
                    });
                });
            }, 50);
            run = 1;
        } else {
           heading.html(heading.html().replace("吃点儿嘛啊？", "揍吃这！"));
            $(this).val("不行，换一个");
            clearInterval(timer);
            $('#detail').html(buildDetial(selected));
            $("a").hover( function(event){
                $('.dialog').show();
            }, function(event){
                $('.dialog').hide();
            } );
            run = 0;
        };
        // var list = $("#list").val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
        // var list = JSON.parse($("#list").val());
        // console.log(list);
        
    });

    document.onkeydown = function enter(e) {
        var e = e || event;
        if (e.keyCode == 13) $("#start").trigger("click");
    };


    $('#place').autocomplete({
        delay: 1000,
        source: function( request, response ) {
            $.ajax({
                url: "/place",
                dataType: "json",
                data:{
                    city: { latitude : $("#city").data('lat'),longitude: $("#city").data('lnt')},
                    place: request.term
                },
                success: function( data ) {
                    response(data.places);
                }
            });
        },
        focus: function( event, ui ) {
            $( "#place" ).val( ui.item.name );
            return false;
        },
        select: function( event, ui ) {
            console.log(ui.item);
            $.ajax({
                url: "/search",
                dataType: "json",
                data:{
                    geohash: ui.item.geohash
                },
                success: function(data) {
                    list = data.restaurants;
                }
            })
            return false;
        }
    })
    .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
            .append( "<a><b>" + item.name + "</b><br><font size='2'>" + item.address + "</font></a>" )
            .appendTo( ul );
    };
});

var buildDetial = function(obj) {
    var html = [];
    html.push("<div class='dialog hide'>");
    obj.activities.forEach(function(e){  
        html.push("<li>"+e.description+"</li>");
    });
    html.push("<hr>");
    html.push("<p><span>地址：</span><span>"+obj.address+"</span></p>");
    html.push("<p><span>距离：</span><span>"+obj.distance+"</span></p>");
    html.push("<p><span>电话：</span><span>"+obj.phone+"</span></p>");
    html.push("<p><span>营业时间：</span><span>"+obj.opening_hours[0]+"</span></p>");
    html.push("<p><span>起送/配送费：</span><span>"+obj.float_minimum_order_amount+"/"+obj.float_delivery_fee+"</span></p>");
    html.push("</div>");

    return html.join('');
}

