var gamepattern = [];
var butcolor = ["red","blue","green","yellow"]
var userpattern = [];
var started = false;
var level  = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSeq();
    started = true;
  }
});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userpattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkans(userpattern.length-1);
});
// Checking ans
function checkans(currentlvl){
  if(gamepattern[currentlvl] === userpattern[currentlvl]){
    console.log("success");
    if(userpattern.length === gamepattern.length){
      setTimeout(function () {
        nextSeq();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playsound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
  }


}
//Random Seq creater
function nextSeq(){
  userpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var num = Math.floor(Math.random()*4);
  var randomchosen = butcolor[num];
  gamepattern.push(randomchosen);

  $("#" + randomchosen).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomchosen);
}

function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Button ANimation
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
// Function to restart the game
function startover(){
  level = 0;
  gamepattern = [];
  started = false;
}
