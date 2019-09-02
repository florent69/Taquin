$(document).ready(function () {

    //Etat de départ/solution du taquin //
    /* Abscisses et Ordonnés */
    let x = 2;
    let y = 2;
    /* Nombre de tours de mélange */
    let mixTurn = 1;
    //Déplacements possibles pour la case vide //
    let Vx = 1;
    let Vy = 1;

    //Une profondeur d'essai//
    let profondeur = 0;
    let maxTurn = 4;

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
    let gameBoard = new board(Vx, Vy);

//Fonction qui délivre un nombre aléatoire //
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

/////////////////////////Mélange à partir de la solution de départ ///////////////////////////////////////
    function movesAllowed() {
        let possibleMoves = [];
        if (Vy < y-1) {
            possibleMoves.push({"direction": "right", y: Vy + 1, x: Vx});
        }
        if (Vy > 0) {
            possibleMoves.push({"direction": "left", y: Vy - 1, x: Vx});
        }
        if (Vx < x-1) {
            possibleMoves.push({"direction": "down", y: Vy, x: Vx + 1});
        }
        if (Vx > 0) {
            possibleMoves.push({"direction": "up", y: Vy, x: Vx - 1});
        }
        return possibleMoves
    }

    //For Random Move : choisi au hasar une direction //
    function randomDirection(possibleMoves) {
        let random = getRandomInt(possibleMoves.length);
        let moveChoosen = possibleMoves[random];
        return moveChoosen
    }

//Fonction qui effectue UN mouvement //
    function oneMove(moveChosen, tab) {
        let movingVy = moveChosen.y;
        let movingVx = moveChosen.x;
        let initVx = Vx;
        let initVy = Vy;
        let movingValue = tab[movingVx][movingVy];
        tab[initVx][initVy] = movingValue;
        tab[movingVx][movingVy] = "V";
        Vy = movingVy;
        Vx = movingVx;
        return tab
    }

//Fonction qui effectue plusieurs tours de mélange //
    function mixedBoard(mixBoard) {
        for (let i = 0; i < mixTurn; i++) {
            let one = movesAllowed();
            let two = randomDirection(one);
            oneMove(two, mixBoard);
        }
        return mixBoard
    }

    /****************************** Parcours en profondeur **********************************************/

    //Function qui transforme le double en simple tableau//
    function getValueInArray(doubleDimBoard) {
        let inSimpleBoard = [];
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                inSimpleBoard.push(doubleDimBoard[i][j]);
            }
        }
        return inSimpleBoard
    }

    //Vérification : gameBoard passe en tableau simple et les valeurs sont parcourues; Si les 16 valeurs sont bonnes renvoie true//
    function win(winBoard) {
        let simpleGameBoard = getValueInArray(winBoard);
        let counter = 0;
        for (let i = 0; i < simpleGameBoard.length; i++) {
            if (simpleGameBoard[i] === i || simpleGameBoard[i] === "V") {
                counter++
            }
        }
        return counter === x * y
    }

    function oneTry(tGameBoard, profondeur, maxTurn) {
        if (profondeur > maxTurn) {
            return false
        }
        if (win(tGameBoard)) {
            alert("WIN");
            return true
        }
        let possibleMoves = movesAllowed();
        for (let a = 0; a < possibleMoves.length; a++) {
            let newGameBoard = oneMove(possibleMoves[a], tGameBoard);
            if (oneTry(newGameBoard, profondeur + 1, maxTurn)) {
                return true
            }
        }
        return false
    }
    /*************************** JQUERY *************************************/
    //Génère les cases du tableau à l'intérieur de la table //
    function table() {
        $('table').html('');
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

    //Mélange le tableau //
    $('#shuffle').on('click', function(){
        mixedBoard(gameBoard);
        table();
    });

    // Résolution //
    $('#solve').on('click', function(){
        oneTry(gameBoard, profondeur, maxTurn);
        table();
    });


});