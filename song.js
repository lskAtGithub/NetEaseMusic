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
  audio.src = 'http://dl.stream.qqmusic.qq.com/C400000ZwOmZ0CTkzA.m4a?vkey=0A6CCDD3AC70B03CF052CF5F14E7C63A4C4E39E41738DFC47BFD8CAD57FD7AFC0B2F87F025BEEDA05DD268241D08AF5EDFCB1C16ADF43C81&guid=2265517288&uin=0&fromtag=66'
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