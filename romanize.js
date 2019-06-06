'use strict'

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
