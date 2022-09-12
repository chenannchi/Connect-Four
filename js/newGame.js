/*-------------------------------- Constants --------------------------------*/
const music = new Audio("assets/background-music.mp3")
const chimmy = '<img src="./assets/chimmy.png">'
const cooky = '<img src="./assets/cooky.png">'
const mang = '<img src="./assets/mang.png">'
const rj = '<img src="./assets/rj.png">'
const shooky = '<img src="./assets/shooky.png">'

const rows = 6, cols = 7

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, themeColor
let playing = 0

/*------------------------ Cached Element References ------------------------*/
let boardEl = document.querySelector(".board")
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
// document.getElementById("timer").addEventListener("click", function () {
//   console.log("timer clicked")
// })

// audioBtn.addEventListener("click", function (evt) {
  // console.log("audio clicked")
  // console.log(playing)
//   if (!playing) {
//     console.log("start-playing")
//     music.volume = 0.1
//     music.play()
//     audioBtn.setAttribute("src", "/assets/audio.png")
//     playing = 1
//   } else {
//     console.log("stop playing")
//     music.pause()
//     audioBtn.setAttribute("src", "/assets/no-audio.png")
//     playing = 0
//   }
// })

// document.getElementById("paint-palette").addEventListener("click", function () {
//   console.log("paint palette clicked")
// })

boardEl.addEventListener("click", handleClick)

for(let i = 0;i < 7;i++){

}

restartBtn.addEventListener("click", init)

homeBtn.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  // console.log("Init involked")
  // save data by columns
  board = new Array(7).fill(null)
  for (let i = 0; i < 7; i++) {
    board[i] = new Array(6).fill(null)
  }

  // console.log("board",board)

  for(let i = 0;i < 42;i++){
    squareEls[i].textContent = ""
  }

  turn = 1
  winner = null
  render()
}

// console.log("squareEls",squareEls)
function render() {
  board.forEach(function (col, colIdx) {
    col.forEach(function (square, rowIdx) {
      // console.log(rowIdx)
      // console.log(colIdx)
      // let idxOfSq = rowIdx * 7 + colIdx
      // console.log(squareEls)
      
      if (square === 1) {
        // console.log(squareEls[idxOfSq])
        console.log(document.querySelector(`#sq${rowIdx}${colIdx}`))
        document.querySelector(`#sq${rowIdx}${colIdx}`).classList.add("player1")
        document.querySelector(`#sq${rowIdx}${colIdx}`).innerHTML = chimmy
      } else if (square === -1) {
        document.querySelector(`#sq${rowIdx}${colIdx}`).classList.add("player2")
        document.querySelector(`#sq${rowIdx}${colIdx}`).innerHTML = shooky
      } else {
        document.querySelector(`#sq${rowIdx}${colIdx}`).classList.add("blank")
      }
    })
  });

  if (winner === null) {
    hintMsg.textContent = `${turn === 1 ? "Player1" : "Player2"}, it's your turn!`
  } else if (winner === "T") {
    hintMsg.textContent = "It's a tie!"
  } else {
    hintMsg.textContent = `${winner === 1 ? "Player1" : "Player2"} win!!!!!`
  }
}

function handleClick(evt) {
  // console.log("clicked")
  // console.log("target:", evt.target)
  // console.log("target col:",evt.target.classList[1][evt.target.classList[1].length - 1])
  // const sqRowIdx = parseInt(evt.target.id[evt.target.id.length - 2])
  // console.log("clicked sq row:", sqRowIdx)
  // const sqColIdx = parseInt(evt.target.id[evt.target.id.length - 1])
  // console.log("clicked sq col:", sqColIdx)
  let placeCol = evt.target.classList[1][evt.target.classList[1].length - 1]
  if (!board[placeCol].includes(null)) {
    return
  } else if (winner !== null) {
    return
  }

  for(let row = 0;row < 6;row++){
    if(board[placeCol][row] === null){
      board[placeCol][row] = turn
      console.log(placeCol)
      console.log(row)
      break
    }
  }


  // board[sqRowIdx][sqColIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
}

function getWinner() {
  // horizontal
  let total
  for (let i = 0; i < rows; i++) {
    total = 0
    for (let j = 0; j < cols - 3; j++) {
      total = board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i][j + 3]
      if (Math.abs(total) === 4) {
        return board[i][j]
      }
    }
  }

  // vertical 
  for (let i = 0; i < cols; i++) {
    total = 0
    for (let j = 0; j < rows - 3; j++) {
      total = board[j][i] + board[j + 1][i] + board[j + 2][i] + board[j + 3][i]
      if (Math.abs(total) === 4) {
        return board[j][i]
      }
    }

  }

  // ascending
  for (let i = 3; i < rows; i++) {
    total = 0
    for (let j = 0; j < cols - 3; j++) {
      total = board[i][j] + board[i - 1][j + 1] + board[i - 2][j + 2] + board[i - 3][j + 3]
      if (Math.abs(total) === 4) {
        return board[i][j]
      }
    }
  }

  // descending
  for (let i = 3; i < rows; i++) {
    total = 0
    for (let j = 3; j < cols; j++) {
      total = board[i][j] + board[i - 1][j - 1] + board[i - 2][j - 2] + board[i - 3][j - 3]
      if (Math.abs(total) === 4) {
        return board[i][j]
      }
    }
  }

  let emptyR = 0
  board.forEach(function(row){
    if (!row.includes(null)) {
      emptyR+=1
      if (emptyR === rows){
        winner = "T"
      }
    } else {
      winner = null
    }
  })

  return winner
}
