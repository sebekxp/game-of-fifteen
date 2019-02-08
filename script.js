const board = new Array(4);
let sec;;
let min;
let stepsCounter = 0;
let startTimer = true;
let stopTimer = false;
let btnPause = true;
let widthProgresBar = 1;
for (var i = 0; i < board.length; i++) {
    board[i] = new Array();
}

for (var i = 0, n = 15; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        board[i][j] = document.createElement("div");
        board[i][j].id = i + "-" + j;
        board[i][j].style.left = j * 100 + 5 * j + 5 + "px";
        board[i][j].style.top = i * 100 + 5 * i + 5 + "px";
        if (n > 0) board[i][j].innerHTML = n--;

        if (i == 3 && j == 3) board[i][j].classList.add("blankTile");
        else board[i][j].classList.add("filledTile");

        document.querySelector(".board").appendChild(board[i][j]);
    }
}

[board[3][1].innerHTML, board[3][2].innerHTML] = [
    board[3][2].innerHTML,
    board[3][1].innerHTML
];
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
document.querySelector(".board").addEventListener("click", moveTiles);

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
    } else if (i + 1 <= 3 && board[i + 1][j].classList[0] == "blankTile") {
        neighbours.offset_i = i + 1;
        neighbours.offset_j = j;
        neighbours.matchIfFind = true;
    } else if (j - 1 >= 0 && board[i][j - 1].classList[0] == "blankTile") {
        neighbours.offset_i = i;
        neighbours.offset_j = j - 1;
        neighbours.matchIfFind = true;
    } else if (j + 1 <= 3 && board[i][j + 1].classList[0] == "blankTile") {
        neighbours.offset_i = i;
        neighbours.offset_j = j + 1;
        neighbours.matchIfFind = true;
    }

    return neighbours;
}

function timer() {
    sec = 0;
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
    for (var i = 0, n = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (n == 15)
                break;
            if (board[i][j].innerHTML == ++n){
                ++countTile;
                progresBar(countTile);
            }
        }
    }
    if (countTile == 15) {
        document.querySelector('#popup').style.display = 'block';
        document.querySelector('#scoreSteps').innerHTML = "Steps: " + stepsCounter;
        document.querySelector('#scoreTime').innerHTML = "Time: " + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        return true;
    }
}
document.querySelector('#popup').addEventListener('click', () => {
    document.querySelector('#popup').style.display = 'none';
});
document.querySelector('#reset').addEventListener('click', () => {
    location.reload();
});

let flagPauseReasume = true;
document.querySelector("#pause").addEventListener("click", () => {

    if (document.querySelector("#pause p").innerHTML == 'Pause') {
        btnPause = false;
        document.querySelector(".board").removeEventListener("click", moveTiles);
        document.querySelector("#pause p").innerHTML = "Resume";
    }
    else  {
        btnPause = true;
        document.querySelector("#pause p").innerHTML = "Pause";
        document.querySelector(".board").addEventListener("click", moveTiles);
    }
});

function progresBar(countTile){
    if(countTile == 15){
        document.querySelector("#progBar").style.borderTopRightRadius= "8px";
        document.querySelector("#progBar").style.borderBottomRightRadius = "8px";
    }
    document.querySelector("#progBar").style.width = countTile * 6.66 + '%';
}