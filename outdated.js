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