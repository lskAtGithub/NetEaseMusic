$(function (){
  /* 推荐音乐 */
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

})