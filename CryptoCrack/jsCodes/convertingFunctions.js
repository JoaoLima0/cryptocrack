function convertingFunctions() {


  /*******************BINARY*******************/

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





  /*******************NUMBER*******************/

  this.textToNum = function(text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
      var next = text[i].charCodeAt(0);
      if(next < 96) {
        next -= 64;
      } else {
        next -= 96;
      }
      output += next + " ";
    }
    return output;
  }

  this.numToText = function(str) {
    var output = "";
    var array = str.split(' ');
    for (var i = 0; i < array.length; i++) {
      output += String.fromCharCode(parseInt(array[i]) + 96);
    }
    return output;
  }





  /*******************ASCII*******************/

  this.textToAscii = function(text) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
      var next = text[i].charCodeAt(0);
      output += next + " ";
    }
    return output;
  }

  this.asciiToText = function(str) {
    var output = "";
    var array = str.split(' ');
    for (var i = 0; i < array.length; i++) {
      output += String.fromCharCode(array[i]);
    }
    return output;
  }





  /*******************CESAR*******************/

  this.encryptCesar = function(text, key) {
    if(Number.isNaN(parseInt(key))) key = "0";
    var output = "";
    for (var i = 0; i < text.length; i++) {
      var next = text[i].charCodeAt(0);
      //console.log(next);
      if((next > 96 && next < 123) || (next > 64 && next < 91)) {
        if(next < 96) {
          next -= 65;
        } else {
          next -= 97;
        }
        //console.log(next);
        next += parseInt(key, 10);
        // console.log(next);
        next %= 26;
        // console.log(next);
        next += 97;
        // console.log(next);
        next = String.fromCharCode(next);
        output += next;
      } else {
        output += String.fromCharCode(next);
      }
    }
    return output;
  }

  this.decryptCesar = function(text, key) {
    var output = "";
    for (var i = 0; i < text.length; i++) {
      var next = text[i].charCodeAt(0);
      if((next > 96 && next < 123) || (next > 64 && next < 91)) {
        if(next < 96) {
          next -= 65;
        } else {
          next -= 97;
        }
        next -= key;
        next += 260;
        next %= 26;
        next += 97;
        next = String.fromCharCode(next);
        output += next;
      } else {
        output += String.fromCharCode(next);
      }
    }
    return output;
  }





  /*******************VIGENERE*******************/

  this.encryptVigenere = function(text, key) {
    var output = "";
    var keyIndex = 0;
    for (var i = 0; i < text.length; i++) {
      output += this.encryptCesar(text[i], (key[keyIndex%key.length].charCodeAt(0) - 97) + "");
      var next = text[i].charCodeAt(0);
      if((next > 96 && next < 123) || (next > 64 && next < 91)) keyIndex++;
    }
    return output;
  }

  this.decryptVigenere = function(text, key) {
    var output = "";
    var keyIndex = 0;
    for (var i = 0; i < text.length; i++) {
      output += this.decryptCesar(text[i], (key[keyIndex%key.length].charCodeAt(0) - 97) + "");
      var next = text[i].charCodeAt(0);
      if((next > 96 && next < 123) || (next > 64 && next < 91)) keyIndex++;
    }
    return output;
  }

}
