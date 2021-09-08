//userClickedPattern should reset to empty array after every level

$(document).ready();

var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

function nextSequence() {
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut();
  var randomChosenSound = new Audio('sounds/'+ randomChosenColor + '.mp3');
  randomChosenSound.play();
  $("#" + randomChosenColor).fadeIn();
  level = level + 1;
  userClickedPattern = [];


}

$(":button").click(function(e) {
  var userChosenColor = e.target.id;
  $(e.target)
    .addClass("pressed")
    .delay(100)
    .queue(function(next){
      $(this).removeClass('pressed');
      next();
  })

  var userChosenSound = new Audio('sounds/'+ userChosenColor + '.mp3');
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern + " userClickedPattern");
  console.log(gamePattern + " gamePattern");
  userChosenSound.play();


  // if length of gamePattern = length of userClickedPattern
  if (gamePattern.length == userClickedPattern.length) {
    // if it returns true, go to the next level

    if (checkAnswer() == true) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    } else {
      new Audio('sounds/wrong.mp3').play();
      $('body')
        .addClass("game-over")
        .delay(200)
        .queue(function(next){
          $(this).removeClass('game-over');
          next();
      })
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();


    }

  }

})

var keyPressCount = 0;
$(document).keypress(function(event){
  if (keyPressCount == 0) {
    nextSequence();
    keyPressCount = keyPressCount + 1;
  }

});
// [1, 2, 3] game
// [1, 4, 5] user
function checkAnswer(currentLevel) {
  for (var i = 0; i < gamePattern.length; ++i) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      console.log("you are a loser");
      return false;
    }
  }
  console.log("success");
  return true;

}


function startOver() {
  level = 0;
  gamePattern = [];
  keyPressCount = 0;
}
