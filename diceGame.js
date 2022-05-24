//dislay a random dice roll between 1 and 13
//player then makes a guess whether next roll will be higher or lower
//if the answer is correct, the number is removed from the deck. Keep this in mind if using probability tactics.
  //this continues until wrong or all 13 are done. Deck will reset at the end of each player's turn.
  //correct answer dings points up by one
//Player 2's turn begins
//if seven is displayed, the player will choose to continue or to end turn
  //correctly guessing 7 will add 7 points
  //incorrectly guessing 7 will subtract 7 points

class diceGame {
  constructor(p1, p2, s1, s2) {
  this.players = [p1, p2];
  this.scores = [s1, s2];
  }

  getScore() {
    return this.scores[0]+"-"+this.scores[1];
  }

  scoreUpdate() {
    var report = "<p>The score is: "+this.getScore()+"<br><br>";
    report += "The players are "+this.players[0]+" vs "+this.players[1]+"<br>";
    return report;
  }
}

var win;
var game;
var gameInfo;
var diceOptions = [];
//turn is a boolean- true references player 1 and false references player 2
var turn;
var p1;
var p2;
var diceNum;

//Variables that contain the Buttons
var start = document.getElementById("start");
var higher = document.getElementById("higher");
var lower = document.getElementById("lower");

//Events Listeners - Controls the Buttons
start.addEventListener('click', setUp);
higher.addEventListener('click', guessHigher);
lower.addEventListener('click', guessLower);


function getPlayerName(){
  //sets variables equal to the value in the input box
  p1 = document.getElementById("p1").value;
  p2 = document.getElementById("p2").value;
  //returns the name of the current player
  //if player 1
  if(turn){
    return p1;
  //else player 2
  } else {
    return p2;
  }
}

function setUp(){
  setDice();
  var printDirections = document.getElementById("directions");
  printDirections.innerHTML = "Please choose whether the next random die roll will be higher or lower.<br>";
  p1 = document.getElementById("p1").value;
  p2 = document.getElementById("p2").value;
  //creates new instance of a game object
  game = new diceGame(p1, p2, 0, 0);
  gameInfo = document.getElementById("scores");
  gameInfo.innerHTML = game.scoreUpdate();
  newRoll();
  //resets current player to player 1
  turn = true;
  printTurn();
}

function clearDirections(){
  var clear = document.getElementById("directions");
  clear.innerHTML= "";
}

function printTurn(){
  var print = document.getElementById("printTurn");
  print.innerHTML = "It's " + getPlayerName() + "'s turn.";

}

function guessHigher(){
  clearDirections();
  var answer = document.getElementById("info");
  var firstRoll = diceNum;
  newRoll();
  var secondRoll = diceNum;
  if(firstRoll == secondRoll){
    newRoll();
  }
  if(secondRoll == firstRoll){
    newRoll();
  }
  //checks if player correctly guessed higher
  if(firstRoll <=
     secondRoll){
    answer.innerHTML = "<br>Correct!";
    points(firstRoll);
  } else {
    //special case for guessing higher on Scary 7 incorrectly
    if(firstRoll == 7){
      answer.innerHTML = "<br>Wrong!";
      down();
      endTurn();
    } else {
    // restart
    answer.innerHTML = "<br>Wrong!";
    endTurn();
    }
  }
}

function guessLower(){
  clearDirections();
  var answer = document.getElementById("info");
  var firstRoll = diceNum;
  newRoll();
  var secondRoll = diceNum;
  if(firstRoll == secondRoll){
    newRoll();
  }
  if(secondRoll == firstRoll){
    newRoll();
  }
  //checks if player correctly guessed lower
  if(firstRoll >= secondRoll){
    //add a point
    //call plusPoints
    answer.innerHTML = "<br>Correct!";
    points(firstRoll);
  } else {
    //special case for guessing lower on Scary 7 incorrectly
    if(firstRoll == 7){
      answer.innerHTML = "<br>Wrong!";
      down();
      endTurn();
    } else {
    // restart
    answer.innerHTML = "<br>Wrong!";
    endTurn();
    }
  }
}

function up(i, x){
  win = document.getElementById("winningPoints").value;
  //increments the score of player[i] by x
  //x is either 1 for a regular case or 7 for a scary case
  game.scores[i] = game.scores[i] + x;
  gameInfo.innerHTML = game.scoreUpdate();
  //determines if new score will win the game
  if(game.scores[i] >= win){
    winGame();
  }
}

//only called for a Scary 7 case
function down(i){
  //if player 1
  if(turn){
    game.scores[0] = game.scores[0] - 7;
    gameInfo.innerHTML = game.scoreUpdate();
  //else player 2
  }else {
    game.scores[1] = game.scores[1] - 7;
    gameInfo.innerHTML = game.scoreUpdate();
  }
}

function points (x){
  //if player 1
  if (turn){
    //if Scary 7 case, add 7
    if (x == 7){
      up(0,7);
    //else, add 1
    } else {
    up(0,1);
    }
  //else player 2
  } else {
    //if Scary 7 case, add 7
    if (x == 7){
      up(1,7);
    //else, add 1
    } else {
    up(1,1);
    }
  }
}

//Buttons Option for Scary 7
function riskTaker(){
  var printInfo = document.getElementById("info");
  var addButtons = document.getElementById("buttons");
  addButtons.innerHTML = "";
  printInfo.innerHTML = "Please choose if the next answer will be higher or lower than 7";
}

//Buttons Option for Scary 7
function quitter(){
  var clear = document.getElementById("buttons");
  clear.innerHTML = "";
  endTurn();
  newRoll();
}

function endTurn(){
  setDice();
  //if Player 1, change to Player 2
  if (turn){
    turn = false;
  //else Player 2, change to Player 1
  } else {
    turn = true;
  }
  printTurn();
}

function winGame(){
  var winner = document.getElementById("printTurn");
  winner.innerHTML = "<br>Congratulations, " + getPlayerName() + "! You won!<br>";
  winner.innerHTML += "<br>Press reset to play again";
  winner.innerHTML += "<br><button id = 'resetGame'>Reset </button>";
  winner.innerHTML += "<br><button id = 'prize'> ;) </button>";
  var resetGame = document.getElementById("resetGame");
  resetGame.addEventListener('click', reset);
  var getPrize = document.getElementById("prize");
  getPrize.addEventListener('click', prize);
}

function prize(){
  var viewPrize = document.getElementById("prizeDiv");
  viewPrize.innerHTML = "<iframe width='560' height='315' src='https://www.youtube.com/embed/O91DT1pR1ew'></iframe>";

}

function reset(){
  //Clears game screen
  var emptyInfo = document.getElementById("info");
  var emptyScores = document.getElementById("scores");
  var emptyPrintTurn = document.getElementById("printTurn");
  var emptyPrize = document.getElementById("prizeDiv");
  var emptyButtons = document.getElementById("buttons");

  document.getElementById("p1").value = "";
  document.getElementById("p2").value = "";
  document.getElementById("winningPoints").value = "";

  emptyInfo.innerHTML = "";
  emptyScores.innerHTML= "";
  emptyPrintTurn.innerHTML = "";
  emptyPrize.innerHTML = "";
  emptyButtons.innerHTML= "";

  dicePic.clearRect(0, 0, c.width, c.height);

}

// The rest of the code creates and rolls the dice
var c = document.getElementById("dice");
c.style.backgroundColor = "white";
var dicePic = c.getContext("2d");

function remove(x){
  var length = diceOptions.length;
  //traverse the array
  for (i = 0; i < length; i++){
      //compare the value
      if(diceOptions[i] == x){
        //remove 1 element at position i;
        diceOptions.splice(i,1);
      }
    }
  }

function makeDicePic(x){
  dicePic.clearRect(0, 0, c.width, c.height);
  dicePic.fillStyle = "black";
  dicePic.stroke();
  dicePic.font = "50pt Arial";
  dicePic.textAlign = "center";
  dicePic.fillText(x, 60, 83);
}

function setDice(){
  diceOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13];
}

function newRoll(){
  diceNum = 0;
  var addButtons = document.getElementById("buttons");
  addButtons.innerHTML = "";
  //gets random number between 1 and 13
  var randDice = diceOptions[Math.floor(Math.random() * diceOptions.length)];
  //each case prints the graphic image of the number on a die based on the randomly selected number
  switch(randDice){
  case 1:
    diceNum = 1;
    makeDicePic(diceNum);
    remove(1);
    break;

  case 2:
    diceNum = 2;
    makeDicePic(diceNum);
    remove(2);
    break;

  case 3:
    diceNum = 3;
    makeDicePic(diceNum);
    remove(3);
    break;

  case 4:
    diceNum = 4;
    makeDicePic(diceNum);
    remove(4);
    break;

  case 5:
    diceNum = 5;
    makeDicePic(diceNum);
    remove(5);
    break;

  case 6:
    diceNum = 6;
    makeDicePic(diceNum);
    remove(6);
    break;

  case 7:
    diceNum = 7;
    makeDicePic(diceNum);
    var addButtons = document.getElementById("buttons");
    addButtons.innerHTML += "<br>7 is scary. Guessing correctly will give you 7 points, but be careful, guessing wrong will take away 7 points. Choose wisely! <br>";
    addButtons.innerHTML += "<br><button id='risk'>I'm a risk-taker!</button>";
    addButtons.innerHTML += "<button id='quit'>I'm a Quitter!</button>";
    //add RISK and QUIT buttons
    var risk = document.getElementById("risk");
    risk.addEventListener('click', riskTaker);
    var quit = document.getElementById("quit");
    quit.addEventListener('click', quitter);
    remove(7);
    break;

  case 8:
    diceNum = 8;
    makeDicePic(diceNum);
    remove(8);
    break;

  case 9:
    diceNum = 9;
    makeDicePic(diceNum);
    remove(9);
    break;

  case 10:
    diceNum = 10;
    makeDicePic(diceNum);
    remove(10);
    break;

  case 11:
    diceNum = 11;
    makeDicePic(diceNum);
    remove(11);
    break;

  case 12:
    diceNum = 12;
    makeDicePic(diceNum);
    remove(12);
    break;

  case 13:
    diceNum = 13;
    makeDicePic(diceNum);
    remove(13);
    break;
  }
  }
