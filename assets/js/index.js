$(function () {
    getUserInfo()

    $('.btn-out').click(function (){
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href ='./login.html'
            layer.close(index);
        });

    })
})


//获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ""
        // },
        success:function (res) {
            if(res.status !==0){
                return  layer.msg(res.message)
            }
            //渲染用户头像
            handleAvatar(res.data)
            layer.msg(res.message)
        }

    })
}

//渲染用户头像
function handleAvatar(data){
    let name = data.nickname || data.username
    $('.username').text(name)
    if(data.user_pic){
        //
        $('.layui-nav-img')
            .attr('src',data.user_pic)
            .show()
        $('.text-avtar').hide()
    }else {
        $('.layui-nav-img').hide()
        $('.text-avtar').html(name[0].toUpperCase()).show()
    }
}