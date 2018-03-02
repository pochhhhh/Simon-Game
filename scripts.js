var on = false;
var clickedStart = false;
var gameStarted = false;
var strict = false;
var yourTurn = false;
var currentLevel = 0;
var buttonsFlashed = 0;
var buttonMemory = [];
var playerInput = [];
var greenSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
var redSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
var yellowSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
var blueSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
var gameButtons = {
  green: function() {
    function active() {
      $("#green").css("background-color", "lime");
    }

    function inactive() {
      $("#green").css("background-color", "#11842a");
    }

    if (yourTurn) {
      active();
      setTimeout(inactive, 220);
      greenSound.play();
      
    } else {
      setTimeout(active, 100);
      setTimeout(inactive, 700);
      greenSound.play();
    }
  },
  red: function() {
    function active() {
      $("#red").css("background-color", "red");
    }

    function inactive() {
      $("#red").css("background-color", "#840505");
    }
    if (yourTurn) {
      active();
      setTimeout(inactive, 220);
      redSound.play();
    } else {
      setTimeout(active, 100);
      setTimeout(inactive, 700);
      redSound.play();
    }
  },
  yellow: function() {
    function active() {
      $("#yellow").css("background-color", "yellow");
    }

    function inactive() {
      $("#yellow").css("background-color", "#c6b921");
    }
    if (yourTurn) {
      active();
      setTimeout(inactive, 220);
      yellowSound.play();
    } else {
      setTimeout(active, 100);
      setTimeout(inactive, 700);
      yellowSound.play();
    }
  },
  blue: function() {
    function active() {
      $("#blue").css("background-color", "blue");
    }

    function inactive() {
      $("#blue").css("background-color", "#2d4c99");
    }
    if (yourTurn) {
      active();
      setTimeout(inactive, 220);
      blueSound.play();
    } else {
      setTimeout(active, 100);
      setTimeout(inactive, 700);
      blueSound.play();
    }
  }
};

function runGame() {
  currentLevel = 1;
  blinkerStart();
  setTimeout(gameLevel, 1800);
}

function blinkerStart() {
  function firstBlink() {
    if (on) {
      $("#display-digit").html("*");
    }
  }

  function secondBlink() {
    if (on) {
      $("#display-digit").html("-");
    }
  }
  setTimeout(firstBlink, 350);
  setTimeout(secondBlink, 700);
  setTimeout(firstBlink, 1050);
}

function gameLevel() {
  if (on && currentLevel !== 21) {
    $("#display-digit").html(currentLevel);

    buttonsFlashed = 0;

    randomButton(0, 3);

    var sequence = setInterval(function() {
      function flashSequence() {
        yourTurn = false;
        switch (buttonMemory[buttonsFlashed]) {
          case 0:
            gameButtons.green();
            break;
          case 1:
            gameButtons.red();
            break;
          case 2:
            gameButtons.yellow();
            break;
          case 3:
            gameButtons.blue();
            break;
        }

        buttonsFlashed++;

        if (buttonsFlashed === buttonMemory.length) {
          clearInterval(sequence);
          setTimeout(function() {
            yourTurn = true;
          }, 1200);
        }
      }

      flashSequence();
    }, 800);
  } else {
    alert("You win! Congratulations!");
    $("#display-digit").html("✔");
    $("#display-digit").css("color", "green");

    setTimeout(function() {
      $("#display-digit").html("");
      $("#display-digit").css("color", "red");

      buttonMemory = [];
      playerInput = [];
      buttonMemorySliced = [];
      yourTurn = false;
      clickedStart = true;
      gameStarted = true;
      currentLevel = 1;
      buttonsFlashed = 0;
      correctLight = false;
      runGame();
    }, 3000);
  }
}

function randomButton(min, max) {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  switch (randomNumber) {
    case 0:
      buttonMemory.push(0);
      break;
    case 1:
      buttonMemory.push(1);
      break;
    case 2:
      buttonMemory.push(2);
      break;
    case 3:
      buttonMemory.push(3);
      break;
  }
  yourTurn = true;
}

function checkInput() {
  function repeatSequence() {
    yourTurn = false;
    buttonsFlashed = 0;
    $("#display-digit").html(currentLevel);
    var sequence = setInterval(function() {
      switch (buttonMemory[buttonsFlashed]) {
        case 0:
          gameButtons.green();
          break;
        case 1:
          gameButtons.red();
          break;
        case 2:
          gameButtons.yellow();
          break;
        case 3:
          gameButtons.blue();
          break;
      }
      buttonsFlashed++;

      if (buttonsFlashed === buttonMemory.length) {
        clearInterval(sequence);
        // setTimeout(function(){

        yourTurn = true;

        //}, 1200);
      }
    }, 1000);
  }

  buttonMemorySliced.push(buttonMemory);
  if (
    playerInput.join() === buttonMemory.slice(0, playerInput.length).join() &&
    playerInput.length !== 0
  ) {
    if (playerInput.length === buttonMemory.length) {
      setTimeout(gameLevel, 1200);
      yourTurn = false;
      currentLevel++;
      playerInput = [];
    } else {
      switch (playerInput[playerInput.length]) {
        case 0:
          buttonMemory.push(0);
          break;
        case 1:
          buttonMemory.push(1);
          break;
        case 2:
          buttonMemory.push(2);
          break;
        case 3:
          buttonMemory.push(3);
          break;
      }
    }
  } else if (
    (playerInput.join() === buttonMemory.slice(0, playerInput.length)) ===
    false
  ) {
    if (strict) {
      $("#display-digit").html("!!!");

      buttonMemory = [];
      playerInput = [];
      buttonMemorySliced = [];
      yourTurn = false;
      clickedStart = true;
      gameStarted = true;
      currentLevel = 1;
      buttonsFlashed = 0;
      setTimeout(runGame, 3000);
    } else {
      $("#display-digit").html("!!");
      playerInput = [];
      setTimeout(repeatSequence, 3000);
    }
  }
}

//Below are DOM related code

$("#switch-box").click(function() {
  if (!on) {
    $("#switch-button").addClass("on");
    on = true;
    $("#display-digit").html("--");
  } else {
    $("#switch-button").removeClass("on");
    $("#display-digit").html("");
    on = false;
    strict = false;
    gameStarted = false;
    yourTurn = false;
    currentLevel = 0;
    correctLight = false;
    buttonsFlashed = 0;
    buttonMemory = [];
    buttonMemorySliced = [];
    playerInput = [];
    $("#display-digit").css("color", "red");
    $("#start-button").css("background-color", "#7c0909");
    $("#strict-button").css("background-color", "#a3a81a");
  }
});

$("#start-button").click(function() {
  if (!on || clickedStart) {
  } else {
    $(this).css("background-color", "red");
    buttonMemory = [];
    playerInput = [];
    buttonMemorySliced = [];
    yourTurn = false;
    clickedStart = true;
    setTimeout(function() {
      clickedStart = false;
    }, 4000);
    gameStarted = true;
    currentLevel = 1;
    buttonsFlashed = 0;
    correctLight = false;
    runGame();
  }
});

$("#strict-button").click(function() {
  if (!on) {
  } else if (on && strict) {
    strict = false;
    $("#strict-button").css("background-color", "#a3a81a");
  } else {
    strict = true;
    $(this).css("background-color", "yellow");
  }
});

$("#green").click(function() {
  if (!on || !yourTurn) {
  } else {
    gameButtons.green();
    playerInput.push(0);
    checkInput();
  }
});

$("#red").click(function() {
  if (!on || !yourTurn) {
  } else {
    gameButtons.red();
    playerInput.push(1);
    checkInput();
  }
});

$("#yellow").click(function() {
  if (!on || !yourTurn) {
  } else {
    gameButtons.yellow();
    playerInput.push(2);
    checkInput();
  }
});

$("#blue").click(function() {
  if (!on || !yourTurn) {
  } else {
    gameButtons.blue();
    playerInput.push(3);
    checkInput();
  }
});
