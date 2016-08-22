var $squares = $('.squares');

var $grid = $('#grid-ul');

var $scoreBoard = $('#score-count');

var $lineBoard = $('#lines-count');

var $levelBoard = $('#level-count');

var $nextUpOne = $('#next-up-one');

var $nextUpTwo = $('#next-up-two');

var $nextUpThree = $('#next-up-three');

var $modal = $('#modal');

var $modalHeading = $('#modal h2');

var $header = $('h1');

var paused = false;

var currentSpeed = 800;

var score = 0;

var lines = 0;

var level = 1;

//setting the rotation to 0 initally so that first rotation for each shape is chosen on load
var rotation = 0;

//randomly selected starting element
var currentLi = Math.floor(Math.random()*3)+14;

var previousLi;

var currentColumn = ('' + currentLi).split('')[('' + currentLi).split('').length -1];

var currentRow = 0;

var gameActive = true;

var isAtBottom = false;

var timeoutId;

var interval = 750;

var isFirstLoad = true;

function startTheGame(){
  clearTheBoard();
  paused = true;
  resumeTheGame();
  if (isFirstLoad){
    $('#intro-song').trigger('play');
  }
  isFirstLoad = false;
}

function resumeTheGame(){
  setUpKeyboard();
  $($modal).hide();
  paused = false;
  goDown();
  updateTheBoard();
}

function brandNewGame(){

}

///Escape key equals pause
$(document).on('keydown', pauseTheGame);

//start the game button 
$('#new-game').on('click', startTheGame);

function setUpKeyboard(){
  $(document).on('keydown', letsRotate);
  $(document).on('keydown', downMove);
  $(document).on('keydown', leftMove);
  $(document).on('keydown', rightMove);
}

function disableKeyboard(){
  $(document).off('keydown', letsRotate);
  $(document).off('keydown', downMove);
  $(document).off('keydown', leftMove);
  $(document).off('keydown', rightMove);
}

function clearTheBoard(){
  console.log('this is running');
  for (var i = 0; i < 240; i++){
    $($squares[i]).css('background', '');
    $($squares)[i].value = 0;
  }
}

function goDown() {
  if (!paused){
   if (score >= (level*500)){
     interval *= 0.8;
     level++;
   } 
   timeoutId = setTimeout( goDown, interval );
   moveRowDown();
 }
}

function gameOverCheck(){
  for (var i = 0; i < 10; i++){
    if ($($squares)[20+i].value === 1){
      gameOverAlert();
    }
  }
}

function gameOverAlert(){
  $('#game-over-sound').trigger('play');
  clearTimeout(timeoutId);
  $('body').off('keydown', letsRotate);
  $('body').off('keydown', rightMove);
  $('body').off('keydown', leftMove);
  $('body').off('keydown', downMove);
  $header.html('GAME OVER');
}

function updateTheBoard(){
  $($scoreBoard).html(score);
  $($lineBoard).html(lines);
  $($levelBoard).html(level);
  $($nextUpOne).css('background-image', 'url("' + chosenTwo.image + '")');
  $($nextUpTwo).css('background-image', 'url("' + chosenThree.image + '")');
  $($nextUpThree).css('background-image', 'url("' + chosenFour.image + '")');
}

function pauseTheGame(e){
  if (e.keyCode == 27){
    if (!paused){
      paused = true;
      $($modal).show();
      $modalHeading.html('GAME PAUSED');
      $('#modal p').html('_________________________________');
      $('#new-game').html('New Game');
      $('#new-game').off('click', startTheGame);
      $('#new-game').on('click', brandNewGame);
      disableKeyboard();
    } else {
      resumeTheGame();
    }
  }
}

function resumeTheGame(){
  paused = false;
  $($modal).hide();
  goDown();
  setUpKeyboard();
}

function moveRowDown(){
  if (currentLi + chosenOne.rotations[rotation][3] > 229){
    newRound();
  }
  var iCanGoOn = true;
  for (var i = 0; i < 4; i++){
    var x = currentLi + 10 + chosenOne.rotations[rotation][i];
    if ($($squares)[x].value  == 1){
      iCanGoOn = false;
      break;
    }
  }
  if (iCanGoOn){
    for (var i = 0; i < 4; i++){
      if ($($squares[currentLi + chosenOne.rotations[i]]).value != 1){
        $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
      }
    }
    if (currentLi + chosenOne.rotations[rotation][3] < 230){
      currentRow++;
      currentLi +=10;
      lightEmUp(chosenOne);
    }
  } else {
    newRound();
  }

}

function newRound(){
  gameOverCheck();
  score+= (4 + level);
  fillInBlocks();
  checkForRow();
  determineNewBlocks();
  updateTheBoard();
  lightEmUp(chosenOne);
}

function determineNewBlocks(){
  currentLi = Math.floor(Math.random()*3)+4;
  currentColumn = ('' + currentLi).split('')[('' + currentLi).split('').length -1];
  currentRow = 0;
  chosenOne = chosenTwo; 
  chosenTwo = chosenThree;
  chosenThree = chosenFour;
  chosenFour = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];
  rotations = 0;
}

  // OBJECTS FOR EACH OF THE SHAPES
  var iShape = {
    colour: '#F9C80E',
    rotations: [[1,11,21,31],[10,11,12,13],[1,11,21,31],[10,11,12,13]],
    leftmost: [1,10,1,10],
    rightmost: [11,13,11,13],
    spaceAtBottom: [0,2,0,2],
    shiftRight: [1,0,1,0],
    shiftLeft: [2,0,2,0],
    shiftUp: [0,2,0,2],
    image: 'images/iShape.png'
  };

  var jShape = {
    colour: '#70D6FF',
    rotations: [[1,2,11,21],[10,11,12,22],[1,11,20,21],[0,10,11,12]],
    leftmost: [1,10,20,0],
    rightmost: [2,12,1,12],
    spaceAtBottom: [1,1,1,2],
    shiftRight: [1,0,0,0],
    shiftLeft: [0,0,1,0],
    shiftUp: [0,0,0,1],
    image: 'images/jShape.png'
  };

  var oShape = {
    colour: '#FC440F',
    rotations: [[11,12,21,22],[11,12,21,22],[11,12,21,22],[11,12,21,22]],
    leftmost: [11,11,11,11],
    rightmost: [12,12,12,12],
    spaceAtBottom: [1,1,1,1],
    shiftLeft: [0,0,0,0],
    shiftRight: [0,0,0,0],
    shiftUp: [0,0,0,0],
    image: 'images/oShape.png'
  };

  var lShape = {
    colour: '#4AFF05',
    rotations: [[0,1,11,21],[2,10,11,12],[1,11,21,22],[10,11,12,20]],
    leftmost: [0,10,1,10],
    rightmost: [1,12,22,12],
    spaceAtBottom: [1,2,1,1],
    shiftLeft: [1,0,0,0],
    shiftRight: [0,0,1,0],
    shiftUp: [0,1,0,0],
    image: 'images/lShape.png'
  };

  var tShape = {
    colour: '#FF9800',
    rotations: [[1,10,11,12],[1,11,12,21],[10,11,12,21],[1,10,11,21]],
    leftmost: [10,1,10,10],
    rightmost: [12,12,12,1],
    spaceAtBottom: [2,1,1,1],
    shiftLeft: [0,0,0,1],
    shiftRight: [0,1,0,0],
    shiftUp: [1,0,0,0],
    image: 'images/tShape.png'
  };

  var zShape = {
    colour: '#DD38FF',
    rotations: [[1,10,11,20],[0,1,11,12],[1,10,11,20],[0,1,11,12]],
    leftmost: [10,0,10,0],
    rightmost: [1,12,1,12],
    spaceAtBottom: [1,2,1,2],
    shiftLeft: [1,0,1,0],
    shiftRight: [0,0,0,0],
    shiftUp: [0,1,0,1],
    image: 'images/zShape.png'
  };

  var sShape = {
    colour: '#44FFE9',
    rotations: [[0,10,11,21],[1,2,10,11],[0,10,11,21],[1,2,10,11]],
    leftmost: [0,10,0,10],
    rightmost: [11,2,11,2],
    shiftLeft: [1,0,1,0],
    shiftRight: [0,0,0,0],
    shiftUp: [0,1,0,1],
    image: 'images/sShape.png'
  };

  
  //ARRAY TO SEE WHICH OBJECT TYPE TO PICK
  var possibleShapes = [iShape, jShape, lShape, oShape, sShape, zShape, tShape,];


  // variables that choose the initial random shapes
  var chosenOne = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  var chosenTwo = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  var chosenThree = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  var chosenFour = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];



//check for pause game
$(document)

// rotation upbutton

function letsRotate(e){
  if (e.keyCode == 38){
    var iCanRotate = true;
    for (var i = 0; i < 4; i++){
      if (rotation === 3){
        var holdRotation = -1;
      } else {
        var holdRotation = rotation;
      }
      var x = currentLi + chosenOne.rotations[holdRotation + 1][i];
      if ($($squares)[x].value  == 1){
        iCanRotate = false;
        break;
      }
    }
    if (iCanRotate){
      for (var i = 0; i < 4; i++) {
        $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
      }
      if (rotation === 4){
        rotation = 0; 
      }
      if (chosenOne.shiftRight[rotation] == 1 && currentColumn == 1){
        currentLi +=1;
        currentColumn++;
      }
      if (chosenOne.shiftRight[rotation] == 1 && currentColumn == 9){
        currentLi +=1;
        currentColumn++;
      }
      if (chosenOne.shiftRight[rotation] == 2 && currentColumn == 0){
        currentLi +=1;
        currentColumn++;
      }
      if (chosenOne.shiftLeft[rotation] == 1 && currentColumn == 8){
        currentLi -=1;
        currentColumn--;
      }
      if (chosenOne.shiftLeft[rotation] == 2 && currentColumn == 8){
        currentLi -=2;
        currentColumn-=2;
      }
      if (chosenOne.shiftLeft[rotation] == 2 && currentColumn == 7){
        currentLi -=1;
        currentColumn--;
      }
      if (chosenOne.shiftUp[rotation] == 1 && currentRow == 22){
        currentLi -=10;
        currentRow--;
      }
      if (chosenOne.shiftUp[rotation] == 2 && currentRow > 21){
        currentLi -=20;
        currentRow-=2;
      }
      if (chosenOne.shiftUp[rotation] == 2 && currentRow == 21){
        currentLi -=10;
        currentRow--;
      }
      rotation++;
      if (rotation === 4){
        rotation = 0;
      }
      lightEmUp(chosenOne);
    }
  }
}


  // move down downbutton

  function downMove(e){
    if (e.keyCode == 40 && currentLi + chosenOne.rotations[rotation][3] < 230){
      var iCanGoOn = true;
      for (var i = 0; i < 4; i++){
        var x = currentLi + 10 + chosenOne.rotations[rotation][i];
        if ($($squares)[x].value  == 1){
          iCanGoOn = false;
          break;
        }
      }
      if (iCanGoOn){
        for (var i = 0; i < 4; i++){
          if ($($squares[currentLi + chosenOne.rotations[i]]).value != 1){
            $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
          }
        }
        previousLi = currentLi;
        currentLi+= 10;
        currentRow++;
        lightEmUp(chosenOne);
      }
    }
  }
  

  // move  left button

  function leftMove(e){
    if (e.keyCode == 37 && (currentLi + chosenOne.leftmost[rotation])%10 !== 0){
      var iCanGoLeft = true;
      for (var i = 0; i < 4; i++){
        var x = currentLi - 1 + chosenOne.rotations[rotation][i];
        if ($($squares)[x].value  == 1){
          iCanGoLeft = false;
          break;
        }
      }
      if (iCanGoLeft){
        for (var i = 0; i < 4; i++){
          if ($($squares[currentLi + chosenOne.rotations[i]]).value != 1){
            $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
          }
        }
        currentLi--;
        lightEmUp(chosenOne);
      }
    }
  }


  // move right button


  function rightMove(e){
    if (e.keyCode == 39 && ((currentLi + chosenOne.rightmost[rotation] + 1)%10 !==0)){
      var iCanGoRight = true;
      for (var i = 0; i < 4; i++){
        var x = currentLi + 1 + chosenOne.rotations[rotation][i];
        if ($($squares)[x].value  == 1){
          iCanGoRight = false;
          break;
        }
      }
      if (iCanGoRight){
        for (var i = 0; i < 4; i++){
          if ($($squares[currentLi + chosenOne.rotations[i]]).value != 1){
            $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
          }
        }
        previousLi = currentLi;
        currentLi++;
        lightEmUp(chosenOne);
      }
    }
  }

  //the function to rerender the grid so that it is correctly lit up
  function lightEmUp(shape){
    if (currentColumn == -1){currentColumn = 9};
    currentColumn = ('' + currentLi).split('');
    currentColumn = currentColumn[currentColumn.length-1];
    for (var i = 0; i < 4; i++){
      if ($($squares[currentLi + shape.rotations[i]]).value != 1){
        $($squares[currentLi + shape.rotations[rotation][i]]).css({
          background: "radial-gradient(" + shape.colour + ", #555)" 
        });
      }
    }
  }

  function  fillInBlocks(){
    for (var i = 0; i < 4; i++){
      $($squares)[currentLi + chosenOne.rotations[rotation][i]].value = 1;
    }
  }

  function  checkForRow(){
    for (var k = 0; k < 24; k++){
      var rowFilled = true;
      for (var l = 0; l < 10; l++){
        if ($($squares)[10*k+l].value != 1){
          rowFilled = false;
          continue;
        }
      }
      if (rowFilled){
        score += 100;
        lines++;
        $('#row-done').trigger('play');
        for (var m = 0; m < 10; m++){
          $($squares)[10*k+m].remove();
          $($grid).prepend("<li class='squares' value='0'></li>");
        }
      }
    }
    $squares = $('.squares');
  }
