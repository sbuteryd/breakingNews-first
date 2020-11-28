$(function () {
    let form = layui.form
    var layer = layui.layer
    form.verify({
        password: function (value, item) {
            if (value !== $("[name=rePWd]").val()) {
                return '两次密码不一致'
            }
        }, pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value,item){
            if (value === $("[name=oldPwd]").val()) {
                return '新旧密码不能一致'
            }
        }

    })

    $('#password-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data:  $(this).serialize(),
            success: function (res) {
                if(res.status !==0) {
                    return layer.msg(res.message)
                }
                $('.layui-form')[0].reset()
                layer.msg(res.message)
            }
        });
       
    })
   

})