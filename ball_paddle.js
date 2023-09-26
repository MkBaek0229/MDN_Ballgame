
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// 공이 처음 그려질 위치
let x = canvas.width / 2;   
let y = canvas.height / 2;

// 공이 움직임을 표현하기위해 작은값을 매 프레임마다더해줌
let dx = 2;
let dy = -2;

// 충돌감지를 위해 계산편하게하기위해서 원의 반지름값 
const ballRadius = 10;

// 충돌할때마다 색깔 변경이 일어남 
let color = ["red","green","blue"];


// 랜덤으로 red green blue 중 하나의 컬러를얻어내기위한 난수생성기
let rdcolornum = Math.floor(Math.random() * 3);


// 공을치는 패들 정의 
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// 패들에 대한 제어 
let rightPressed = false;
let leftPressed = false;


// 벽돌관련 변수들
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickColor = "#E0115F";

// 벽돌을 담기위한 2차원 배열 
// 열 c 행 r 화면에 벽돌을 그릴 위치를 나타낼 x,y
var bricks = [];
for(var c=0; c < brickColumnCount; c++) {
  // bricks[0] = []
    bricks[c] = [];
    for(var r=0; r < brickRowCount; r++) {
      // bricks[0][0] = [{ x: 0, y: 0 }] bricks[0][1] = [{ x: 0, y: 0 }, { x: 0, y: 0 }] bricks[0][2] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
      /*
         bricks[0] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
         bircks[1] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
         bircks[2] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
         bircks[3] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
         bircks[4] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
      */
        bricks[c][r] = { x: 0, y: 0 };
    }
}
// 게임 종료시 최종 점수를 알려주는 endGame()

function endGame() {
  alert("You score :" + score);
}

// 게임플레읻중 점수를 보기위해 점수를 기록할 변수 선언
var score = 0;

// 스테이지를 안내할 stage 변수 선언
var stage = 1;

// 플레이어에게 3개의 생명 부여하기.
let lives = 5;
// --------------------------------------------------------------------------------------------------------위에는 변수및 게임을 구성하기위한 도구 선언들이였음.----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// 키보드 컨트롤로 패들 제어
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//마우스 컨트롤로 패들 제어
document.addEventListener("mousemove", mouseMoveHandler, false);

// 마우스 움직일때 핸들링 함수
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
//키가 눌렷을때 핸들링 함수
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// 벽돌과의 충돌감지
function collisionDetection() {
  // let c = 0; c < 5; c++ 
  // let r = 0; r < 3; r++
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
       // const b = bricks[0][0] == {x: 115 , y: 60}; b는 각각 벽돌객체의 어떤 위치에대한 정보를 가진듯?
      const b = bricks[c][r];
    
      // calculations 충돌하기위한 조건
      /*
      공의 x 좌표는 벽돌의 x 좌표보다 커야 한다.
      공의 x 좌표는 벽돌의 x 좌표 + 가로 길이보다 작아야 한다.
      공의 y 좌표는 벽돌의 y 좌표보다 커야 한다. 
      공의 y 좌표는 벽돌의 y 좌표 + 높이보다 작아야 한다. 
      */
     if(b.status === 1){
        if(
          x > b.x && 
          x < b.x + brickWidth &&
          y > b.y && 
          y < b.y + brickHeight
          ) {
          dy = -dy;
          brickColor = color[rdcolornum];
          b.status = 0;
          score++;
          

          // 벽돌이 다 깨지면 재생성할것임
          if (score == brickRowCount * brickColumnCount) { // 모든 벽돌이 깨졌을 때
            endGame();
            document.location.reload();
            

          }
       }
      } 
      }
    }
  }

// 점수화면을 만들고 업데이트를 하기위한 drawScore 함수
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }
// 생명수 표시하는 화면 만들고 업데이트를 하기위한 drawLives 함수
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

 
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
   }
  }




// 최초로 공을 그리기 위한 drawBall()함수
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color[rdcolornum];
  ctx.fill();
  ctx.closePath();
}





// 패들을 그려보기
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// 벽돌 그리기
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}






// 공을 움직이기위한 draw()함수
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  //벽돌과의 충돌감지
  collisionDetection();
  
  // 양옆 방향으로 공 튕겨내기
  // 공의 위치가 0보다 작거나 캔버스의 넓이(480)보다 커질 경우 움직임의 방향을 반대로 뒤집어줌
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    dx = -dx;
    rdcolornum = Math.floor(Math.random() * 3);
  }

  // 위아래 방향으로 공  튕겨내기
  // 공의위치 y가 0보다 작거나 y가 캔버스의 높이(320)보다 커질 경우 움직임의 방향을 반대로뒤집어줌
  if (y + dy < ballRadius) {
    dy = -dy;
  } 
  else if (y + dy > canvas.height - ballRadius) {
     // 패들에 공이닿으면 반대쪽으로 튕겨짐
      if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      brickColor = "#E0115F"
      
    } else {
      // 패들에공이닿지않고 바닥에닿으면 생기는 일
      // 생명이 깎임
      lives--;
      // 생명이 0이될경우 게임오버
      if (!lives) {
        alert("Game OVER");
        document.location.reload();
      } else {
      // 생명이 존재한다면 생명이 깎인후 공과 패들을 다시그리기.
        x = canvas.width / 2;   
        y = canvas.height / 2;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
}
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
}

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
  

draw();

