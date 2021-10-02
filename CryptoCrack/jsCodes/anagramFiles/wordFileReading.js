function wordFileReading(){
  this.readFilePT = function(){
    async function readPT(){
      const rawF = await fetch("../jsCodes/anagramFiles/textFiles/words-pt-joint2.txt");
      const raw = await rawF.text();
      const rawArray = raw.split("\n");
      return rawArray;
    }
    const rawArray = readPT();
    // console.log(rawArray.length);
    return rawArray;

  }


  this.arrayConstructor = function(rawArray){

    console.log(rawArray);

    function bigConstructor() {
      this.arraySmall = [];
      this.arrayBig = [];

      for(let i = 0; i < 26; i++){
        this.arrayBig.push([]);
        for(let j = 0; j < 26; j++){
          this.arrayBig[i].push([]);
          for(let k = 0; k < 26; k++){
            this.arrayBig[i][j].push([]);
            for(let l = 0; l < 26; l++){
              this.arrayBig[i][j][k].push([]);
            }
          }
        }
      }

      console.log(rawArray[0].replace(/\\r/g, ""));
      for(let i = 0; i < rawArray.length; i++){
        var word = rawArray[i];
        word = word.replace(/\\r/g, "")
        // console.log(word);
        if(i%2960 == 0){
          console.log((i - i%2960)/2960 + "/100");
        }
        if(word.length < 5){
          this.arraySmall[this.arraySmall.length] = word;
        } else {
          let index0 = word.charCodeAt(0) - 97;
          let index1 = word.charCodeAt(1) - 97;
          let index2 = word.charCodeAt(2) - 97;
          let index3 = word.charCodeAt(3) - 97;
          // console.log(this.arrayBig[index0][index1][index2][index3]);
          // console.log(index0, index1, index2, index3);
          // console.log(word);
          // console.log(word.length);
          this.arrayBig[index0][index1][index2][index3].push(word);
        }
      }

      this.arrayBig[26] = this.arraySmall;

      // console.log(this.arrayBig);
      return this.arrayBig;
    }

    console.log("------------");
    let testArray = {};
    var test = 23
    testArray[4] = "wfdwef"
    testArray[8] = "wfdef"
    testArray[test] = "wfdedf"
    testArray[832] = "wfdwf"
    testArray[15] = "wfdw"
    console.log(testArray);
    console.log("------------");


    const arrayBig = bigConstructor();
    // console.log(arrayBig);
    // console.log(rawArray.length);

    return arrayBig;
  }



  this.arrayPointsConstructor = function(rawArray){

    console.log(rawArray);

    function getPoints(word){
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

    function pointsConstructor() {
      this.arrayPoints = {};

      for(let i = 0; i < rawArray.length; i++){
        var word = rawArray[i];
        word = word.replace(/\\r/g, "")
        if(i%2960 == 0){
          console.log((i - i%2960)/2960 + "/100");
        }
        let wordPoints = getPoints(word);
        if(word.charCodeAt(word.length-1) == 13){
          word = word.slice(0, word.length-1)
        }
        if(!this.arrayPoints[wordPoints]?.length > 0){
          this.arrayPoints[wordPoints] = []
        }
        if(!this.arrayPoints[wordPoints][word.length]?.length > 0){
          this.arrayPoints[wordPoints][word.length] = []
        }
        this.arrayPoints[wordPoints][word.length].push(word)

      }

      return this.arrayPoints;
    }


    const arrayPoints = pointsConstructor();
    console.log(arrayPoints);
    //console.log(rawArray.length);

    return arrayPoints;
  }
}
