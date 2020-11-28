$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    // Modify options, control originalOptions, store jqXHR, etc
    let url = `http://ajax.frontend.itheima.net${options.url}`
    options.url = url
    if(options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ""
        }
    }
     options.complete=function (res) {
         //不伦成功失败都会调用这个函数 !
         console.log(res);
        if(res.responseJSON.status !== 0 && res.responseJSON.message ==="身份认证失败！"){
            localStorage.removeItem('token')
            location.href ='./login.html'
        }
    }

});