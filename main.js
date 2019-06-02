'use strict'

var oriLyrics = "";
var romLyrics = "";
var transLyrics = "";

function lyricsToHtml(text){
  let textArr = text.trim().split("\n")
  let htmlStr = "";
  for (let i=0; i<textArr.length; i++){
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
          continue;
      } else {
          queryStringArr.push(textArr[i])            
      }
  }
  var queryString = queryStringArr.join("")
  console.log(queryString)
  return queryString;
}

function getTrans(url){
  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    let translatedLyricsArr = []
    for (let i = 0; i < responseJson.data.translations.length; i++){
        translatedLyricsArr.push(responseJson.data.translations[i].translatedText.replace('&#39;',"'"));
    }
    let translatedLyrics = translatedLyricsArr.join('<br>\n');
    $('div#translated-lyrics-text').html(translatedLyrics);
    transLyrics = $('div#translated-lyrics-text').html(); 
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
    $('div#original-lyrics-text').empty();
    $('div#romanized-lyrics-text').empty();
    if (transLyrics !== "") {
      $('div#translated-lyrics-text').html(transLyrics);
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
    $('div#original-lyrics-text').html(oriLyrics)
    $('div#translated-lyrics-text').empty()
    $('div#romanized-lyrics-text').empty();
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
    $('div#original-lyrics-text').empty()
    $('div#translated-lyrics-text').empty()
    $('div#romanized-lyrics-text').html(romLyrics);
    $('.romanized-lyrics').addClass('hidden');
    $('.translated-lyrics').removeClass('hidden');
    $('.original-lyrics').removeClass('hidden');
})
}

function findTopResult(arr){
  let rank = 0;
  let topResultAddress = ""
  for (let i = 0; i < arr.length; i++){
    if(arr[i].result.stats.pageviews && rank < Number(arr[i].result.stats.pageviews) && !(arr[i].result.full_title.includes("Romanized")) && !(arr[i].result.full_title.includes("English Translation"))){
      rank = Number(arr[i].result.stats.pageviews);
      topResultAddress = arr[i].result.url;
    } else {continue;}
  }
  console.log(topResultAddress)
  return topResultAddress;
}

function getOriginalLyrics(keyword){
  let url = 'https://api.genius.com/search?q=' + keyword + "&access_token=NaZjLHpS-wF08sPfx7NWP3dvzR1AMEiuy0s0g0SuxpUVf6cQD2pg2lDcoC4orHYz";
  // const options = {
  //   headers: new Headers({
  //     "Authorization": 'Bearer AUBy1qVk1NtL9VvhnALD89u7Q2axaVwprMEgoxQ2bvRgYDvXJJeMtmSYurHR6xxf',
  //     "Access-Control-Allow-Origin" : "*"
  //   })
  // };
  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    console.log(responseJson.response.hits)
    let geniusAddress = findTopResult(responseJson.response.hits)
    $.getJSON('https://whateverorigin.herokuapp.com/get?url=' + encodeURIComponent(geniusAddress) + '&callback=?', function(data) {    
      let lyrics = $(data.contents).find("div.lyrics").text();
      let lyricsHtml = lyricsToHtml(lyrics);
      // show lyrics in div#original-lyrics-text with <br> in each line
      $('div#original-lyrics-text').html(lyricsHtml);
    })
    .then(function(){
      $('.romanized-lyrics').removeClass('hidden');
      $('.translated-lyrics').removeClass('hidden');
      oriLyrics = $('div#original-lyrics-text').html();
    });
  })
}

  // because of https issue, I've changed the address below from http://www.whateverorigin.org to https://www.whateverorigin.herokuapp.com

function getVideo(id){
   $('iframe.video').prop('src', "https://www.youtube.com/embed/"+id)
  }

function getYoutubeVideo(str){
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=' + str + ' official kpop music video&key=AIzaSyBnEtHmvqrLf3yj_fIxbvLL2GIaujdBh70'
  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
      var youtubeVideoId = responseJson.items[0].id.videoId;
      return youtubeVideoId
    })
  .then(id => {getVideo(id)})
  }

function handleSearch(){
  $('.first-input').submit(function(e){
    e.preventDefault();
    oriLyrics = "";
    romLyrics = "";
    transLyrics = "";
    $('div#original-lyrics-text').empty()
    $('div#translated-lyrics-text').empty()
    $('div#romanized-lyrics-text').empty();
    $('.original-lyrics').addClass('hidden');
    const searchText = $('#song').val();
    const videoId = getYoutubeVideo(searchText);
    $('div.container').removeClass('hidden');
    getOriginalLyrics(searchText);
  });
}

function handleApiApp(){
  handleSearch();
  handleRomanizedLyrics();
  handleTranslatedLyrics();
  getOriginalLyricsAgain();
}

$(handleApiApp)