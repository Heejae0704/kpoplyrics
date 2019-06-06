'use strict'

var oriLyrics = "";
var romLyrics = "";
var transLyrics = "";

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

function getOriginalLyrics(url){
    $.getJSON('https://whateverorigin.herokuapp.com/get?url=' + url + '&callback=?', function(data) {    
      let lyrics = $(data.contents).find("div.lyrics").text();
      let lyricsHtml = lyricsToHtml(lyrics);
      // show lyrics in div#original-lyrics-text with <br> in each line
      $('div#original-lyrics-text').html(lyricsHtml);
    })
    .then(function(){
      $('.romanized-lyrics').removeClass('hidden');
      $('.translated-lyrics').removeClass('hidden');
      oriLyrics = $('div#original-lyrics-text').html();
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

  // because of https issue, I've changed the address below from http://www.whateverorigin.org to https://www.whateverorigin.herokuapp.com

function getVideo(id){
   $('iframe.video').prop('src', "https://www.youtube.com/embed/"+id)
  }

function getYoutubeVideo(str){
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=' + str + ' official kpop music video&key=AIzaSyBnEtHmvqrLf3yj_fIxbvLL2GIaujdBh70'
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
      $('div.container').removeClass('hidden');
      getListOfSongs(searchText);
      // getYoutubeVideo(searchText);
      // getOriginalLyrics(searchText);
      $('#song').val('');
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