
$(function(){

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function(date) {
    const dt  = new Date()
    let y =  dt.getFullYear()
    let m = padZero(dt.getMonth()+1)
    let d = padZero(dt.getDate())

    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())
    
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  // 定义补零函数
  function padZero(n) {
    return n>9 ?  n:`0${n}`
  }
  var initData = {
    pagenum:1,
    pagesize:2,
    cate_id:'',
    state:''
  }
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
          elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
          ,count: 50 ,
          limit:10,
          limits:[10,20,30,40],
          layout:['prev','page','next']
        });
      });

     
    
       getArtList()
       initCate()
       function getArtList(){
        $.ajax({
          type: "get",
          url: "/my/article/list",
          data: initData,
          success: function (res) {
            if(res.status !==0){
              return layer.msg(`获取分类失败${res.message}`)
            }
             let strHtml = template('art-list-temp',res)
            $('tbody').html(strHtml)
      
          }
        });
      }
      function initCate(){
        $.ajax({
          type: "get",
          url: "/my/article/cates",
          success: function (res) {
            if(res.status !== 0) {
              return layer.msg('获取分类失败')
            }
            let strHtml = template('tpl-cate',res)
            // $('[name=cate_id]').html(strHtml)
            console.log(strHtml);
          }
        });
      }
})


// 获取文章列表数据

