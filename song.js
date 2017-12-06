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
  audio.src = 'http://m10.music.126.net/20171207070946/0df1073a276a298cd095a7ecbfdd094f/ymusic/272c/2090/abb9/5ed1d6a6b704d8e4ee95fa291c752113.mp3'
  audio.oncanplay = function (){
    audio.play()
    $('.disc-container').addClass('playing')
  }

})