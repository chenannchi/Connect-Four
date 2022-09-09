/*-------------------------------- Constants --------------------------------*/
const music = new Audio("assets/background-music.mp3")


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, themeColor
let playing = 0



/*------------------------ Cached Element References ------------------------*/
let boardEl = document.querySelector("#game-board")
let hintMsg = document.querySelector("#hint-msg")
let startBtn = document.querySelector("#start-btn")
let restartBtn = document.querySelector("#restart-btn")
let homeBtn = document.querySelector("#home-btn")
let audioBtn = document.getElementById("audio")

// console.log(boardEl)
// console.log(hintMsg)
// console.log(startBtn)
// console.log(restartBtn)
// console.log(homeBtn)

/*----------------------------- Event Listeners -----------------------------*/
document.getElementById("timer").addEventListener("click",function(){
  console.log("timer clicked")
})

audioBtn.addEventListener("click",function(evt){
  console.log("audio clicked")
  console.log(playing)
  if(!playing){
    console.log("start-playing")
    music.volume = 0.1
    music.play()
    audioBtn.setAttribute("src","/assets/audio.png")
    playing = 1
  }else{
    console.log("stop playing")
    music.pause()
    audioBtn.setAttribute("src","/assets/no-audio.png")
    playing = 0
  }
})

document.getElementById("paint-palette").addEventListener("click",function(){
  console.log("paint palette clicked")
})


/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  board = new Array(6).fill(null)
  for(let i = 0; i < 6;i++){
    board[i] = new Array(7).fill(null)
  }
  // console.log(board)
  turn = 1
  winner = null
  // render()
}

// function render(){

// }



