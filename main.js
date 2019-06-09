'use strict'

var oriLyrics = "";
var romLyrics = "";
var transLyrics = "";
var keyword = "";
var youtubeVideoId ="";
var officialMVyoutubeVideoId="";
var performanceVideoId="";
var danceVideoId="";

String.prototype.toKorChars = function() { 
  var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cho, jung, jong; 
  var str = this, cnt = str.length, chars = [], cCode; 
  for (var i = 0; i < cnt; i++) { 
     cCode = str.charCodeAt(i); 
     if (cCode == 32) { continue; } // 한글이 아닌 경우 
     if (cCode < 0xAC00 || cCode > 0xD7A3) {
          chars.push(str.charAt(i)); 
          continue; 
     } 
     cCode = str.charCodeAt(i) - 0xAC00; 
     jong = cCode % 28; // 종성 
     jung = ((cCode - jong) / 28 ) % 21; // 중성 
     cho = (((cCode - jong) / 28 ) - jung ) / 21; // 초성 

  //    chars.push(cCho[cho], cJung[jung]); 
  //    if (cJong[jong] !== '') { 
  //       chars.push(cJong[jong]); 
  // 종성의 위치 파악을 위한 공란 유지
  chars.push(cCho[cho], cJung[jung], cJong[jong]);    
  }
  return chars; 
}

function romanizeWord(arr) {

  var matchingInitial = {
      'ㄱ':'g',
      'ㄲ': 'kk',
      'ㄴ':'n',
      'ㄷ':'d',
      'ㄸ':'tt',
      'ㄹ':'r',
      'ㅁ':'m',
      'ㅂ':'b',
      'ㅃ':'pp',
      'ㅅ':'s',
      'ㅆ':'ss',
      'ㅇ':'',
      'ㅈ':'j',
      'ㅉ':'jj',
      'ㅊ':'ch',
      'ㅋ':'k',
      'ㅌ':'t',
      'ㅍ':'p',
      'ㅎ':'h'
  }

  var matchingVowel = {
      'ㅏ':'a',
      'ㅐ':'ae',
      'ㅑ':'ya',
      'ㅒ':'yae',
      'ㅓ':'eo',
      'ㅔ':'e',
      'ㅕ':'yeo',
      'ㅖ':'ye',
      'ㅗ':'o',
      'ㅘ':'wa',
      'ㅙ':'wae',
      'ㅚ':'oe',
      'ㅛ':'yo',
      'ㅜ':'oo',
      'ㅝ':'wo',
      'ㅞ':'we',
      'ㅟ':'wi',
      'ㅠ':'yu',
      'ㅡ':'eu',
      'ㅢ':'ui',
      'ㅣ':'i'
  }

  var matchingFinal = {
      'ㄱ':'k',
      'ㄲ':'k',
      'ㄴ':'n',
      'ㄷ':'t',
      'ㄸ':'',
      'ㄹ':'l',
      'ㅁ':'m',
      'ㅂ':'p',
      'ㅃ':'',
      'ㅅ':'t',
      'ㅆ':'t',
      'ㅇ':'ng',
      'ㅈ':'t',
      'ㅉ':'',
      'ㅊ':'t',
      'ㅋ':'k',
      'ㅌ':'t',
      'ㅍ':'p',
      'ㅎ':'t',
      'ㄳ':'gs',
      'ㄵ':'nj',
      'ㄶ':'nh',
      'ㄺ':'lg',
      'ㄻ':'lm',
      'ㄼ':'lb',
      'ㄽ':'ls',
      'ㄾ':'lt',
      'ㄿ':'lp',
      'ㅀ':'lh',
      'ㅄ':'bs'
  }

  let len = arr.length;
  let engArr = [];
  for (let i = 0; i < len; i++) {
      if (((i+1) % 3) === 1) {
          engArr.push(matchingInitial[arr[i]]);
      } else if (((i+1) % 3) === 2) {
          engArr.push(matchingVowel[arr[i]]);
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㄱ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('g'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('ngn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('ngn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('ngm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㄴ') {
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㄷ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('j'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㄹ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('r'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('ll'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅁ') {
          if (arr[i+1] === 'ㄹ') {engArr.push('mn'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅂ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('b'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('mn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('mn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('mm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅅ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('s'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅆ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('ss'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅈ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('j'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅊ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('ch'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅌ') {
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      } else if (((i+1) % 3) === 0 && arr[i] === 'ㅎ') {
          if (arr[i+1] === 'ㅇ') {engArr.push('h'); continue;}
          if (arr[i+1] === 'ㄴ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㄹ') {engArr.push('nn'); i++; continue;}
          if (arr[i+1] === 'ㅁ') {engArr.push('nm'); i++; continue;}
          engArr.push(matchingFinal[arr[i]]);  
      }else {
          engArr.push(matchingFinal[arr[i]]);
      }
  }
  return engArr.join("");
}

function romanizeSentence(sentence) {
  let charArr = sentence.split("");
  let resultArr = [];
  let korWordArr = [];
  for (let i = 0; i < charArr.length; i++) {
      if (charArr[i].charCodeAt(0) < 0xAC00 || charArr[i].charCodeAt(0) > 0xD7A3) {
          resultArr.push(charArr[i])
      } else {
          let korCharArr = charArr[i].toKorChars();
          korWordArr = korWordArr.concat(korCharArr);
          if (!charArr[i+1] || (charArr[i+1] && (charArr[i+1].charCodeAt(0) < 0xAC00 || charArr[i+1].charCodeAt(0) > 0xD7A3))) {
              resultArr.push(romanizeWord(korWordArr));
              korWordArr = []
          }
      }
  }
  return resultArr.join("");
}

function romanizeLyrics(lyrics){
  let sentenceArr = lyrics.split("\n");
  let resultArr = []
  for (let i = 0; i < sentenceArr.length; i++){
      resultArr.push(romanizeSentence(sentenceArr[i]));
  }
  let romanizeLyrics = resultArr.join("\n");
  return romanizeLyrics;
}

function lyricsToHtml(text){
  let textArr = text.trim().split("\n")
  let htmlStr = "";
  for (let i=0; i<textArr.length; i++){
    if (textArr[i].includes("Romaniz")){break;}
    if (textArr[i].includes("English Translat")){break;}
    if (textArr[i].includes("&")){textArr[i] = textArr[i].replace("&", "and");}
    if (textArr[i].includes("oh, oh")){textArr[i] = textArr[i].replace("oh, oh", "oh-oh");}
    let tempText = textArr[i] + "<br>\n"
    htmlStr = htmlStr.concat(tempText)
  }
  return htmlStr;
}

function htmlToText(htmlStr){
  let htmlStrArr = htmlStr.split("<br>\n")
  let text = "";
  for (let i=0; i<htmlStrArr.length; i++){
      let tempText = htmlStrArr[i] + "\n"
      text = text.concat(tempText)
  }
  return text;
}

function makeStrArr(str) {
  var strArr = str.split('\n')
  var newStrArr = [];
  for (let i = 0; i < strArr.length; i++){
      newStrArr.push("q=" + strArr[i] + "&");
  }
  return newStrArr;  
}

function searchQueryBuilder(textArr){
  let queryStringArr = []
  for(let i=0; i<textArr.length; i++){
      if (textArr[i] === 'q=&') {
          queryStringArr.push('q=[linebreakhere]&');
      } else {
          queryStringArr.push(textArr[i])            
      }
  }
  var queryString = queryStringArr.join("")
  return queryString;
}

function getTrans(url){
  $(".spinner-image").removeClass('hidden'); 
  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    let translatedLyricsArr = []
    for (let i = 0; i < responseJson.data.translations.length; i++){
        translatedLyricsArr.push(responseJson.data.translations[i].translatedText.replace('&#39;',"'").replace('[linebreakhere]','<br>\n'));
    }
    let translatedLyrics = "<h2>Translated Lyrics</h2>\n" + translatedLyricsArr.join('<br>\n');
    $(".spinner-image").addClass('hidden'); 
    $('#translated-lyrics-text').html(translatedLyrics);
    transLyrics = $('#translated-lyrics-text').html(); 
  })
}

function handleTranslatedLyrics(){
  $('form.translated-lyrics').submit(event => {
    event.preventDefault();
    $('#original-lyrics-text').empty();
    $('#romanized-lyrics-text').empty();
    if (transLyrics !== "") {
      $('#translated-lyrics-text').html(transLyrics);
    } else {
    let oriLyricsText = htmlToText(oriLyrics);
    let oriLyricsTextArr = makeStrArr(oriLyricsText);
    let queryString = searchQueryBuilder(oriLyricsTextArr);
    let url = "https://translation.googleapis.com/language/translate/v2?" + queryString + "key=AIzaSyBnEtHmvqrLf3yj_fIxbvLL2GIaujdBh70&target=en&source=ko"
    getTrans(url);
    }
    $('.romanized-lyrics').removeClass('hidden');
    $('.translated-lyrics').addClass('hidden');
    $('.original-lyrics').removeClass('hidden');
})
}

function getOriginalLyricsAgain(){
  $('form.original-lyrics').submit(event => {
    event.preventDefault();
    $('#original-lyrics-text').html('<h2 lang="en">Original Lyrics</h2>\n' + oriLyrics)
    $('#translated-lyrics-text').empty()
    $('#romanized-lyrics-text').empty();
    $('.romanized-lyrics').removeClass('hidden');
    $('.translated-lyrics').removeClass('hidden');
    $('.original-lyrics').addClass('hidden');
})
}

function handleRomanizedLyrics(){
  $('form.romanized-lyrics').submit(event => {
    event.preventDefault();
    let oriLyricsText = htmlToText(oriLyrics);
    let romLyricsText = romanizeLyrics(oriLyricsText);
    romLyrics = "<h2>Romanized Lyrics</h2>\n" + lyricsToHtml(romLyricsText);
    $('#original-lyrics-text').empty()
    $('#translated-lyrics-text').empty()
    $('#romanized-lyrics-text').html(romLyrics);
    $('.romanized-lyrics').addClass('hidden');
    $('.translated-lyrics').removeClass('hidden');
    $('.original-lyrics').removeClass('hidden');
  })
}

function getOriginalLyrics(url){ 
    $(".spinner-image").removeClass('hidden');  
    $.getJSON('https://whateverorigin.herokuapp.com/get?url=' + encodeURIComponent(url) + '&callback=?', function(data) {    
      let lyrics = $(data.contents).find("div.lyrics").text();
      let lyricsHtml = `<h2 lang="en">Original Lyrics</h2>\n
  ${lyricsToHtml(lyrics)}`
      // show lyrics in div#original-lyrics-text with <br> in each line
      $('#original-lyrics-text').html(lyricsHtml);
    })
    .then(function(){
      $(".spinner-image").addClass('hidden');  
      $('.romanized-lyrics').removeClass('hidden');
      $('.translated-lyrics').removeClass('hidden');
      oriLyrics = $('#original-lyrics-text').html().replace('<h2 lang="en">Original Lyrics</h2>\n\n','');
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getVideo(id){
   $('iframe.video').prop('src', "https://www.youtube.com/embed/"+ id + "?wmode=opaque&playsinline=1")
  }

function getYoutubeVideo(str, videoType){
  
  var apikeyArr = [
  'AIzaSyAF_FdVgbmmeAmavszHK5afIPzEx1zLHTw',
  'AIzaSyDixCoUssxiFC2DqZQqLxS750NnZwwimlU',
  'AIzaSyAmOv5Rbv70tv_8R4gtD2d-uyNRjF17z7Y',
    'AIzaSyBnEtHmvqrLf3yj_fIxbvLL2GIaujdBh70'
  ]
  var ranNum = Math.floor(Math.random()*4);
  var randomApikey = apikeyArr[ranNum];

  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=' + encodeURIComponent(str + ' ' + videoType) + '&key=' + randomApikey;

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
      youtubeVideoId = responseJson.items[0].id.videoId;
      return youtubeVideoId
    })
  .then(id => getVideo(id))
  .then(() => $('.video-top').removeClass('hidden'))
  .catch(err => $('#js-error-message').text(`Something went wrong: ${err.message}`))
}

function handleWatchPerformanceClick(){
  if (performanceVideoId !== ''){
    getVideo(performanceVideoId);
  } else {
    $('.live-performance-video-button').click(function(){
      // kpop performance m countdown special stage
      // or kpop stage mix
      getYoutubeVideo(keyword, 'kpop performance m countdown special stage');
      performanceVideoId = youtubeVideoId;
      $('.video-header').html(keyword + "<br>Stage Performance Video");
    })
  }
}

function handleDancePracticeClick(){
  if (danceVideoId !== ''){
    getVideo(danceVideoId);
  } else {
    $('.dance-practice-video-button').click(function(){
      getYoutubeVideo(keyword, 'kpop dance practice official');
      danceVideoId = youtubeVideoId;
      $('.video-header').html(keyword + "<br>Dance Practice Video");
    })
  }
}

function handleOfficialMVClick(){
  if (officialMVyoutubeVideoId !== ''){
    getVideo(officialMVyoutubeVideoId);
  } else {
    $('.official-mv-video-button').click(function(){
      getYoutubeVideo(keyword, 'official kpop music video');
      officialMVyoutubeVideoId = youtubeVideoId;
      $('.video-header').html(keyword + "<br>Official Music Video");
    })
  }
}

function handleSongImgClick(){
  $('.js-songlist-ul').on('click', '.album-jacket', function(e){
    e.stopPropagation();
    keyword = $(this).attr('keyword');
    const url = $(this).attr('url');
    getYoutubeVideo(keyword, 'official kpop music video');
    getOriginalLyrics(url);
    $('.video-header').html(keyword + "<br>Official Music Video");
    $('.toggle-buttons').removeClass('hidden');
    $('.songlist').addClass('hidden');
  })
}

function handleSongClick(){
  $('.js-songlist-ul').on('click', '.song-link', function(e){
    e.stopPropagation();
    keyword = $(this).text();
    const url = $(this).attr('url');
    getYoutubeVideo(keyword, 'official kpop music video');
    getOriginalLyrics(url);
    $('.video-header').html(keyword + "<br>Official Music Video");
    $('.toggle-buttons, .js-more-from-this-artist').removeClass('hidden');
    $('.songlist').addClass('hidden');
  })
}

function filterResult(arr){
  let newArr = []
  for (let i = 0; i < arr.length; i++){
    if(!(arr[i].result.full_title.includes("Romanized")) && !(arr[i].result.full_title.includes("Genius")) && !(arr[i].result.full_title.includes("translated")) && !(arr[i].result.full_title.includes("Translated")) && !(arr[i].result.full_title.includes("Japanese")) && !(arr[i].result.full_title.includes("English")) && !(arr[i].result.full_title.includes("Chinese")) && !(arr[i].result.primary_artist.name.includes("Dicky")) && !(arr[i].result.primary_artist.name.includes("Vinnie")) && !(arr[i].result.primary_artist.name.includes("WSTRN"))){
      newArr.push(arr[i])
    } else {continue;}
  }
  newArr.sort((a, b) =>{
    // return Number(b.result.stats.pageviews) - Number(a.result.stats.pageviews)
    return Number(b.result.id) - Number(a.result.id)
  })
  console.log(newArr.length)
  if (newArr.length > 40) {
    newArr = newArr.slice(0,40);
  }
  return newArr;
}


function showListOfSongs(arr){
  let html = ""
  $('.js-songlist-ul').html("")
  if (arr.length === 0){
    alert("Cannot find any artists or songs! Please try again with different search keywords.")
  } else {
    for (let i=0; i<arr.length; i++){
      html = html.concat(
    `<li class="song-item">
        <img src=${arr[i].result.song_art_image_thumbnail_url} alt="album cover" width="50" height="50" align="middle" class="album-jacket" url="${arr[i].result.url}" keyword="${arr[i].result.title} ${arr[i].result.primary_artist.name}">
        <span class="song-link" url="${arr[i].result.url}">${arr[i].result.title} by ${arr[i].result.primary_artist.name}</span>
      </li>`
      )
    }
    $('.js-songlist-ul').html(html);
  }
}

function getListOfSongs(str){
  let resultArr = []
  let url = 'https://api.genius.com/search?q=' + encodeURIComponent(str) + "&per_page=20&access_token=NaZjLHpS-wF08sPfx7NWP3dvzR1AMEiuy0s0g0SuxpUVf6cQD2pg2lDcoC4orHYz";
  $(".songlist-spinner-image").removeClass('hidden'); 
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    console.log(responseJson.response.hits)
    resultArr = resultArr.concat(responseJson.response.hits)
    return fetch(url + "&page=2")
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    resultArr = resultArr.concat(responseJson.response.hits)
    return fetch(url + "&page=3")
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    resultArr = resultArr.concat(responseJson.response.hits)
    console.log(resultArr) 
    return filterResult(resultArr);
  })
  .then(responseArr =>{ 
    showListOfSongs(responseArr);
  })
  .then(function(){
    $(".songlist-spinner-image").addClass('hidden'); 
    $('.songlist').removeClass('hidden');
  })
  .then(function(){
    $('#nav-search-box').val('');
    $('#main-search-box').val('');
  })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  })
}

function variableReset(){
  $('#js-error-message').empty();
  oriLyrics = "";
  romLyrics = "";
  transLyrics = "";
  keyword = "";
  youtubeVideoId="";
  officialMVyoutubeVideoId="";
  danceVideoId="";
  performanceVideoId="";
  $('section#original-lyrics-text').html('');
  $('section#translated-lyrics-text').html('');
  $('section#romanized-lyrics-text').html('');
  $('.original-lyrics').addClass('hidden');
  $('.js-more-from-this-artist').addClass('hidden');
  $('.video').attr('src','');
  $('.spinner-image').addClass('hidden');
}

function handleSearchEvent(event){
    event.preventDefault();
    event.stopPropagation();
    $('.songlist, .video-top, .toggle-buttons, .original-lyrics, .romanized-lyrics, .translated-lyrics').addClass('hidden');
    let searchText = ""
    if ($(this).attr('id') === 'nav-search'){
      searchText = $('#nav-search-box').val();
    } else if ($(this).attr('searchid')){
      searchText = $(this).attr('searchid');
    } else {
      searchText = $('#main-search-box').val();
    }
    if (searchText !== "") {
      variableReset();
      getListOfSongs(searchText);
      $('#nav-search-button').val('');
      $('.heart-icon, .main-search, .description, .title').addClass('hidden');
      $('.nav-search, .to-landing-page').removeClass('hidden');
    } else {
      alert("Please type-in KPOP artist name!");
    }
}

function handleSearch(){
  $('.js-search').submit(handleSearchEvent);
}

function handleRecommendationImgClick(){
  $('.side').click(handleSearchEvent);
}

function handleRecommendationClick(){
  $('.recommendations').on('click', '.given-artist',handleSearchEvent);
}

function handleLogoClick(){
  $('.to-landing-page').click(function(){
    $('.nav-search, .songlist, .video-top, .toggle-buttons, .original-lyrics, .romanized-lyrics, .translated-lyrics, .to-landing-page').addClass('hidden');
    $('.title, .heart-icon, .main-search, .description').removeClass('hidden');
    variableReset();
  })
}

function handleArtistClick(){
  $('.js-more-from-this-artist').click(function(){
    $('.video-top, .toggle-buttons, .original-lyrics, .romanized-lyrics, .translated-lyrics,  .js-more-from-this-artist, #original-lyrics-text, #romanized-lyrics-text, .translated-lyrics-text').addClass('hidden')
    $('.songlist').removeClass('hidden');
    oriLyrics = "";
    romLyrics = "";
    transLyrics = "";
    keyword = "";
    youtubeVideoId="";
    officialMVyoutubeVideoId="";
    danceVideoId="";
    performanceVideoId="";
    $('section#original-lyrics-text').html('');
    $('section#translated-lyrics-text').html('');
    $('section#romanized-lyrics-text').html('');
    $('.video').attr('src','');
  })
}

function handleApiApp(){
  handleSearch();
  handleRecommendationClick();
  handleRecommendationImgClick()
  handleRomanizedLyrics();
  handleTranslatedLyrics();
  getOriginalLyricsAgain();
  handleSongClick();
  handleSongImgClick()
  handleWatchPerformanceClick();
  handleDancePracticeClick();
  handleOfficialMVClick();
  handleLogoClick();
  handleArtistClick();
}

$(handleApiApp)