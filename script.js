const board = new Array(4);
let stepsCounter = 0;
for (var i = 0; i < board.length; i++) {
    board[i] = new Array();
}


for (var i = 0, n = 15; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        board[i][j] = document.createElement('div');
        board[i][j].id =i + '-' + j;
        board[i][j].style.left = (j * 100 + 5 * j + 5) + 'px';
        board[i][j].style.top = (i * 100 + 5 * i + 5) + 'px';
        if(n > 0)
            board[i][j].innerHTML = n--;

        if (i == 3 && j == 3)
            board[i][j].classList.add('blankTile');
        else
            board[i][j].classList.add('filledTile');

        document.querySelector('.board').appendChild(board[i][j]);

    }
}

document.querySelector('.board').addEventListener('click', (e) => {
    document.querySelector('#steps').innerHTML = ++stepsCounter;
    let index = e.target.id.indexOf("-");
    const a = parseInt(e.target.id.substr(0, index), 10);
    const b = parseInt(e.target.id.substr(index + 1), 10);    
    
    let checkForBlank = findIfBlankTileisNeighbour(a,b)
    if(checkForBlank.matchIfFind){

        [board[a][b].style.cssText, board[checkForBlank.offset_i ][checkForBlank.offset_j].style.cssText]= 
        [board[checkForBlank.offset_i][checkForBlank.offset_j].style.cssText, board[a][b].style.cssText];
        
        [board[a][b].id, board[checkForBlank.offset_i ][checkForBlank.offset_j].id]= 
        [board[checkForBlank.offset_i][checkForBlank.offset_j].id, board[a][b].id];
           
        [board[a][b], board[checkForBlank.offset_i ][checkForBlank.offset_j]]= 
        [board[checkForBlank.offset_i][checkForBlank.offset_j], board[a][b]];
    }
})


function findIfBlankTileisNeighbour(i,j) {
    var neighbours = {
        left: 0,
        top: 0,
        offset_i: i,
        offset_j: j,
        matchIfFind: false
    };
     if ((i - 1 >= 0) && (board[i - 1][j].classList[0] == 'blankTile')) {
        neighbours.offset_i = i - 1;
        neighbours.offset_j = j;
        neighbours.matchIfFind = true;
     }
     else if ((i + 1 <= 3) && (board[i + 1][j].classList[0] == 'blankTile')) {
        neighbours.offset_i  = i + 1;
        neighbours.offset_j = j;
        neighbours.matchIfFind = true;
     }
     else if ((j - 1 >= 0) && (board[i][j - 1].classList[0] == 'blankTile')) {
        neighbours.offset_i  = i;
        neighbours.offset_j  = j - 1;
        neighbours.matchIfFind = true;
     }
     else if ((j + 1 <= 3) && (board[i][j +1].classList[0] == 'blankTile')) {
        neighbours.offset_i  = i;
        neighbours.offset_j  = j + 1;
        neighbours.matchIfFind = true;
    }

    return neighbours;
}

function getTime(){
    let date = new Date();
    date.getSeconds
}