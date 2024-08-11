const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;  // Ukuran setiap bagian ular dan makanan
const canvasSize = 400;  // Ukuran canvas

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
};

let score = 0;
let d;

// Kontrol keyboard
document.addEventListener('keydown', direction);

// Kontrol sentuh
document.getElementById('left').addEventListener('click', () => setDirection('LEFT'));
document.getElementById('up').addEventListener('click', () => setDirection('UP'));
document.getElementById('right').addEventListener('click', () => setDirection('RIGHT'));
document.getElementById('down').addEventListener('click', () => setDirection('DOWN'));

function direction(event) {
    const keyCode = event.keyCode;
    if (keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
    if (keyCode === 38 && d !== 'DOWN') d = 'UP';
    if (keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
    if (keyCode === 40 && d !== 'UP') d = 'DOWN';
}

function setDirection(newDirection) {
    if (d === undefined) {
        d = newDirection;
    } else if ((newDirection === 'LEFT' && d !== 'RIGHT') ||
               (newDirection === 'UP' && d !== 'DOWN') ||
               (newDirection === 'RIGHT' && d !== 'LEFT') ||
               (newDirection === 'DOWN' && d !== 'UP')) {
        d = newDirection;
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Snake movement
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
    } else {
        snake.pop();
    }

    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

const game = setInterval(draw, 100);
