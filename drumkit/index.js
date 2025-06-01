var noofbuttons = document.querySelectorAll(".drum").length;
for (var i = 0; i < noofbuttons;i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

   var currentbutton =this.innerHTML;
   buttonclick(currentbutton);
   animation(currentbutton);

  });
}
document.addEventListener("keydown",function(trigger){
  buttonclick(trigger.key);
  animation(trigger.key);
});

function buttonclick(key){
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();

      break;
    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;
    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;
    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    case "k":

      var kickbass = new Audio("sounds/kick-bass.mp3");
      kickbass.play();
      break;
    case "l":
    var crash = new Audio("sounds/crash.mp3");
    crash.play();
    break;
   default:console.log('hi');




  }
}
function animation(currentkey){
var pressedbutton=document.querySelector("."+currentkey);
pressedbutton.classList.add("pressed");
setTimeout(function(){
  pressedbutton.classList.remove("pressed");}
  ,100);
}

  // })



// function buttonclick(currentbutton) {
