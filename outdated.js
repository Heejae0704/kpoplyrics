// To get the possibly the right lyrics from lyrics array automatically, but not always right

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
  let url = 'https://api.genius.com/search?q=' + encodeURIComponent(keyword) + "&access_token=NaZjLHpS-wF08sPfx7NWP3dvzR1AMEiuy0s0g0SuxpUVf6cQD2pg2lDcoC4orHYz";
  // const options = {
  //   headers: new Headers({
  //     "Authorization": 'Bearer AUBy1qVk1NtL9VvhnALD89u7Q2axaVwprMEgoxQ2bvRgYDvXJJeMtmSYurHR6xxf',
  //     "Access-Control-Allow-Origin" : "*"
  //   })
  // };
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    console.log(responseJson.response.hits)
    let geniusAddress = findTopResult(responseJson.response.hits)
    $.getJSON('https://whateverorigin.herokuapp.com/get?url=' + geniusAddress + '&callback=?', function(data) {    
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
  })
}

  // because of https issue, I've changed the address below from http://www.whateverorigin.org to https://www.whateverorigin.herokuapp.com