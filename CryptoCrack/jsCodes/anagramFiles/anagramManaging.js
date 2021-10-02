function anagramManaging(sentArray, sentArrayPoints){
  var array = sentArray;
  var arraySmall = sentArray[26];
  var arrayPoints = sentArrayPoints;

  //RESOLVER PROBLEMA DO CEDILHA

  this.printArray = function(){
    console.log(array);
  }

  this.charToNum = function(character){
    var next = character.charCodeAt(0);
    if(next < 96) {
      next -= 64;
    } else {
      next -= 96;
    }
    return next - 1;
  }

  this.exists = function(word){
    if(word.length > 3){
      //console.log("1");
      // console.log("here");
      // console.log(word);
      word = word.replace(/\\r/g, "") + this.binToText("00001101");
      // console.log(word);
      var index0 = this.charToNum(word.toLowerCase().charAt(0));
      var index1 = this.charToNum(word.toLowerCase().charAt(1));
      var index2 = this.charToNum(word.toLowerCase().charAt(2));
      var index3 = this.charToNum(word.toLowerCase().charAt(3));
      //console.log(index0);
      //console.log(index1);
      //console.log(index2);
      //console.log(index3);
      tempArray = array[index0][index1][index2][index3];

      for(var i = 0; i < tempArray.length; i++){
        if(tempArray[i] === word){
          return true;
        }
      }

      return false;


    } else {
      //console.log("2");
      // console.log("here");
      // console.log(word);
      word = word.replace(/\\r/g, "") + this.binToText("00001101");
      // console.log(word);
      //console.log(arraySmall);
      //console.log(word);

      for(var i = 0; i < arraySmall.length; i++){
        if(arraySmall[i] === word) return true;
      }


      return false;
    }
  }

  this.getRealAnagrams = function(text){
    var results = [];
    var anagrams = this.getAnagrams(text);

    for(var i = 0; i < anagrams.length; i++){
      var temp1 = "" + anagrams[i];
      if(this.exists(temp1)){
        var temp2 = true;
        for(var j = 0; j < results.length; j++){
          if(results[j] == temp1){
            temp2 = false;
            break;
          }
        }
        if(temp2){
          results.push(temp1);
        }
      }
    }
    return results.sort();

  }

  this.getPoints = function(word){
    word = word.replace(/\\r/g, "")
    let points = 0;
    for(var i = 0; i < word.length; i++){
      let charPoints = word.charCodeAt(i) - 96;
      if(charPoints >= 1 && charPoints <= 26){
        points += charPoints
      } else if(charPoints != -83){
        console.log("Error - Character "+word.charAt(i)+" has invalid points ("+charPoints+")");
      }
    }
    return points;
  }

  this.getAllEqualPoints = function(word){
    word = word.replace(/\\r/g, "")// + this.binToText("00001101");
    if(word.charCodeAt(word.length-1) == 13){
      word = word.slice(0, word.length-1)
    }
    // console.log(word);
    let wordPoints = this.getPoints(word)
    console.log(word+" -> "+wordPoints+" points");
    return arrayPoints[wordPoints][word.length];
  }

  this.getAsPointsArray = function(word){
    word = word.replace(/\\r/g, "")// + this.binToText("00001101");
    if(word.charCodeAt(word.length-1) == 13){
      word = word.slice(0, word.length-1)
    }
    var pointsArray = []
    for(var i = 0; i < word.length; i++){
      let charPoints = word.charCodeAt(i) - 96;
      pointsArray.push(charPoints)
    }
    return pointsArray
  }

  this.areAnagrams = function(word1, word2){
    let pointsArray1 = this.getAsPointsArray(word1).sort(function(a,b){return a-b});
    let pointsArray2 = this.getAsPointsArray(word2).sort(function(a,b){return a-b});
    for(var i = 0; i < pointsArray1.length; i++){
      if(pointsArray1[i] != pointsArray2[i]){
        return false;
      }
    }
    return true;
  }


  this.getRealAnagramsWithPoints = function(word){
    var results = []
    word = word.replace(/\\r/g, "")// + this.binToText("00001101");
    if(word.charCodeAt(word.length-1) == 13){
      word = word.slice(0, word.length-1)
    }
    var equalSizeAndPoints = this.getAllEqualPoints(word)
    for(var i = 0; i < equalSizeAndPoints.length; i++){
      if(this.areAnagrams(word, equalSizeAndPoints[i])){
        if(!results.reduce((sum, cur) => sum || cur == equalSizeAndPoints[i], false)){
          results.push(equalSizeAndPoints[i])
          console.log("True - "+equalSizeAndPoints[i]);
        } else {
          console.log("False");
        }
      }
    }
    return results.sort()
  }




  this.getAnagrams =  function(text){
    var answers = [];
    if(text.length > 1){
      for(var i = 0; i < text.length; i++){
        var text2 = "";
        for(var j = 0; j < text.length; j++){
          if(i != j){
            text2 += text.charAt(j);
          }
        }

        var answers2 = this.getAnagrams(text2);
        var temp1 = "" + text.charAt(i);
        for(var j = 0; j < answers2.length; j++){
          var temp2 = "" + answers2[j];
          var temp3 = temp1 + temp2;
          answers.push(temp3);
        }
      }
    } else {
      answers.push(text);
    }
    return answers;
  }









  this.textToBin = function(text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
      var next = text[i].charCodeAt(0).toString(2);
      while(next.length < 8){
        next = "0" + next;
      }
      output += next + " ";
    }
    return output;
  }

  this.binToText = function(bin) {
    var output = "";
    var array = bin.split(' ');
    for (var i = 0; i < array.length; i++) {
      output += String.fromCharCode(parseInt(array[i], 2));
    }
    return output;
  }





}
