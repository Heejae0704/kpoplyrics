'use strict'

var oriLyrics = "";
var romLyrics = "";
var transLyrics = "";

function lyricsToHtml(text){
  let textArr = text.trim().split("\n")
  let htmlStr = "";
  for (let i=0; i<textArr.length; i++){
    if (textArr[i].includes("Romanized")){break;}
    if (textArr[i].includes("English Translation")){break;}
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

function makeStrArr(str) {
  var strArr = str.split('\n')
  for (let i = 0; i < strArr.length; i++){
      strArr[i] = "q=" + strArr[i] + "&"
  }
  return strArr;  
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
  console.log(queryString)
  return queryString;
}

function getTrans(url){
  // const options = {
  //   headers: new Headers({
  //     "Access-Control-Allow-Origin" : "*"
  //   })
  // };
  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    let translatedLyricsArr = []
    for (let i = 0; i < responseJson.data.translations.length; i++){
        translatedLyricsArr.push(responseJson.data.translations[i].translatedText.replace('&#39;',"'").replace('[linebreakhere]','<br>\n'));
    }
    let translatedLyrics = translatedLyricsArr.join('<br>\n');
    $('#translated-lyrics-text').html(translatedLyrics);
    transLyrics = $('#translated-lyrics-text').html(); 
  })
  .then(function(){
    $('.romanized-lyrics').removeClass('hidden');
    $('.translated-lyrics').addClass('hidden');
    $('.original-lyrics').removeClass('hidden');
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
})
}

function getOriginalLyricsAgain(){
  $('form.original-lyrics').submit(event => {
    event.preventDefault();
    $('#original-lyrics-text').html(oriLyrics)
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
    romLyrics = lyricsToHtml(romLyricsText);
    $('#original-lyrics-text').empty()
    $('#translated-lyrics-text').empty()
    $('#romanized-lyrics-text').html(romLyrics);
    $('.romanized-lyrics').addClass('hidden');
    $('.translated-lyrics').removeClass('hidden');
    $('.original-lyrics').removeClass('hidden');
})
}

function getOriginalLyrics(url){
  console.log("function started!")
    $.getJSON('https://whateverorigin.herokuapp.com/get?url=' + encodeURIComponent(url) + '&callback=?', function(data) {    
      let lyrics = $(data.contents).find("div.lyrics").text();
      let lyricsHtml = lyricsToHtml(lyrics);
      console.log(lyricsHtml)
      // show lyrics in div#original-lyrics-text with <br> in each line
      $('#original-lyrics-text').html(lyricsHtml);
    })
    .then(function(){
      $('.romanized-lyrics').removeClass('hidden');
      $('.translated-lyrics').removeClass('hidden');
      oriLyrics = $('#original-lyrics-text').html();
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

  // because of https issue, I've changed the address below from http://www.whateverorigin.org to https://www.whateverorigin.herokuapp.com

function getVideo(id){
   $('iframe.video').prop('src', "https://www.youtube.com/embed/"+ id + "?wmode=opaque")
  }

function getYoutubeVideo(str){
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=' + str + ' official kpop music video&key=AIzaSyBnEtHmvqrLf3yj_fIxbvLL2GIaujdBh70'
  console.log(url)
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
      var youtubeVideoId = responseJson.items[0].id.videoId;
      return youtubeVideoId
    })
  .then(id => {getVideo(id)})
  .then(function(){
    $('.video-top').removeClass('hidden');
  })
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
  }

function handleSongClick(){
  $('.js-songlist-ul').on('click', '.song-link', function(e){
    e.stopPropagation();
    const keyword = $(this).text();
    const url = $(this).attr('url');
    getYoutubeVideo(keyword);
    console.log(url);
    getOriginalLyrics(url);
  })
}

function filterResult(arr){
  console.log(arr)
  let newArr = []
  for (let i = 0; i < arr.length; i++){
    if(!(arr[i].result.full_title.includes("Romanized")) && !(arr[i].result.full_title.includes("Genius")) && !(arr[i].result.full_title.includes("Japanese"))){
      newArr.push(arr[i])
    } else {continue;}
  }
  newArr.sort((a, b) =>{
    return Number(b.result.id) - Number(a.result.id)
  })
  if (newArr.length > 10) {
    newArr = newArr.slice(0,10);
  }
  console.log(newArr)
  return newArr;
}


function showListOfSongs(arr){
  console.log(arr)
  let html = ""
  $('.js-songlist-ul').html("")
  for (let i=0; i<arr.length; i++){
    html = html.concat(
  `<li class="song-item">
      <img src=${arr[i].result.song_art_image_thumbnail_url} alt="album cover" width="50" height="50" align="middle" class="album-jacket">
      <span class="song-link" url="${arr[i].result.url}">${arr[i].result.title} by ${arr[i].result.primary_artist.name}</span>
    </li>`
    )
  }
  console.log(html)
  $('.js-songlist-ul').html(html);
}

function getListOfSongs(str){
  let url = 'https://api.genius.com/search?q=' + encodeURIComponent(str) + "&access_token=NaZjLHpS-wF08sPfx7NWP3dvzR1AMEiuy0s0g0SuxpUVf6cQD2pg2lDcoC4orHYz";
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    return filterResult(responseJson.response.hits);
  })
  .then(responseArr =>{  
    showListOfSongs(responseArr);  
  })
  .then(function(){
    $('.songlist').removeClass('hidden');
  })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  })
}

function handleSearch(){
  $('.js-search').submit(function(e){
    e.preventDefault();
    const searchText = $('#main-search-box').val();
    if (searchText !== "") {
      $('#js-error-message').empty();
      oriLyrics = "";
      romLyrics = "";
      transLyrics = "";
      console.log("So far so good!")
      $('div#original-lyrics-text').empty();
      $('div#translated-lyrics-text').empty();
      $('div#romanized-lyrics-text').empty();
      $('.original-lyrics').addClass('hidden');
      console.log("So far so good!")
      getListOfSongs(searchText);
      $('#nav-search-button').val('');
    } else {
      alert("Please type-in KPOP artist name!");
    }
  });
}

function handleApiApp(){
  handleSearch();
  handleRomanizedLyrics();
  handleTranslatedLyrics();
  getOriginalLyricsAgain();
  handleSongClick();
}

$(handleApiApp)