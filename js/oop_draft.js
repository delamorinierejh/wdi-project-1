var Tetris = Tetris || {};

$(Tetris.setup);

Tetris.setup = function(){
  Tetris.$squares = $('.squares');

  Tetris.$grid = $('#grid-ul');

  Tetris.$scoreBoard = $('#score-count');

  Tetris.$lineBoard = $('#lines-count');

  Tetris.$levelBoard = $('#level-count');

  Tetris.$nextUpOne = $('#next-up-one');

  Tetris.$nextUpTwo = $('#next-up-two');

  Tetris.$nextUpThree = $('#next-up-three');

  Tetris.$modal = $('#modal');

  Tetris.$modalHeading = $('#modal h2');

  Tetris.$header = $('h1');

  Tetris.paused = false;

  Tetris.score = 0;

  Tetris.highscore = localStorage.getItem("highscore");
  if(this.highscore !== null){
   if (this.score > this.highscore) {
    localStorage.setItem("highscore", this.score );
  }
  }else{
    localStorage.setItem("highscore", this.score );
  }

  Tetris.lines = 0;

  Tetris.level = 1;

  //setting the rotation to 0 initally so that first rotation for each shape is chosen on load
  Tetris.rotation = 0;

  //randomly selected starting element
  Tetris.currentLi = Math.floor(Math.random()*3)+14;

  Tetris.previousLi;

  Tetris.currentColumn = ('' + currentLi).split('')[('' + currentLi).split('').length -1];

  Tetris.currentRow = 0;

  Tetris.gameActive = true;

  Tetris.isAtBottom = false;

  Tetris.timeoutId;

  Tetris.interval;

  Tetris.isFirstLoad = true;

  Tetris.isMuted = false;

  Tetris.isHighScore = false;

  // OBJECTS FOR EACH OF THE SHAPES
  Tetris.iShape = {
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

  Tetris.jShape = {
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

  Tetris.oShape = {
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

  Tetris.lShape = {
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

  Tetris.tShape = {
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

  Tetris.zShape = {
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

  Tetris.sShape = {
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
  Tetris.possibleShapes = [iShape, jShape, lShape, oShape, sShape, zShape, tShape];


  // variables that choose the initial random shapes
  Tetris.chosenOne = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  Tetris.chosenTwo = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  Tetris.chosenThree = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  Tetris.chosenFour = possibleShapes[Math.floor(Math.random()*possibleShapes.length)];

  $('#bloc-party').trigger('play');

  //start the game button 
  $('#new-game').on('click', Tetris.startTheGame.bind(this));

  //inrement the level button
  $('#increment-level').on('click', Tetris.incrementStartingLevel.bind(this));

  //mute button
  $(document).on('keydown', Tetris.muteSounds.bind(this));

  //inserthighscore
  $('#blurb').html('High Score: ' + Tetris.highscore);

}


Tetris.startTheGame = function(){
  var holdLevel = level;
  this.clearTheBoard();
  level = holdLevel;
  this.interval = 750 * (Math.pow(0.8,(level-1)));
  this.determineNewBlocks();
  this.updateTheBoard();
  this.paused = true;
  this.resumeTheGame();
  $('#bloc-party').trigger('pause');
  if (this.isFirstLoad){
    $('#intro-song').trigger('play');
  }
  this.isFirstLoad = false;
}


Tetris.incrementStartingLevel = function(){
  $('#blip').trigger('play');
  this.level++;
  if (this.level === 6){
    this.level = 1;
  }
  $('span').html(level);
}

Tetris.brandNewGame = function(){
  $('#bloc-party').load();
  $('#bloc-party').trigger('play');
  this.isFirstLoad = true;
  this.clearTheBoard();
  $($modal).show();
  this.$modalHeading.html('BLOCK PARTY');
  this.$header.html('MIND THE BLOCKS');
  this.highscore = this.localStorage.getItem("highscore");
  $('#modal p').html('High Score: ' + this.highscore);
  $('#new-game').html('Start Game');
  $('#new-game').off('click');
  $('#new-game').on('click', this.startTheGame.bind(this));
  $('#increment-level').html('Starting level: <span>1</span>');
  $('span').html(this.level);
  $('#increment-level').show();
  $('#increment-level').off('click');
  $('#increment-level').on('click', this.incrementStartingLevel.bind(this));
}


Tetris.setUpKeyboard = function(){
  $(document).on('keydown', this.pauseTheGame.bind(this));
  $(document).on('keydown', this.letsRotate.bind(this));
  $(document).on('keydown', this.downMove.bind(this));
  $(document).on('keydown', this.leftMove.bind(this));
  $(document).on('keydown', this.rightMove.bind(this));
}

Tetris.disableKeyboard = function(){
  $(document).off('keydown');
  $(document).on('keydown', this.muteSounds.bind(this));
}

Tetris.clearTheBoard = function(){
  for (var i = 0; i < 240; i++){
    $(this.$squares[i]).css('background', '');
    $(this.$squares)[i].value = 0; 
  }
  this.score = 0;
  this.lines = 0;
  this.level = 1;
  $(this.$scoreBoard).html(this.score);
  $(this.$lineBoard).html(this.lines);
  $(this.$levelBoard).html(this.level);
}

Tetris.goDown = function() {
  if (!this.paused){
    moveRowDown();
    if (this.score >= (this.level*500)){
     this.interval *= 0.8;
     this.level++;
     this.updateTheBoard();
   } 
   this.timeoutId = setTimeout( this.goDown, this.interval );
 }
}

Tetris.gameOverCheck = function(){
  for (Tetris.i = 0; i < 10; i++){
    if ($(this.$squares)[19+i].value === 1){
      if(this.highscore !== null){
        if (this.score > this.highscore) {
         localStorage.setItem("highscore", this.score );
         $('#high-score-sound').trigger('play');
         this.isHighScore = true;
       } else {
          $('#game-over-sound').trigger('play');
       }
     }else{
       localStorage.setItem("highscore", this.score );
     }
     this.gameOverAlert();
     break;
   }
 }
}

Tetris.gameOverAlert = function(){
  this.paused = true;
  clearTimeout(this.timeoutId);
  $($modal).show();
  if (this.isHighScore){
    this.$modalHeading.html('GAME OVER');
    $('#modal p').html('New High Score: ' + this.score + "!!!");
  } else {
  this.$modalHeading.html('GAME OVER');
  $('#modal p').html('Score: ' + this.score);
}
  $('#new-game').html('New Game');
  $('#new-game').off('click');
  $('#new-game').on('click', this.brandNewGame.bind(this));
  this.disableKeyboard();
  this.$header.html('GAME OVER');
  $('#increment-level').hide();
}

Tetris.updateTheBoard = function(){
  $($scoreBoard).html(this.score);
  $($lineBoard).html(this.lines);
  $($levelBoard).html(this.level);
  $($nextUpOne).css('background-image', 'url("' + this.chosenTwo.image + '")');
  $($nextUpTwo).css('background-image', 'url("' + this.chosenThree.image + '")');
  $($nextUpThree).css('background-image', 'url("' + this.chosenFour.image + '")');
}

Tetris.pauseTheGame = function(e){
  if (e.keyCode == 27){
    $('#blip').trigger('play');
    if (!this.paused){
      this.clearTimeout(this.timeoutId);
      this.paused = true;
      $(this.$modal).show();
      this.$modalHeading.html('GAME PAUSED');
      $('#modal p').html('_________________________________');
      $('#new-game').html('New Game');
      $('#new-game').off('click');
      $('#new-game').on('click', this.brandNewGame);
      $('#increment-level').html('Resume Game');
      $('#increment-level').off('click');
      $('#increment-level').on('click', this.resumeTheGame.bind(this));
      this.disableKeyboard();
    } 
  }
}

Tetris. muteSounds = function(e){
  if (e.keyCode == 77){
    if (!this.isMuted){
      var $audio = $('audio');
      for (var i = 0; i < $audio.length; i++) {
        $($audio)[i].muted = true;
      }
      this.isMuted = true;
      $('#mute-li').html('M:Unmute');
    } else {
      var $audio = $('audio');
      for (var i = 0; i < $audio.length; i++) {
       $($audio)[i].muted = false;
     }
     this.isMuted = false;
     $('#mute-li').html('M:Mute');
   }
 }
}


Tetris.resumeTheGame = function(){
  $('#blip').trigger('play');
  this.paused = false;
  $(this.$modal).hide();
  this.goDown();
  this.setUpKeyboard();
}

Tetris.moveRowDown = function(){
  if (this.currentLi + this.chosenOne.rotations[rotation][3] > 229){
    this.newRound();
  }
var iCanGoOn = true;
  for (var i = 0; i < 4; i++){
    var x = this.currentLi + 10 + this.chosenOne.rotations[this.rotation][i];
    if ($(this.$squares)[x].value  == 1){
      iCanGoOn = false;
      break;
    }
  }
  if (iCanGoOn){
    for (var i = 0; i < 4; i++){
      if ($(this.$squares[this.currentLi + this.chosenOne.rotations[i]]).value != 1){
        $(this.$squares[this.currentLi + this.chosenOne.rotations[this.rotation][i]]).css('background', '');
      }
    }
    if (this.currentLi + this.chosenOne.rotations[this.rotation][3] < 230){
      this.currentRow++;
      this.currentLi +=10;
      this.lightEmUp(this.chosenOne);
    }
  } else {
    this.newRound();
  }

}

Tetris.newRound = function(){
  this.gameOverCheck();
  this.score+= (4 + this.level);
  this.fillInBlocks();
  this.checkForRow();
  this.determineNewBlocks();
  this.updateTheBoard();
  this.lightEmUp(this.chosenOne);
}

Tetris.determineNewBlocks = function(){
  this.currentLi = Math.floor(Math.random()*3)+4;
  this.currentColumn = ('' + this.currentLi).split('')[('' + this.currentLi).split('').length -1];
  this.currentRow = 0;
  this.chosenOne = this.chosenTwo; 
  this.chosenTwo = this.chosenThree;
  this.chosenThree = this.chosenFour;
  while (this.chosenFour === this.chosenThree){
    this.chosenFour = this.possibleShapes[Math.floor(Math.random()*this.possibleShapes.length)];
  }
  this.rotations = 0;
}


// rotation upbutton

Tetris.letsRotate = function(e){
  if (e.keyCode == 38){
    var iCanRotate = true;
    for (var i = 0; i < 4; i++){
      if (this.rotation === 3){
        var holdRotation = -1;
      } else {
        var holdRotation = this.rotation;
      }
      var x = this.currentLi + this.chosenOne.rotations[holdRotation + 1][i];
      if ($(this.$squares)[x].value  == 1){
        iCanRotate = false;
        break;
      }
    }
    if (iCanRotate){
      for (var i = 0; i < 4; i++) {
        $(this.$squares[currentLi + this.chosenOne.rotations[this.rotation][i]]).css('background', '');
      }
      if (this.rotation === 4){
        this.rotation = 0; 
      }
      if (this.chosenOne.shiftRight[rotation] == 1 && this.currentColumn == 1){
        this.currentLi +=1;
        this.currentColumn++;
      }
      if (this.chosenOne.shiftRight[rotation] == 1 && this.currentColumn == 9){
        this.currentLi +=1;
        this.currentColumn++;
      }
      if (this.chosenOne.shiftRight[rotation] == 2 && this.currentColumn == 0){
        this.currentLi +=1;
        this.currentColumn++;
      }
      if (this.chosenOne.shiftLeft[rotation] == 1 && this.currentColumn == 8){
        this.currentLi -=1;
        this.currentColumn--;
      }
      if (this.chosenOne.shiftLeft[rotation] == 2 && this.currentColumn == 8){
        this.currentLi -=2;
        this.currentColumn-=2;
      }
      if (this.chosenOne.shiftLeft[rotation] == 2 && this.currentColumn == 7){
        this.currentLi -=1;
        this.currentColumn--;
      }
      if (this.chosenOne.shiftUp[rotation] == 1 && this.currentRow == 22){
        this.currentLi -=10;
        this.currentRow--;
      }
      if (this.chosenOne.shiftUp[rotation] == 2 && this.currentRow > 21){
        this.currentLi -=20;
        this.currentRow-=2;
      }
      if (this.chosenOne.shiftUp[rotation] == 2 && this.currentRow == 21){
        this.currentLi -=10;
        this.currentRow--;
      }
      this.rotation++;
      if (this.rotation === 4){
        this.rotation = 0;
      }
      this.lightEmUp(this.chosenOne);
    }
  }
}


  // move down downbutton

  Tetris.downMove = function(e){
    if (e.keyCode == 40 && this.currentLi + this.chosenOne.rotations[this.rotation][3] < 230){
      var iCanGoOn = true;
      for (var i = 0; i < 4; i++){
        var x = this.currentLi + 10 + this.chosenOne.rotations[this.rotation][i];
        if ($(this.$squares)[x].value  == 1){
          this.iCanGoOn = false;
          break;
        }
      }
      if (iCanGoOn){
        for (var i = 0; i < 4; i++){
          if ($(this.$squares[this.currentLi + this.chosenOne.rotations[i]]).value != 1){
            $(this.$squares[this.currentLi + this.chosenOne.rotations[this.rotation][i]]).css('background', '');
          }
        }
        this.previousLi = currentLi;
        this.currentLi+= 10;
        this.currentRow++;
        this.lightEmUp(this.chosenOne);
      }
    }
  }
  

  // move  left button

  Tetris.leftMove = function(e){
    if (e.keyCode == 37 && (this.currentLi + this.chosenOne.leftmost[this.rotation])%10 !== 0){
      var iCanGoLeft = true;
      for (var i = 0; i < 4; i++){
        var x = currentLi - 1 + this.chosenOne.rotations[this.rotation][i];
        if ($(this.$squares)[x].value  == 1){
          iCanGoLeft = false;
          break;
        }
      }
      if (iCanGoLeft){
        for (var i = 0; i < 4; i++){
          if ($(this.$squares[currentLi + this.chosenOne.rotations[i]]).value != 1){
            $(this.$squares[currentLi + this.chosenOne.rotations[this.rotation][i]]).css('background', '');
          }
        }
        this.currentLi--;
        this.lightEmUp(this.chosenOne);
      }
    }
  }


  // move right button


  Tetris.rightMove = function(e){
    if (e.keyCode == 39 && ((this.currentLi + this.chosenOne.rightmost[this.rotation] + 1)%10 !==0)){
      var iCanGoRight = true;
      for (var i = 0; i < 4; i++){
        var x = this.currentLi + 1 + this.chosenOne.rotations[this.rotation][i];
        if ($(this.$squares)[x].value  == 1){
          iCanGoRight = false;
          break;
        }
      }
      if (iCanGoRight){
        for (var i = 0; i < 4; i++){
          if ($(this.$squares[currentLi + this.chosenOne.rotations[i]]).value != 1){
            $(this.$squares[currentLi + this.chosenOne.rotations[this.rotation][i]]).css('background', '');
          }
        }
        this.previousLi = this.currentLi;
        this.currentLi++;
        this.lightEmUp(this.chosenOne);
      }
    }
  }

  //the Tetris.to rerender the grid so that it is correctly lit up
  Tetris.lightEmUp = function(shape){
    if (this.currentColumn == -1){this.currentColumn = 9};
    this.currentColumn = ('' + this.currentLi).split('');
    this.currentColumn = this.currentColumn[currentColumn.length-1];
    for (var i = 0; i < 4; i++){
      if ($(this.$squares[currentLi + shape.rotations[i]]).value != 1){
        $(this.$squares[currentLi + shape.rotations[this.rotation][i]]).css({
          background: "radial-gradient(" + shape.colour + ", #555)" 
        });
      }
    }
  }

  Tetris.fillInBlocks = function(){
    for (var i = 0; i < 4; i++){
      $(this.$squares)[this.currentLi + this.chosenOne.rotations[this.rotation][i]].value = 1;
    }
  }

  Tetris.checkForRow = function(){
    for (var k = 0; k < 24; k++){
      var rowFilled = true;
      for (var l = 0; l < 10; l++){
        if ($(this.$squares)[10*k+l].value != 1){
          this.rowFilled = false;
          continue;
        }
      }
      if (rowFilled){
        this.score += 100;
        this.lines++;
        $('#row-done').trigger('play');
        for (var m = 0; m < 10; m++){
          $(this.$squares[10*k+m]).remove();
          $(this.$grid).prepend("<li class='squares' value='0'></li>");
        }
      }
    }
    this.$squares = $('.squares');
  }
