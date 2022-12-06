var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 2;
var x = canvas.width / 2;
var y = 30;
var dx = -1.5;
var dy = +1.5;
var paddleHeight = 3;
var paddleWidth = 50;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var paddleXop = (canvas.width - paddleWidth) / 2;
var scp = 0;
var sco = 0;
var scob = document.querySelector('#sco');
var scop = document.querySelector('#scp');
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var str = prompt('enter player name')
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#e63946';
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 1, paddleWidth, paddleHeight);
    ctx.fillStyle = "#e63946";
    ctx.fill();
    ctx.closePath();
}
function drawopPaddle() {

    ctx.beginPath();
    ctx.rect(paddleXop, paddleHeight - 2, paddleWidth + 10, paddleHeight);
    ctx.fillStyle = "#e63946";
    ctx.fill();
    ctx.closePath();
}
function drawScorecp() {
    scop.innerHTML = `${str.toUpperCase()}:${scp}`;
}
function drawScore() {
    scob.innerHTML = `Computer:${sco}`;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    drawBall();
    drawPaddle();
    drawopPaddle()
    drawScore();
    drawScorecp()
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        if (x > paddleXop && x < paddleXop + paddleWidth) {
            dy = -dy;
        }
        else {
            scp++;
            alert('You got a point');
            console.log(sco)
            x = canvas.width / 2;
            y = canvas.height;
            paddleXop = canvas.width / 2;
            paddleX = canvas.width / 2;
        }
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            sco++;
            alert('Computer got a point');
            console.log(sco)
            x = canvas.width / 2;
            y = 30;
            paddleXop = canvas.width / 2;
            paddleX = canvas.width / 2;
            // clearInterval(interval); // Needed for Chrome to end game
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    if ((y + dy <= canvas.width / 2) && (y + dy >= 30)) {
        if (x >= canvas.width2)
            paddleXop = x + 3;
        else {
            paddleXop = x - 3;
        }

    }
    if (y + dy < 30) {
        if (x >= canvas.width2)
            paddleXop = x + Math.floor(Math.random() * 10);
        else {
            paddleXop = x - Math.floor(Math.random() * 10);
        }
    }
    x += dx;
    y += dy;
    if (scp === 11) {
        alert("YOU WIN")
        document.location.reload();
        clearInterval(interval);
    }
    else if (sco === 11) {
        alert("GAME OVER")
        document.location.reload();
        clearInterval(interval);
    }

}
function moveop() {
    if (x >= canvas.width / 2)
        paddleXop += 10;
    else {
        paddleXop -= 10;
    }
}
//setInterval(moveop, 1000);

var interval = setInterval(draw, 10);