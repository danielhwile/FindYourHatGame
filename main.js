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
        newRandomField[i].push('░');
        totalSpaces++;
      }
    }
    var holes = Math.floor(totalSpaces * 0.45);
    for(let i =0;i<holes;){
      let attemptedHoleX = Math.floor(Math.random()*x);
      let attemptedHoleY = Math.floor(Math.random()*y);
     if( newRandomField[attemptedHoleX][attemptedHoleY] == '░'){
       newRandomField[attemptedHoleX][attemptedHoleY] = 'O';
       i++;
     };
    };
    newRandomField[Math.floor(Math.random()*x)][Math.floor(Math.random()*y)] = "^";
    newRandomField[Math.floor(Math.random()*x)][Math.floor(Math.random()*y)] = "*";
    return newRandomField;
  };
}
const myField = new Field(Field.generateField(8,4));
myField.print();
myField.askForMove();