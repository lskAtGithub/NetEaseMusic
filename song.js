$(function (){


  let id = parseInt(location.search.match(/\bid=([^&]*)/)[1])

  $.get('./songs.json').then(function (response){
    let songs = response
    let song = songs.filter(s=>s.id == id)[0]
    let {url,songname,lyric} = song

    initText(songname,lyric)
    initPlayer.call(undefined,url)
    })
  })



  function initText(name,lyric){
    $('#singer').text(name)
    parseLyric(lyric)

  }
  function initPlayer(url){
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

    setInterval(function (){
      let seconds = audio.currentTime
      let munites = ~~(seconds / 60)
      let left = seconds - munites * 60
      let time = `${pad(munites)}:${pad(left)}`
      let $lines = $('.lines> p')
      let $whichLine
      for(let i = 0; i < $lines.length; i++){
        if($lines.eq(i).attr('data-time') <= time && $lines.eq(i+1).attr('data-time') > time){
         $whichLine = $lines.eq(i)
          break
        }
      }
      if($whichLine){
        $whichLine.addClass('active').prev().removeClass('active')
        let top = $whichLine.offset().top
        let linesTop = $('.lines').offset().top
        let delta = top - linesTop - $('.lyric').height() / 3
        $('.lines').css('transform',`translateY(-${delta}px)`)
        
      }
    },300)
  }


  function pad(num){
    return num>=10 ? num + '' : '0' + num
  }

  function parseLyric(lyric){
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
  }