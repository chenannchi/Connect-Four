/*-------------------------------- Constants --------------------------------*/
const music = new Audio("assets/background-music.mp3")
const soundEffect = new Audio("assets/token-sound.mp3")
const chimmy = '<img src="./assets/chimmy.png" style="width:60px">'
const cooky = '<img src="./assets/cooky.png" style="width:60px">'
const mang = '<img src="./assets/mang.png" style="width:60px">'
const rj = '<img src="./assets/rj.png" style="width:60px">'
const shooky = '<img src="./assets/shooky.png" style="width:60px">'

const rows = 6, cols = 7


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, themeColor
let playing = 0
let player1 = chimmy, player2 = shooky
let winningCombo = []

soundEffect.volume = 0.4

/*------------------------ Cached Element References ------------------------*/
let boardEl = document.querySelector(".board")
let hintMsg = document.querySelector("#hint-msg")
let squareEls = document.querySelectorAll(".square")
let startBtn = document.querySelector("#start-btn")
let restartBtn = document.querySelector("#restart-btn")
let homeBtn = document.querySelector("#home-btn")
let audioBtn = document.getElementById("audio")


/*----------------------------- Event Listeners -----------------------------*/
document.getElementById("timer").addEventListener("click", function () {
  console.log("timer clicked")
})

audioBtn.addEventListener("click", function (evt) {
  if (!playing) {
    music.volume = 0.05
    music.play()
    audioBtn.setAttribute("src", "/assets/audio.png")
    playing = 1
  } else {
    music.pause()
    audioBtn.setAttribute("src", "/assets/no-audio.png")
    playing = 0
  }
})

boardEl.addEventListener("click", handleClick)

restartBtn.addEventListener("click", init)

homeBtn.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = new Array(7).fill(null)
  for (let i = 0; i < 7; i++) {
    board[i] = new Array(6).fill(null)
  }
  for(let i = 0;i < 42;i++){
    squareEls[i].textContent = ""
    squareEls[i].setAttribute("class","blank")
    squareEls[i].classList.add("square")
    squareEls[i].removeAttribute("style")
  }
  winningCombo = []
  turn = 1
  winner = null
  render()
}

function render() {
  board.forEach(function (col, colIdx) {
    col.forEach(function (square, rowIdx) {
      let selectSqEl = document.querySelector(`#sq${rowIdx}${colIdx}`)
      if (square === 1) {
        selectSqEl.classList.remove("blank")
        selectSqEl.classList.add("player1")
        selectSqEl.innerHTML = player1
        selectSqEl.style.animation = "bounce 0.1s"
        soundEffect.play()
      } else if (square === -1) {
        selectSqEl.classList.remove("blank")
        selectSqEl.classList.add("player2")
        selectSqEl.innerHTML = player2
        selectSqEl.style.animation = "bounce 0.1s"
        soundEffect.play()
      } else {
        selectSqEl.classList.add("blank")
      }
    })
  });

  if (winner === null) {
    hintMsg.textContent = `${turn === 1 ? "Player1" : "Player2"}, it's your turn!`
  } else if (winner === "T") {
    hintMsg.textContent = "It's a tie!"
  } else {
    hintMsg.textContent = `${winner === 1 ? "Player1" : "Player2"} win!!!!!`
    for(let i = 0;i < winningCombo.length;i++){
      winningCombo[i].style.animation = "heartBeat 2s"
    }
  }
}

function handleClick(evt) {
  let placeCol = evt.target.id[evt.target.id.length-1]
  if (board[placeCol].includes(null)!==true) {
    return
  } else if (winner !== null) {
    return
  }

  for(let row = 0;row < 6;row++){
    if(board[placeCol][row] === null){
      board[placeCol][row] = turn
      break
    }
  }
  turn *= -1
  winner = getWinner()
  render()
}

function getWinner() {
  let total
  // vertical
  for (let i = 0; i < cols; i++) {
    total = 0
    for (let j = 0; j < rows - 3; j++) {
      total = board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i][j + 3]
      if (Math.abs(total) === 4) {
        winningCombo.push(document.querySelector(`#sq${j}${i}`))      
        winningCombo.push(document.querySelector(`#sq${j+1}${i}`))
        winningCombo.push(document.querySelector(`#sq${j+2}${i}`))
        winningCombo.push(document.querySelector(`#sq${j+3}${i}`))
        console.dir(winningCombo)
        return board[i][j]
      }
    }
  }

  // horizontal 
  for (let i = 0; i < rows; i++) {
    total = 0
    for (let j = 0; j < cols - 3; j++) {
      total = board[j][i] + board[j + 1][i] + board[j + 2][i] + board[j + 3][i]
      if (Math.abs(total) === 4) {
        winningCombo.push(document.querySelector(`#sq${i}${j}`))      
        winningCombo.push(document.querySelector(`#sq${i}${j+1}`))
        winningCombo.push(document.querySelector(`#sq${i}${j+2}`))
        winningCombo.push(document.querySelector(`#sq${i}${j+3}`))
        return board[j][i]
      }
    }
  }

  // descending
  for (let i = 3; i < cols; i++) {
    total = 0
    for (let j = 0; j < rows - 3; j++) {
      total = board[i][j] + board[i - 1][j + 1] + board[i - 2][j + 2] + board[i - 3][j + 3]
      if (Math.abs(total) === 4) {
        winningCombo.push(document.querySelector(`#sq${j}${i}`))      
        winningCombo.push(document.querySelector(`#sq${j+1}${i-1}`))
        winningCombo.push(document.querySelector(`#sq${j+2}${i-2}`))
        winningCombo.push(document.querySelector(`#sq${j+3}${i-3}`))
        return board[i][j]
      }
    }
  }

  // ascending
  for (let i = 3; i < cols; i++) {
    total = 0
    for (let j = 3; j < rows; j++) {
      total = board[i][j] + board[i - 1][j - 1] + board[i - 2][j - 2] + board[i - 3][j - 3]
      if (Math.abs(total) === 4) {
        winningCombo.push(document.querySelector(`#sq${j}${i}`))      
        winningCombo.push(document.querySelector(`#sq${j-1}${i-1}`))
        winningCombo.push(document.querySelector(`#sq${j-2}${i-2}`))
        winningCombo.push(document.querySelector(`#sq${j-3}${i-3}`))
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