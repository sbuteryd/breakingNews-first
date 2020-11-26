$(function () {
    var form = layui.form;
// 1. 去注册隐藏-登录表单
   $('.btn-register').on('click',function () {
       $('.register-box').show()
       $('.login-box').hide()

   })
// 2. 去登录隐藏-注册表单
    $('.btn-login').on('click',function () {
        $('.register-box').hide()
        $('.login-box').show()
    })
//3. api 注册
//3-1. 表单验证
    form.verify({
        username:function(value,item){
            if(value ===null){
                return  '用户名不为空'
            }
        },
        checkPass:function (value,item){
          if(value !== $('[name=repassword]').val()) {
              return '两次密码不一致'
          }
        },
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
    });
    //注册用户
    $('#regForm').on('submit',function (e) {
        var data = form.val("register-filter-form");
        let newData = {
            username:data.username,
            password:data.password
        }
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:newData,
            success:function (res) {
                if(res.status !==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.btn-login').click()
            }
        })
    })
    //4 登录按钮
    $('#loginForm').on('submit',function (e) {
        e.preventDefault()
        var data1 = form.val("login-filter-form");
        console.log($(this).serialize())
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href="/web_bigevent-first/index.html"
            }
        })
    })
})
