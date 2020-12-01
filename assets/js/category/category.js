$(function () {
    let form = layui.form
    var index = null
    getCategaryList()
    //    添加分类
    $('#btn-addCategary').on('click', function () {
        index = layer.open({
            type: 1,
            content: $('#add-form').html(), //这里content是一个普通的String
            area: ['500px', '270px']
        });
    })
    $("body").on('submit', '#layui-form', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $('#layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取分类失败")
                }
                layer.close(index);
                layer.msg('获取分类成功')
                getCategaryList()
            }
        });

    })
    // 编辑分类
    var indecEidt = null
    $('body').on('click', '.btn-edit', function () {
        indecEidt = layer.open({
            type: 1,
            title: "修改文章分类",
            content: $('#edit-html').html(), //这里content是一个普通的String
            area: ['500px', '270px']
        });
        let id = $(this).attr('data-id')
        $.ajax({
            type: "GET",
            url: `/my/article/cates/${id}`,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改分类失败")
                }
                let data = res.data
                form.val("edit-html", res.data)
            }
        });
    })
    //  更新分类名称
    $('body').on('submit', '#edit-form', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类失败')
                }
                layer.msg("更新分类成功")
                layer.close(indecEidt);
                getCategaryList()
            }
        });
    })
    // 删除分类

    $('body').on('click','.btn-delete', function () {
        let id = $(this).attr("data-id")
       layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
          
            console.log(id);
            $.ajax({
                type: "GET",
                url: `/my/article/deletecate/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除分类成功')
                    layer.close(index);
                    getCategaryList()

                }
            });

        });
    })
})


// 获取分类列表
function getCategaryList() {
    let layer = layui.layer
    $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: function (res) {
            if (res !== 0) {
                layer.msg(res.message)
            }
            var listHtml = template('talbe-list', res);
            $('tbody').html(listHtml)
        }
    });
}