// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

const ball = {
  x: 30, // su posición en el eje X
  y: 30, // su posición en el eje Y
  w: 20, // el ancho de la pelotita
  h: 20, // el alto de la pelotita
  speed: 2, // la velocidad de la pelotita (x, y)
  isMovingRight: true,
  isMovingDown: true
}

const paddle = {
  x: 200,
  y: 550,
  w: 100,
  h: 20,
  speed: 20
}

// *** Game Functions ***

function moverPelotita() {
  
  if (ball.isMovingRight === true) {
    ball.x += ball.speed
    //! SIEMPRE que nosotros modifiquemos una variable de posición, dimensión, color. TENEMOS que actualizar el DOM.
    ballNode.style.left = `${ball.x}px`
  } else {
    ball.x -= ball.speed
    ballNode.style.left = `${ball.x}px`
  }

  if (ball.isMovingDown === true) {
    ball.y += ball.speed
    ballNode.style.top = `${ball.y}px`
  } else {
    ball.y -= ball.speed
    ballNode.style.top = `${ball.y}px`
  }
  
}

function gameOver() {

  //1 el intervalo deberia detenerse
  clearInterval(gameIntervalId)

  //2 deberia indicarse al usuario que el juego se perdió
  alert("Has perdido :(")

}

function checkColissionBallWall() {

  if (ball.x > (gameBoxNode.offsetWidth - ball.w)) {
    // console.log("la pelotita ha colisionado")
    ball.isMovingRight = false
  }

  if (ball.y > (gameBoxNode.offsetHeight - ball.h)) {
    // ball.isMovingDown = false
    //* gameOver
    gameOver()
  }

  if (ball.x <= 0) {
    ball.isMovingRight = true
  }

  if (ball.y <= 0) {
    ball.isMovingDown = true
  }

}

function checkColissionBallPaddle() {
  
  // console.log("probando")
  if (
    ball.x < paddle.x + paddle.w &&
    ball.x + ball.w > paddle.x &&
    ball.y < paddle.y + paddle.h &&
    ball.y + ball.h > paddle.y
  ) {
    // Collision detected!
    // la pelotita se mueve hacia arriba
    ball.isMovingDown = false
  }

}



function gameLoop() {
  //* ejecutando bucle de juego. 60 veces por segundo

  moverPelotita()
  checkColissionBallWall() // 60 veces por segundo. Está colisionando la pelotita con la pared?
  checkColissionBallPaddle()
  // console.log(ball.y)
}

// *** Game Loop Interval ***
let gameIntervalId = setInterval(() => {
  gameLoop()
}, 1000/60) // 60fps 


// *** Event Listeners ***

document.addEventListener("keydown", (event) => {
  // console.log(event)
  // console.log("presionando cualquier tecla")
  if (event.key === "a") {
    // console.log("presionando a")
    paddle.x -= paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  } else if (event.key === "d") {
    // console.log("presionando d")
    paddle.x += paddle.speed
    paddleNode.style.left = `${paddle.x}px`
  }
})