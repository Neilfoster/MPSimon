//variables
let order = [] ;
let playerOrder = [] ;
let flash ;
let turn ;
let good ;
let compTurn ;
let intervalID ;
let strict = false ;
let noise = true ;
let on = false ;
let win ;

const turnCounter = document.getElementById("turn");
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const strictButton = document.getElementById("strict");
const onButton = document.getElementById("on");
const startButton = document.getElementById("start");

// Strick mode setting
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

// Counter
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

//Start Button
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

// Gameplay function
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

//pads
function one (){
  if (noise) {
    let audio = document.getElementById('clip1');
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "#63a785";
}

function two (){
  if (noise) {
    let audio = document.getElementById('clip2');
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "#a76b6b";
}

function three (){
  if (noise) {
    let audio = document.getElementById('clip3');
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "#9da76b";
}

function four (){
  if (noise) {
    let audio = document.getElementById('clip4');
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "#6c6ba7";
}

 function clearColor() {
   topLeft.style.backgroundColor = "grey";
   topRight.style.backgroundColor = "grey";
   bottomRight.style.backgroundColor = "grey";
   bottomLeft.style.backgroundColor = "grey";
}
function flashColor() {
  topLeft.style.backgroundColor = "#63a785";
  topRight.style.backgroundColor = "#a76b6b";
  bottomRight.style.backgroundColor = "#9da76b";
  bottomLeft.style.backgroundColor = "#6c6ba7";
}

//Clear flash on pads
topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

// Function to check if order correct
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length ==20 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

// Strict mode
      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

// Function for winning game
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}

////Modal

// Get Modal Element 
let modal = document.getElementById("ruleModal");

// Get open modal button 
let modalBtn = document.getElementById("modalBtn");

// get close button
let closeBtn = document.getElementsByClassName("closeBtn")[0];

//Listen for  open click
modalBtn.addEventListener('click',function(){
   modal.style.display = "block"
});
//Listen for close click
closeBtn.addEventListener('click',function(){
  modal.style.display = "none"
});
//Listen for outside click
window.addEventListener('click', function(){
   if(e.target == modal){
  modal.style.display = 'none'
   }
 });


