$(function(){
    let form = layui.form
    var index =null
    getCategaryList()
//    添加分类
    $('#btn-addCategary').on('click',function(){
          index = layer.open({
            type: 1, 
            content: $('#add-form').html(), //这里content是一个普通的String
            area: ['500px', '270px'] 
          });
    })
    $("body").on('submit','#layui-form',function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $('#layui-form').serialize(),
            success: function (res) {
                if(res.status !==0) {
                    return layer.msg("获取分类失败")
                }
                layer.close(index);
                 layer.msg('获取分类成功')
                getCategaryList()
            }
        });
   
    })
})


// 获取分类列表
function getCategaryList(){
    let layer =layui.layer
    $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: function (res) {
            if(res !==0) {
             layer.msg(res.message)
            }
             var listHtml = template('talbe-list',res);
            $('tbody').html(listHtml)
         }
    }); 
}