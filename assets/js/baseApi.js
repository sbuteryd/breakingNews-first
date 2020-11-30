$.ajaxPrefilter(function( option, originalOptions, jqXHR ) {
    // Modify options, control originalOptions, store jqXHR, etc
    let url = `http://ajax.frontend.itheima.net${option.url}`
    option.url = url
    if(option.url.indexOf('/my') !== -1) {
        option.headers = {
            Authorization:localStorage.getItem('token') || ""
        }
    }
    option.complete=function (res) {
         //不伦成功失败都会调用这个函数 !
         if(res.responseJSON.status !== 0 && res.responseJSON.message === "身份认证失败！"){
            localStorage.removeItem('token')
            location.href ='./login.html'
        }

    }

 

});