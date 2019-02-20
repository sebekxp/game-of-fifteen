let board;
let randomNumberArray;
let maxSizeArray;
let sec;
let min;
let stepsCounter;
let startTimer;
let stopTimer;
let btnPause;
let widthProgresBar;
let arrSizeTile = 100;
let nameClass = "l2";
let mobileSize = 71.75;
let N = 4 ;
stepsCounter = 0;
startTimer = true;
stopTimer = false;
btnPause = true;
widthProgresBar = 1;
document.querySelector(".level-1").addEventListener("click", () => {
    N = 3; arrSizeTile = 136.66; nameClass = "l1", mobileSize = 96.66;
    clearBoard();
    initBoard(N);
    scrambleBoard(N);
    createElement(N, arrSizeTile, nameClass);
    document.querySelector("nav .pointer").style.left = "31px";
    scaleWindow(x);
});
document.querySelector(".level-2").addEventListener("click", () => {
    N = 4; arrSizeTile = 100; nameClass = "l2", mobileSize = 71.75;
    clearBoard();
    initBoard(N);
    scrambleBoard(N);
    createElement(N, arrSizeTile, nameClass);   
    document.querySelector("nav .pointer").style.left = "115px";
    scaleWindow(x) ;

});
document.querySelector(".level-3").addEventListener("click", () => {
    N = 5; arrSizeTile = 79; nameClass = "l3", mobileSize = 56;
    clearBoard();
    initBoard(N);
    scrambleBoard(N);
    createElement(N, arrSizeTile, nameClass);
    document.querySelector("nav .pointer").style.left = "195px";
    scaleWindow(x) ;
});
document.querySelector(".level-4").addEventListener("click", () => {
    N = 6; arrSizeTile = 65; nameClass = "l4", mobileSize = 45.83;
    clearBoard();
    initBoard(N);
    scrambleBoard(N);
    createElement(N, arrSizeTile, nameClass);
    document.querySelector("nav .pointer").style.left = "280px";
    scaleWindow(x) ;

});

initBoard(N);
scrambleBoard(N);
createElement(N,arrSizeTile, nameClass);

function initBoard(N) {
    board = new Array(N);
    randomNumberArray = new Array(N);
    for (var i = 0; i < N; i++) {
        board[i] = new Array()
        randomNumberArray[i] = new Array();
    }
}
function clearBoard() {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board.length; j++) {

                board[i][j].parentNode.removeChild(board[i][j]);

                if( board[i][j].classList[0] == "filledTile")
                    board[i][j].classList.remove("filledTile");
                else
                    board[i][j].classList.remove("blankTile");
            }
        }
}
function scrambleBoard(N) {
    do {
        generateRandomNumber(N);
    } while (!isSolvable(N));
}
function createElement(N, arrSizeTile, nameClass) {
    for (var i = 0, n = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            board[i][j] = document.createElement("div");
            board[i][j].id = i + "-" + j;
            board[i][j].style.left = j * arrSizeTile + 5 * j + 5 + "px";
            board[i][j].style.top = i * arrSizeTile + 5 * i + 5 + "px";

            board[i][j].innerHTML = randomNumberArray[i][j] ? randomNumberArray[i][j] : "";

            if (randomNumberArray[i][j] == "")
                board[i][j].classList.add("blankTile");
            else{
                board[i][j].classList.add("filledTile");
                board[i][j].addEventListener("click", moveTiles);
            }
           
            board[i][j].classList.add(nameClass);            
            document.querySelector(".board").appendChild(board[i][j]);
        }
    }
}

function getInvCount(N) {
    var newArr = [];

    for (var i = 0; i < randomNumberArray.length; i++) {
        newArr = newArr.concat(randomNumberArray[i]);
    }
    let inv_count = 0;
    for (var i = 0; i < N * N - 1; i++) {
        for (var j = i + 1; j < N * N; j++) {
            if (newArr[j] && newArr[i] &&
                newArr[i] > newArr[j])
                inv_count++;
        }
    }
    return inv_count;
}

function findXPosition(N) {
    for (var i = N - 1; i >= 0; i--)
        for (var j = N - 1; j >= 0; j--)
            if (randomNumberArray[i][j] == 0)
                return N - i;
}

function isSolvable(N) {
    let pos = findXPosition(N);
    let invCount = getInvCount(N);
    if (N & 1)
        return !(invCount & 1);

    else {
        if (pos & 1)
            return !(invCount & 1);
        else
            return invCount & 1;
    }
}

function searchElement(elem, N) {
    var ifWas = false;
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            if (randomNumberArray[i][j] == elem)
                ifWas = true;
        }
    }
    return ifWas;
}

function generateRandomNumber(N) {
    for (var i = 0; i < N; i++)
        for (var j = 0; j < N; j++)
            randomNumberArray[i][j] = -1;

    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            var tempRandom = Math.floor((Math.random() * N * N) + 0);
            while (searchElement(tempRandom, N))
                tempRandom = Math.floor((Math.random() * N * N) + 0);
            randomNumberArray[i][j] = tempRandom;
        }
    }
}

function moveTiles(e) {
    if (startTimer) {
        timer();
        startTimer = false;
    }
    document.querySelector("#steps").innerHTML = ++stepsCounter;
    let index = e.target.id.indexOf("-");
    const a = parseInt(e.target.id.substr(0, index), 10);
    const b = parseInt(e.target.id.substr(index + 1), 10);

    let checkForBlank = findIfBlankTileisNeighbour(a, b);
    if (checkForBlank.matchIfFind) {
        [
            board[a][b].style.cssText,
            board[checkForBlank.offset_i][checkForBlank.offset_j].style.cssText
        ] = [
                board[checkForBlank.offset_i][checkForBlank.offset_j].style.cssText,
                board[a][b].style.cssText
            ];

        [
            board[a][b].id,
            board[checkForBlank.offset_i][checkForBlank.offset_j].id
        ] = [
                board[checkForBlank.offset_i][checkForBlank.offset_j].id,
                board[a][b].id
            ];

        [board[a][b], board[checkForBlank.offset_i][checkForBlank.offset_j]] = [
            board[checkForBlank.offset_i][checkForBlank.offset_j],
            board[a][b]
        ];
    }
    if (checkWinGame())
        stopTimer = true;
}

function findIfBlankTileisNeighbour(i, j) {
    var neighbours = {
        left: 0,
        top: 0,
        offset_i: i,
        offset_j: j,
        matchIfFind: false
    };
    if (i - 1 >= 0 && board[i - 1][j].classList[0] == "blankTile") {
        neighbours.offset_i = i - 1;
        neighbours.offset_j = j;
        neighbours.matchIfFind = true;
    } else if (i + 1 <= N-1 && board[i + 1][j].classList[0] == "blankTile") {
        neighbours.offset_i = i + 1;
        neighbours.offset_j = j;
        neighbours.matchIfFind = true;
    } else if (j - 1 >= 0 && board[i][j - 1].classList[0] == "blankTile") {
        neighbours.offset_i = i;
        neighbours.offset_j = j - 1;
        neighbours.matchIfFind = true;
    } else if (j + 1 <= N-1 && board[i][j + 1].classList[0] == "blankTile") {
        neighbours.offset_i = i;
        neighbours.offset_j = j + 1;
        neighbours.matchIfFind = true;
    }

    return neighbours;
}

function timer() {
    sec = 1;
    min = 0;
    var refreshIntervalId = setInterval(function () {
        if (stopTimer)
            clearInterval(refreshIntervalId);
        if (btnPause) {
            if (sec == 60) {
                min++;
                sec = 0;
            }
            document.querySelector("#timer").innerHTML =
                (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
            sec++;
        }
    }, 1000);
}

function checkWinGame() {
    var countTile = 0;
    for (var i = 0, n = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            if (n == N * N -1) 
                break;
            if (board[i][j].innerHTML == ++n) {
                ++countTile;
                progresBar(countTile);
            }
        }
    }
    if (countTile == N * N - 1) {
        document.querySelector('#popup').style.display = 'block';
        document.querySelector('#scoreSteps').innerHTML = stepsCounter;
        document.querySelector('#scoreTime').innerHTML = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        return true;
    }
}


document.querySelector('#popup i').addEventListener('click', () => {
    document.querySelector('#popup').style.display = 'none';
});
document.querySelector('#reset').addEventListener('click', () => {
    location.reload();
});
document.querySelector("#olIcon").addEventListener("click", () => {
    document.querySelector('#overlay').style.display = 'none';
    btnPause = true;
    document.querySelector("#pause p").innerHTML = "Pause";
    document.querySelector(".board").addEventListener("click", moveTiles);
});

document.querySelector("#pause").addEventListener("click", () => {

    if (document.querySelector("#pause p").innerHTML == 'Pause') {
        btnPause = false;
        document.querySelector(".board").removeEventListener("click", moveTiles);
        document.querySelector('#overlay').style.display = 'block';
        document.querySelector("#pause p").innerHTML = "Start";
    }
    else {
        btnPause = true;
        document.querySelector("#pause p").innerHTML = "Pause";
        document.querySelector(".board").addEventListener("click", moveTiles);
        document.querySelector('#overlay').style.display = 'none';
    }
});

function progresBar(countTile) {
    if (countTile == N * N - 1) {
        document.querySelector("#progBar").style.borderTopRightRadius = "8px";
        document.querySelector("#progBar").style.borderBottomRightRadius = "8px";
    }
    document.querySelector("#progBar").style.width = countTile * 100 / (N * N -1) + '%';
}

function scaleWindow(x) {
    if (x.matches) { 
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                board[i][j].style.left = j * mobileSize + 5 * j + 5 + "px";
                board[i][j].style.top = i * mobileSize + 5 * i + 5 + "px";
            }
        }
        document.querySelector(".level-1").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "31px";
        });
        document.querySelector(".level-2").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "115px";
        });
        document.querySelector(".level-3").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "195px";
        });
        document.querySelector(".level-4").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "280px";
        });
        

    } else {
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                board[i][j].style.left = j * arrSizeTile + 5 * j + 5 + "px";
                board[i][j].style.top = i * arrSizeTile + 5 * i + 5 + "px";
            }
        }
        document.querySelector(".level-1").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "45px";
        });
        document.querySelector(".level-2").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "157px";
        });
        document.querySelector(".level-3").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "268px";
        });
        document.querySelector(".level-4").addEventListener("click", () => {
            document.querySelector("nav .pointer").style.left = "380px";
        });
        
    }
}

var x = window.matchMedia("(max-width: 450px)")
scaleWindow(x) 
x.addListener(scaleWindow) 