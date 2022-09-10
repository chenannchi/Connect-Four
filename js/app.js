/*-------------------------------- Constants --------------------------------*/
const music = new Audio("assets/background-music.mp3")
const chimmy = '<img src="./assets/chimmy.png">'
const cooky = '<img src="./assets/cooky.png">'
const mang = '<img src="./assets/mang.png">'
const rj = '<img src="./assets/rj.png">'
const shooky = '<img src="./assets/shooky.png">'


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, themeColor
let playing = 0



/*------------------------ Cached Element References ------------------------*/
let boardEl = document.querySelector("#game-board")
let hintMsg = document.querySelector("#hint-msg")
let squareEls = document.querySelectorAll(".square")
let startBtn = document.querySelector("#start-btn")
let restartBtn = document.querySelector("#restart-btn")
let homeBtn = document.querySelector("#home-btn")
let audioBtn = document.getElementById("audio")

// console.log(boardEl)
// console.log(hintMsg)
// console.log(squareEls)
// console.log(squareEls[0])
// console.log(startBtn)
// console.log(restartBtn)
// console.log(homeBtn)

/*----------------------------- Event Listeners -----------------------------*/
document.getElementById("timer").addEventListener("click",function(){
  console.log("timer clicked")
})

audioBtn.addEventListener("click",function(evt){
  // console.log("audio clicked")
  // console.log(playing)
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
  render()
}

function render(){
  board.forEach(function(row,rowIdx){
    row.forEach(function(square,colIdx){
      // console.log(rowIdx)
      // console.log(colIdx)
      let idxOfSq = rowIdx*7+colIdx
      if(board[rowIdx][colIdx] === 1){
        console.log(squareEls[idxOfSq])
        squareEls[idxOfSq].setAttribute("class","player1")
        squareEls[idxOfSq].innerHTML = chimmy
      }else if (board[rowIdx][colIdx] === -1){
        squareEls[idxOfSq].setAttribute("class","player2")
        squareEls[idxOfSq].innerHTML = shooky
      }else{
        squareEls[idxOfSq].setAttribute("class","blank")
      }
    })
  });

  if(winner === null){
    hintMsg.textContent = `${turn === 1 ? "Player1" : "Player2"}, it's your turn!`
  }else if (winner === "T"){
    hintMsg.textContent = "It's a tie!"
  }else{
    hintMsg.textContent = `${winner === 1 ? "Player1":"Player2"} win!!!!!`
  }
}

function handleClick(evt){
  const sqIdx = parseInt(evt.target.id[evt.target.id.length-1])

  if(board[sqIdx]){
    return 
  }else if (winner!==null){
    return
  }

  board[sqIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
}

