$(function (){

  /* 通过get获取歌词，拼接并生成获取的歌词 */
  $.get('/lyric.json').then(function (object){
    let {lyric} = object
    let arr = lyric.split('\n')
    let regex = /^\[(.+)\](.*)/
    arr = arr.map(function (str){
      let matches = str.match(regex)
      if(matches){
        return {time: matches[1],words: matches[2]}
      } 
    })
    /* 生成歌词 */
    var $lyric = $('.lyric .lines')
    arr.map(function (object){
      if(!object){return}
      let $p = $('<p/>')
      $p.attr('data-time',object.time).text(object.words)
      $p.appendTo($lyric)
    })
  })

  let audio = document.createElement('audio')
  audio.src = '//p0my1su86.bkt.clouddn.com/Martin%20Tungevaag%20-%20Wicked%20Wonderland%202014.mp3'
  audio.oncanplay = function (){
    audio.play()
    $('.disc-container').addClass('playing')
  }

  $('.icon-pause').on('click',function (){
    audio.pause()
    $('.disc-container').removeClass('playing')
  })
  $('.icon-play').on('click',function (){
    audio.play()
    $('.disc-container').addClass('playing')
  })
})