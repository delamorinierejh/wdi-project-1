var $squares = $('.squares');

//setting the rotation to 0 initally so that first rotation for each shape is chosen on load
var rotation = 0;

//randomly selected starting element
var currentLi = Math.floor(Math.random()*3)+4;

var previousLi;

var currentColumn = ('' + currentLi).split('')[('' + currentLi).split('').length -1];

var currentRow = 0;

var gameActive = true;

var isAtBottom = false;

function startTheGame(){
  setInterval(moveRowDown, 800);
}

function moveRowDown(){
  if (currentLi + chosenOne.rotations[rotation][3] > 229){
    newPiece();
  }
  else if (gameActive){
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
  }

}

function newPiece(){
  for (var i = 0; i < 4; i++){
    $($squares)[currentLi + chosenOne.rotations[rotation][i]].value = 1;
  }
  currentLi = Math.floor(Math.random()*3)+4;
  currentColumn = ('' + currentLi).split('')[('' + currentLi).split('').length -1];
  currentRow = 0;
  chosenOne = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];
  rotations = 0;
  lightEmUp(chosenOne);
}

startTheGame();

  // OBJECTS FOR EACH OF THE SHAPES
  var iShape = {
    colour: 'orange',
    rotations: [[1,11,21,31],[10,11,12,13],[1,11,21,31],[10,11,12,13]],
    leftmost: [1,0,1,0],
    rightmost: [1,3,1,3],
    spaceAtBottom: [0,2,0,2],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftRight: [1,0,1,0],
    shiftLeft: [2,0,2,0],
    shiftUp: [0,2,0,2],
    bottomSpace: [1,0,1,0]
  };

  var jShape = {
    colour: 'red',
    rotations: [[1,2,11,21],[10,11,12,22],[1,11,20,21],[0,10,11,12]],
    leftmost: [1,0,0,0],
    rightmost: [2,2,1,2],
    spaceAtBottom: [1,1,1,2],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftRight: [1,0,0,0],
    shiftLeft: [0,0,1,0],
    shiftUp: [0,0,0,1],
    bottomSpace: [0,0,0,0]

  };

  var oShape = {
    colour: 'blue',
    rotations: [[11,12,21,22],[11,12,21,22],[11,12,21,22],[11,12,21,22]],
    leftmost: [1,1,1,1],
    rightmost: [2,2,2,2],
    spaceAtBottom: [1,1,1,1],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftLeft: [0,0,0,0],
    shiftRight: [0,0,0,0],
    shiftUp: [0,0,0,0],
    bottomSpace: [0,0,0,0]
  };

  var lShape = {
    colour: 'pink',
    rotations: [[0,1,11,21],[2,10,11,12],[1,11,21,22],[10,11,12,20]],
    leftmost: [0,0,1,0],
    rightmost: [1,2,2,2],
    spaceAtBottom: [1,2,1,1],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftLeft: [1,0,0,0],
    shiftRight: [0,0,1,0],
    shiftUp: [0,1,0,0],
    bottomSpace: [0,0,0,0]
  };

  var tShape = {
    colour: 'brown',
    rotations: [[1,10,11,12],[1,11,12,21],[10,11,12,21],[1,10,11,21]],
    leftmost: [0,1,0,1],
    rightmost: [2,2,2,1],
    spaceAtBottom: [2,1,1,1],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftLeft: [0,0,0,1],
    shiftRight: [0,1,0,0],
    shiftUp: [1,0,0,0],
    bottomSpace: [0,0,0,0]
  };

  var zShape = {
    colour: 'purple',
    rotations: [[1,10,11,20],[0,1,11,12],[1,10,11,20],[0,1,11,12]],
    leftmost: [0,0,0,0],
    rightmost: [1,2,1,2],
    spaceAtBottom: [1,2,1,2],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftLeft: [1,0,1,0],
    shiftRight: [0,0,0,0],
    shiftUp: [0,1,0,1],
    bottomSpace: [0,0,0,0]
  };

  var sShape = {
    colour: 'yellow',
    rotations: [[0,10,11,21],[1,2,10,11],[0,10,11,21],[1,2,10,11]],
    leftmost: [0,0,0,0],
    rightmost: [1,2,1,2],
    spaceAtBottom: [1,2,1,2],
    blocksExamined: [0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33],
    shiftLeft: [1,0,1,0],
    shiftRight: [0,0,0,0],
    shiftUp: [0,1,0,1],
    bottomSpace: [0,0,0,0]
  };

  
  //ARRAY TO SEE WHICH OBJECT TYPE TO PICK
  var possibleShapes = [iShape, jShape, lShape, oShape, sShape, zShape, tShape];


  // variable that choose the random shape
  var chosenOne = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  //variables to determine how many blank spaces are natrually to the right and left of the shape within its 4x4 grid
  var rightRemaining = chosenOne.rightmost[rotation];

  var leftRemaining = chosenOne.leftmost[rotation];

  var bottomRemaining = chosenOne.spaceAtBottom[rotation];


// rotation upbutton
$('body').on('keydown', function(e){
  if (e.keyCode == 38){
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
    currentColumn = ('' + currentLi).split('');
    currentColumn = currentColumn[currentColumn.length-1];
      // currentLi += chosenOne.shiftLeft[rotation];
      // currentLi += chosenOne.shiftRight[rotation];
      rightRemaining = chosenOne.rightmost[rotation];
      leftRemaining = chosenOne.leftmost[rotation];
      bottomRemaining = chosenOne.spaceAtBottom[rotation];
      // chooseOne();
      //var currentLi = Math.floor(Math.random()*5)+3;
      lightEmUp(chosenOne);
    }
  })


  // move down downbutton
  $('body').on('keydown', function(e){
    if (e.keyCode == 40 && currentLi + chosenOne.rotations[rotation][3] < 230){
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
  })

  // move  left button
  $('body').on('keydown', function(e){
    if (e.keyCode == 37 && (currentLi + leftRemaining)%10 !== 0){
      for (var i = 0; i < 4; i++){
        if ($($squares[currentLi + chosenOne.rotations[i]]).value != 1){
          $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
        }
      }
      currentLi--;
      lightEmUp(chosenOne);
    }
  })


  // move right button
  $('body').on('keydown', function(e){
    if (e.keyCode == 39 && ((currentLi + rightRemaining)%10 !==9)){
      for (var i = 0; i < 4; i++){
        if ($($squares[currentLi + chosenOne.rotations[i]]).value != 1){
          $($squares[currentLi + chosenOne.rotations[rotation][i]]).css('background', '');
        }
      }
      previousLi = currentLi;
      currentLi++;
    }
    lightEmUp(chosenOne);
  })



  //the function to rerender the grid so that it is correctly lit up
  function lightEmUp(shape){
    if (currentColumn == -1){currentColumn = 9};
    currentColumn = ('' + currentLi).split('');
    currentColumn = currentColumn[currentColumn.length-1];
    // for (var i = 0; i < 4; i++) {
    //   if ($($squares[previousLi + shape.rotations[i]]).value != 1){
    //     $($squares[currentLi + shape.blocksExamined[i]]).css('background', '');
    //   }
    // }
    for (var i = 0; i < 4; i++){
      if ($($squares[currentLi + shape.rotations[i]]).value != 1){
        $($squares[currentLi + shape.rotations[rotation][i]]).css('background', shape.colour);
      }
    }
  }





