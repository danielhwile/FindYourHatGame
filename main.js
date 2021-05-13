const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(array){
    this._fieldArray = array;
    this._positionX = 0;
    this._positionY = 0;
    this.FindInitialPosition(array);
  }
  FindInitialPosition(startingArray){
      for (let i = 0; i<startingArray.length;i++){
        for(let j = 0; j<startingArray[i].length;j++){
          if (startingArray[i][j] == '*'){
            this._positionY = j;
            this._positionX = i;

        }
      }
    } 
  }
  print(){
    console.log(this._fieldArray.join('\n'));

  }
  askForMove(){
    const nextMove = prompt('Where Would You Like To Move (WASD): ');
    if (nextMove == 'A' || nextMove =='a' ){
      this._positionY = this._positionY -1;
    } else if (nextMove == "D" || nextMove == "d"){
      this._positionY = this._positionY + 1;
    } else if (nextMove == "W" || nextMove == "w"){
      this._positionX = this._positionX - 1;
    } else if (nextMove == "s" || nextMove == "S"){
      this._positionX = this._positionX + 1;
    }else{
      throw new Error("Entry Not Understood Please Use W A S or D to move");
    }
    try{
      this._fieldArray[this._positionX][this._positionY] == "test"
    }
    catch(ReferenceError) {
      throw new Error('Invalid Entry: Your player fell off the board!')
  }
    if (this._fieldArray[this._positionX][this._positionY] == '░'){
      this._fieldArray[this._positionX][this._positionY] = '*';
      this.print();
      this.askForMove();
    } else if (this._fieldArray[this._positionX][this._positionY] == 'O'){
      throw new Error("You Fell in a hole.");
    } else if (this._fieldArray[this._positionX][this._positionY] == '^'){
      console.log("YOU WIN! YOU ARE A WINNER!");
    }
  }
 static generateField(x,y){
    var newRandomField = [];
    var totalSpaces = 0;
    for(let i = 0; i<x;i++){
      newRandomField.push([])
      for(let j =0; j<y;j++){
        newRandomField[i].push('O');
        totalSpaces++;
      }
    }
    var walkingSpaces = Math.floor(totalSpaces * 0.45);
    var initialPositionGroundX = 0;
    var initialPositionGroundY = 0;
    var i = 0;
    newRandomField[initialPositionGroundX][initialPositionGroundY] = '*';
     while(i < walkingSpaces){
      if(Math.random() <= .7){
	      if(Math.round(Math.random())==0){
	        initialPositionGroundX--;
	        if (initialPositionGroundX < 0){
	          initialPositionGroundX = 1;
	        };
        } 
        else {
          initialPositionGroundX++; 
          if (initialPositionGroundX >= x){
            initialPositionGroundX = initialPositionGroundX - 2;
          };
        };
      } 
      else{
        if(Math.round(Math.random())==0){
	        initialPositionGroundY--;
	        if (initialPositionGroundY < 0){
	          initialPositionGroundY = 1;
	        };
        } 
        else {
          initialPositionGroundY++; 
          if (initialPositionGroundY >= y){
            initialPositionGroundY = initialPositionGroundY - 2;
          };
        };
      };
     if (newRandomField[initialPositionGroundX][initialPositionGroundY]=='O'){
       newRandomField[initialPositionGroundX][initialPositionGroundY] ="░";
       i++;
       if(i==walkingSpaces){
          newRandomField[initialPositionGroundX][initialPositionGroundY] ="^";
       }
     };
     };
     return newRandomField;
  };
};
const myField = new Field(Field.generateField(8,4));
myField.print();
myField.askForMove();
