$(document).ready(function () {
//Etat de départ/solution du taquin //
    /* Abscisses et Ordonnés */
    let x = 4;
    let y = 4;
    /* Nombre de tours de mélange */
    let mixTurn = 4;
//Déplacements possibles pour la case vide //
    let Vx = 3;
    let Vy = 3;


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

//Initialisation //
    let initBoard = new board(3, 3);
    let gameBoard = new board(Vx, Vy);

//Fonction qui délivre un nombre aléatoire //
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

/////////////////////////Mélange à partir de la solution de départ ///////////////////////////////////////
    function movesAllowed() {
        let possibleMoves = [];
        if (Vy < 3) {
            possibleMoves.push({"direction": "right", y: Vy + 1, x: Vx});
        }
        if (Vy > 0) {
            possibleMoves.push({"direction": "left", y: Vy - 1, x: Vx});
        }
        if (Vx < 3) {
            possibleMoves.push({"direction": "down", y: Vy, x: Vx + 1});
        }
        if (Vx > 0) {
            possibleMoves.push({"direction": "up", y: Vy, x: Vx - 1});
        }
        return possibleMoves
    }

//Fonction qui effectue UN mouvement //
    function oneMove(possibleMoves) {
        let random = getRandomInt(possibleMoves.length);
        let moveChoosen = possibleMoves[random];
        let movingVy = moveChoosen.y;
        let movingVx = moveChoosen.x;
        let initVx = Vx;
        let initVy = Vy;
        let movingValue = gameBoard[movingVx][movingVy];
        gameBoard[initVx][initVy] = movingValue;
        gameBoard[movingVx][movingVy] = "V";
        Vy = movingVy;
        Vx = movingVx;
        return gameBoard
    }

//Fonction qui effectue plusieurs tours de mélange //
    let mixedBoard = function () {
        for (let i = 0; i < mixTurn; i++) {
            let one = movesAllowed();
            oneMove(one);
        }
        return gameBoard
    };
    mixedBoard();
    console.log(gameBoard);

    /*************************** JQUERY *************************************/
//Génère les cases du tableau à l'intérieur de la table //
    function table() {
        for (let i = 0; i < x; i++) {
            $('table').append("<tr" + i + " class='row'></tr>");
            for (let j = 0; j < y; j++) {
                if (gameBoard[i][j] === "V") {
                    $('tr' + i).append("<td style='background-color:#86E8FF''>" + gameBoard[i][j] + "</td>");
                } else {
                    $('tr' + i).append("<td style='background-color:#5998A7''>" + gameBoard[i][j] + "</td>");
                }
            }
        }
    }

    table();

    /****************************** Parcours en profondeur **********************************************/

    //Function qui transforme le double en simple tableau//
    function getValueInArray(doubleDimBoard){
        let inSimpleBoard =[];
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                inSimpleBoard.push(doubleDimBoard[i][j]);
        }
        }
        return inSimpleBoard
    }

    //Vérification : gameBoard passe en tableau simple et les valeurs sont parcourues; Si les 16 valeurs sont bonnes renvoie true//
    function win(gameBoard) {
        let simpleGameBoard = getValueInArray(gameBoard);
        console.log(simpleGameBoard);
        let counter = 0;
        for(let i=0; i<simpleGameBoard.length; i++){
            if (simpleGameBoard[i] === i || simpleGameBoard[i] === "V"){
                counter++
            }
        }
        return counter === 16
    }

    //Trop de coups --> true//
    function tooMuchHit(maxTurn, movesInOneTry){
        return movesInOneTry < maxTurn
    }

    //Une profondeur d'essai//
    let maxTurn = 10;
    let movesInOneTry = 0;
    function oneTry() {
        let muchHits = tooMuchHit(movesInOneTry, maxTurn);
        let check = win(gameBoard);
        let possibleMoves = movesAllowed();
        if (muchHits === false && check !==true) {
            oneMove(possibleMoves);
            movesInOneTry++;
            console.log(movesInOneTry);
            oneTry(maxTurn, movesInOneTry);
        } else if (muchHits === true){
            console.log("Not solved ...")
        }
        else {
            console.log("Solved !!!!")
        }
    }
oneTry();

    // let deepTurn = 0;
    // function deepInside(){
    //     let deepTurn = 10;
    //     for(let a=0; a < deepTurn; a++) {
    //
    //         let muchHits = tooMuchHit(movesInOneTry, maxTurn);
    //         let check = win(gameBoard);
    //         let possibleMoves = movesAllowed();
    //         if (muchHits === false && check !==true) {
    //             oneMove(possibleMoves);
    //             deepTurn++;
    //             console.log(deepTurn);
    //             oneTry(maxTurn);
    //         } else if (muchHits === true){
    //             console.log("Not solved...")
    //         }
    //         else {
    //             console.log("Solved !!!!")
    //         }
    //     }
    // }
    // deepInside();

});
