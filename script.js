$(document).ready(function () {

    //Etat de départ/solution du taquin //
    /* Abscisses et Ordonnés */
    let x = 3;
    let y = 3;
    /* Nombre de tours de mélange */
    let mixTurn = 2;
    //Déplacements possibles pour la case vide //
    let Vx = 2;
    let Vy = 2;

    //Une profondeur d'essai//
    let profondeur = 0;
    let maxTurn = 8;

    /////////////////////////////
    function board (Vx, Vy) {
        let tab = [];
        let value = 0;
        for (let i = 0; i < y; i++) {
            tab[i] = [];
            for (let j = 0; j < x; j++) {
                tab[i][j] = value++;
            }
        }
        tab[Vx][Vy] = "V";
        return tab
    }

    let gameBoard = new board(Vx, Vy);

//Fonction qui délivre un nombre aléatoire //
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    //Fonction qui récupère l'index de "V" dans un tableau //
    function getIndexOfV(gameBoard, V) {
        for (let i = 0; i < gameBoard.length; i++) {
            let index = gameBoard[i].indexOf(V);
            if (index > -1) {
                return [i, index];
            }
        }
    }

/////////////////////////Mélange à partir de la solution de départ ///////////////////////////////////////
    function movesAllowed(movesBoard) {
        let indexV = getIndexOfV(movesBoard, "V");
        let possibleMoves = [];
        if (indexV[1] < y-1) {
            possibleMoves.push({"direction": "right", y: indexV[1] + 1, x: indexV[0]});
        }
        if (indexV[1] > 0) {
            possibleMoves.push({"direction": "left", y: indexV[1] - 1, x: indexV[0]});
        }
        if (indexV[0] < x-1) {
            possibleMoves.push({"direction": "down", y: indexV[1], x: indexV[0] + 1});
        }
        if (indexV[0] > 0) {
            possibleMoves.push({"direction": "up", y: indexV[1], x: indexV[0] - 1});
        }
        return possibleMoves
    }

    //For Random Move : choisi au hasar une direction //
    function randomDirection(possibleMoves) {
        let random = getRandomInt(possibleMoves.length);
        let moveChosen = possibleMoves[random];
        return moveChosen
    }

//Fonction qui effectue UN mouvement //
    function oneMove(moveChosen, tab) {
        let V = getIndexOfV(tab, "V");
        let movingVy = moveChosen.y;
        let movingVx = moveChosen.x;
        let initVx = V[0];
        let initVy = V[1];
        tab[initVx][initVy] = tab[movingVx][movingVy];
        tab[movingVx][movingVy] = "V";
        return tab
    }

//Fonction qui effectue plusieurs tours de mélange //
    function mixedBoard(mixBoard) {
        for (let i = 0; i < mixTurn; i++) {
            let one = movesAllowed(mixBoard);
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
            table(tGameBoard);
            return true
        }
        let possibleMoves = movesAllowed(tGameBoard);
        for (let a = 0; a < possibleMoves.length; a++) {
            let newGameBoard = JSON.parse(JSON.stringify(tGameBoard));
            newGameBoard = oneMove(possibleMoves[a], newGameBoard);//.slice());
            // console.log(tGameBoard);
            // console.log(newGameBoard);
            if (oneTry(newGameBoard, profondeur + 1, maxTurn)) {
                return true
            }
        }
        return false
    }
    /*************************** JQUERY *************************************/
    //Génère les cases du tableau à l'intérieur de la table //
    function table(gameBoard) {
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
        table(gameBoard);
    });

    // Résolution //
    $('#solve').on('click', function(){
        if (oneTry(gameBoard, profondeur, maxTurn)) {
            alert("WIN");
        } else {
            alert("PAS RESOLVABLE");
        }
    });


});