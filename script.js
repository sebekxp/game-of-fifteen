var board = new Array(4);

for (var i = 0; i < board.length; i++) {
    board[i] = new Array();
}


for (var i = 0, n = 15; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        board[i][j] = document.createElement('div');
        board[i][j].id = 'tile-' + i + '-' + j;
        board[i][j].style.left = (j * 80 + 1 * j + 1) + 'px';
        board[i][j].style.top = (i * 80 + 1 * i + 1) + 'px';
        board[i][j].innerHTML = n--;
        // board[i][j].classList.add('tile');
        if (i == 3 && j == 3)
            board[i][j].classList.add('blankTile');
        else
            board[i][j].classList.add('filledTile');

        document.querySelector('.board').appendChild(board[i][j]);

    }
}


var a = 2;
var b = 3
board[a][b].addEventListener('click', () => {
    let checkForBlank = findIfBlankTileisNeighbour(a,b)
    console.log(checkForBlank);
    if(checkForBlank.matchIfFind){
        [board[a][b].style.cssText, board[checkForBlank.offsetY][checkForBlank.offsetX].style.cssText]= 
        [board[checkForBlank.offsetY][checkForBlank.offsetX].style.cssText, board[a][b].style.cssText];

    }
})


function findIfBlankTileisNeighbour(i,j) {
    let neighbours= {
        left: 0,
        top: 0,
        offsetX: j,
        offsetY: i,
        matchIfFind: false
    };
     if (i - 1 >= 0 && board[i-1][j].innerHTML == 0 ) {
        neighbours.offsetX = j;
        neighbours.offsetY = i - 1;
        neighbours.matchIfFind = true;
     }
     else if (i + 1 <= 3 && board[i + 1][j].innerHTML == 0) {
        neighbours.offsetX = j;
        neighbours.offsetY = i + 1;
        neighbours.matchIfFind = true;
     }
     else if (j - 1 >= 0 && board[i][j - 1].innerHTML == 0) {
        neighbours.offsetX = j - 1;
        neighbours.offsetY = i;
        neighbours.matchIfFind = true;
     }
     else if (j + 1 <=3 && board[i][j +1].innerHTML == 0) {
        neighbours.offsetX = j + 1;
        neighbours.offsetY = i;
        neighbours.matchIfFind = true;
     }

    return neighbours;
}
