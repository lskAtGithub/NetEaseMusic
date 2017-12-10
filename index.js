$(function (){
  /* 渲染推荐音乐 */
  $.get('./songs.json').then(function (response){
    let items = response;
    items.forEach((i) => {
      let $li = $(`
        <li>      
        <a href="./song.html?id=${i.id}">
          <h3>${i.songname}</h3>
          <p><svg class="sq">
            <use xlink:href="#icon-sq"></use>
          </svg>${i.singer}</p>
          <svg class="play">
            <use xlink:href="#icon-play1"></use>
          </svg>
        </a>
      </li>
      `)
      $('#lastestMusic').append($li);
    });
    $('#loading').remove();
  })

  /* tab切换 */
  $('.tabs-btn').on('click','li',function (e){
    let $li = $(e.currentTarget)
    let index = $li.index()
    $li.addClass('active').siblings().removeClass('active')
    $('.tabs-content').children().eq(index)
     .addClass('active').siblings().removeClass('active')
  })

  /* 热歌榜 */
  $.get('./songs.json').then(function (response){
    let items = response;
    items.forEach((i) => {
      let $li = $(`
        <li>      
        <a href="./song.html?id=${i.id}">
          <h3>${i.songname}</h3>
          <p><svg class="sq">
            <use xlink:href="#icon-sq"></use>
          </svg>${i.singer}</p>
          <svg class="play">
            <use xlink:href="#icon-play1"></use>
          </svg>
        </a>
      </li>
      `)
      $('#hot').append($li);
    });
    $('#page2-loading').remove();
  })

  var today=new Date();
  
  var time=today.getFullYear()+"年"+today.getMonth()+"月"+today.getDate()+"日"
  $('#time').text('更新日期：' + time)

  /*搜索，函数节流*/
  let timer = undefined
  
  $('#search').on('input', function(e){
    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    if(value === ''){return}
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(function (){
      search(value).then((result)=>{
        timer = undefined
        if(result.length !== 0){
          let items = result;
          items.forEach((i) => {
            let $li = $(`
              <li>      
              <a href="./song.html?id=${i.id}">
                <h3>${i.songname}</h3>
                <p><svg class="sq">
                  <use xlink:href="#icon-sq"></use>
                </svg>${i.singer}</p>
                <svg class="play">
                  <use xlink:href="#icon-play1"></use>
                </svg>
              </a>
            </li>
            `)
            $('#output').append($li);
          });
        }
      },900)     
    })
  })


  function search(keyword){
    return new Promise((resolve, reject)=>{
      var database = [
        {
          "id": "2",
          "songname": "夜空中最亮的星",
          "singer": "逃跑计划"
        },
        {
          "id": "3",
          "songname": "喜欢你",
          "singer": "邓紫棋"
        },
        {
          "id": "4",
          "songname": "岁月神偷",
          "singer": "周笔畅"
        },
        {
          "id": "5",
          "songname": "旅行的意义",
          "singer": "陈绮贞"
        },
        {
          "id": "6",
          "songname": "鱼",
          "singer": "陈绮贞"
        },
        {
          "id": "7",
          "songname": "龙卷风",
          "singer": "邓紫棋"
        },
        {
          "id": "10",
          "songname": "南山南",
          "singer": "张磊"
        }
      ]
      let result = database.filter(function(item){
        return item.songname.indexOf(keyword)>=0
      })
      setTimeout(function (){
        resolve(result)
      }, (Math.random()*500 + 300))
    })
  }

  window.search = search
})