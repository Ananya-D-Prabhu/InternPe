var playerRed = "R";
var playerGreen = "G";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }

    // Set initial turn display
    document.getElementById("TurnAndWinner").innerHTML = "<u>Red's Turn</u>";
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    
    // Update tile with the current player's piece and switch turn
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerGreen;
        document.getElementById("TurnAndWinner").innerHTML = "<u>Green's Turn</u>";
    } else {
        tile.classList.add("green-piece");
        currPlayer = playerRed;
        document.getElementById("TurnAndWinner").innerHTML = "<u>Red's Turn</u>";
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // If winner is found, stop showing turns
    // if (gameOver) {
    //     document.getElementById("TurnAndWinner").innerHTML = "";
    // }
}

function setWinner(r, c) {
    let winner = document.getElementById("TurnAndWinner");
    if (board[r][c] == playerRed) {
        winner.innerHTML = "<h2 style='color: red; background-color: rgba(0,0,0,0.5)'><b><i><u>Red Wins</u></i></b></h2>";         
    } else {
        winner.innerHTML = "<h2 style='color: green; background-color: rgba(0,0,0,0.5)'><b><i>Green Wins</i></b></h2>";
    }
    gameOver = true;
}
