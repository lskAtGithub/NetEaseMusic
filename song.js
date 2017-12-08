$(function (){


  let id = parseInt(location.search.match(/\bid=([^&]*)/)[1])

  $.get('./songs.json').then(function (response){
    let songs = response
    let song = songs.filter(s=>s.id == id)[0]
    let {url} = song
    let audio = document.createElement('audio')
      audio.src = url
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
  })

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

  