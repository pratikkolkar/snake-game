let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 9;
let food = { x: 14, y: 4 };
let snakeArray = [{ x: 13, y: 15 }];
let score = 0;



//Step1
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide() {

    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        }
    }

    if (snakeArray[0].x <= 0 || snakeArray[0].x >= 18 || snakeArray[0].y <= 0 || snakeArray[0].y >= 18) {
        return true;
    }
    return false;
}

//step2
/*document: The Document interface represents any web page loaded 
            in the browser and serves as an entry point into the 
            web page's content, which is the DOM tree.            
*/
function gameEngine() {
    //Check for collide
    if (isCollide()) {
        snakeArray = [{ x: 13, y: 15 }];
        alert("Game Over!, Press any key to restart game");
        inputDir = { x: 0, y: 0 };

        food = { x: 14, y: 4 };
        score = 0;
        currentScore.innerHTML = "Score: " + score;
    }
    

    //co-ordinates of snake head and food are equal then it is said that snake has eaten its food and increase score
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        score++;
        currentScore.innerHTML = "Score: " + score;
        if (score > highscore) {
            highscore = score;
            highscoreCard.innerHTML = "HighScore: " + highscore;
            localStorage.setItem("highscore", JSON.stringify(highscore));
        }
        //Array.unshift adds element in the beginning of array
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = {...snakeArray[i] };
    }
    
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    
    //console.log(snakeArray[0].x + ":" + snakeArray[0].y);
    board.innerHTML = ""
    //display snake on board
    snakeArray.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    });


    //display food on board
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)

}


let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    localStorage.setItem("highscore", JSON.stringify(0));
} else {
    highscoreCard.innerHTML = "HighScore: " + highscore;
}


//Main logic start
/* 
    requestAnimationFrame():- The window.requestAnimationFrame() method tells 
                              the browser that you wish to perform an animation 
                              and requests that the browser calls a specified 
                              function to update an animation before the next 
                              repaint. The method takes a callback as an argument 
                              to be invoked before the repaint.
*/
window.requestAnimationFrame(main)

/*
listen for keyboard events

addEventListener(event,function,useCapture)

Parameters:
    event - string value of keyboard key
    function - a fuction that will be called upon event
    useCapture(optional) - boolean; true - enables capturing propogation
                                    false - enables bubbling propogation

*/
window.addEventListener('keydown', e => {
    // inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            if (checkDirection(0, -1)) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            if (checkDirection(0, 1)) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            if (checkDirection(-1, 0)) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            if (checkDirection(1, 0)) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;
        default:
            break;
    }
});

//logic to check if keystroke direction is in line with snake body
function checkDirection(a, b) {
    let x = snakeArray[0].x + a;
    let y = snakeArray[0].y + b;

    if (snakeArray.length > 1 && x === snakeArray[1].x && y === snakeArray[1].y) {
        // console.log(x + ":" + snakeArray[1].x)
        // console.log(y + ":" + snakeArray[1].y)
        // console.log(snakeArray)
        return false;
    }
    return true;

}