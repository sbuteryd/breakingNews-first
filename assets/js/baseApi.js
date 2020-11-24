$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    // Modify options, control originalOptions, store jqXHR, etc
    let url = `http://ajax.frontend.itheima.net${options.url}`
    options.url = url
});