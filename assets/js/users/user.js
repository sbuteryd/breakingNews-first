$(function () {
   var form = layui.form
    form.verify({
        nickname:function (value) {
            if(value.length>6){
                return '昵称长度必须在1-6个字符之间'
            }
        }

    });
    getUserinfor()
    $('#user-form').on('submit',function (e) {
        e.preventDefault()
         $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !==0 ){
                    return  layer.msg(res.message)
                }
                window.parent.getUserInfo()

                return  layer.msg(res.message)
            }
        })
    })
    $('.btn-rest').on('click',function(event){
        event.preventDefault();
        getUserinfor()
    })

})

function  getUserinfor(){
    var form = layui.form

     $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function (res) {
            if(res ===0){
                return  layer.msg(res.message)
            }
            layer.msg(res.message)
            console.log(res);
            form.val("user",res.data);
            // let data = res.data
            // $('[name=id]').val(data.id)
            // $('[name=username]').val(data.username)
            // $('[name=nickname]').val(data.nickname)
            // $('[name=email]').val(data.email)
        }
    })
}
