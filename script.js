$(document).ready(function(){
//Etat de départ/solution du taquin //
/* Abscisses et Ordonnés */
let x = 4;
let y = 4;
/////////////////////////////
let board = function (Vx, Vy) {
    let tab = [];
    let value = 0;
    for (let i = 0; i < x; i++) {
        tab[i] = [];
        for (let j = 0; j < y; j++) {
            tab[i][j] = value++;
        }
    }
    tab[Vx][Vy] = "V";
    return tab
};

//Initialisation de la case vide //
function initBoard() {
    return new board(3, 3);
}
console.log(initBoard());

//Fonction qui délivre un nombre aléatoire //
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/////////////////////////Mélange à partir de la solution de départ ///////////////////////////////////////
//Déplacements possibles pour la case vide //
let Vx = 3;
let Vy = 3;
function movesAllowed() {
    let possibleMove = [];
    if (Vy < 3) {
        possibleMove.push({"direction": "right", y: Vy + 1, x: Vx });
    }
    if (Vy > 0) {
        possibleMove.push({"direction": "left", y: Vy - 1, x: Vx });
    }
    if (Vx < 3) {
        possibleMove.push({"direction": "down", y: Vy, x: Vx + 1});
    }
    if (Vx > 0) {
        possibleMove.push({"direction": "up", y: Vy, x: Vx - 1});
    }
    return possibleMove
}
//Fonction qui effectue UN mouvement //
function oneMove(possibleMove) {
    let random = getRandomInt(possibleMove.length);
    let moveChoosen = possibleMove[random];
    let gameBoard = new board(Vx, Vy);
    console.log(moveChoosen);
    let movingVy = moveChoosen.y;
    let movingVx = moveChoosen.x;
    let initVx = Vx;
    let initVy = Vy;
    let movingValue = gameBoard[movingVx][movingVy];
    gameBoard[initVx][initVy] = movingValue;
    gameBoard[movingVx][movingVy] = "V";
    Vy = movingVy;
    Vx = movingVx;
    console.log(gameBoard);
}

//Fonction qui effectue plusieurs tours de mélange //
let mixedBoard = function () {
    let mixTurn = 4;
    for (let i = 0; i < mixTurn; i++) {
        let one = movesAllowed();
        oneMove(one, Vx, Vy);
    }
};
mixedBoard();

/*************************** JQUERY *************************************/


});
