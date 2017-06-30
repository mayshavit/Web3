$(document).ready(function ($) {

    var script = document.createElement('script');
    script.src = './Scripts/jquery.mazeBoard.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    function mazesNames() {
        $.getJSON("../api/Maze/GetMazes").done(function (data) {
            //var i = 0;
            data.forEach(function (maze) {
                $("<option>" + maze + "</option>").appendTo("#games");
            });
        })
            .fail(function () {
                alert("mazes");
            });

        //return false;
    }

function initialGame(/*name, maze*/) {
    alert("initial...");
    var mazeData = maze.Maze;
    var rows = maze.Rows;
    var cols = maze.Cols;
    alert("initial maze");
        var startRow = maze.Start.Row;
        var startCol = maze.Start.Col;
        var exitRow = maze.End.Row;
        var exitCol = maze.End.Col;
        var playerImage = new Image();
        playerImage.src = "../Views/Images/minion.jpg";
        var exitImage = new Image();
        exitImage.src = "../Views/Images/banana.jpg";

        var myCanvas = document.getElementById("mazeCanvas");
        var ctx1 = myCanvas.getContext("2d");

        myMazeBoard = $("#mazeCanvas").mazeBoard(
            mazeData, // the matrix containing the maze cells
            startRow, startCol, // initial position of the player
            exitRow, exitCol, // the exit position
            playerImage, // player's icon (of type Image)
            exitImage, // exit's icon (of type Image)
            true, // is the board enabled (i.e., player can move)
            /*function (direction, playerRow, playerCol) { // a callback function which is invoked after each move
            })*/
            rows,
            cols,
            ctx1);

        var canvas = document.getElementById("mazeCanvas2");
        var ctx2 = canvas.getContext("2d");

        otherMazeBoard = $("#mazeCanvas2").mazeBoard(
            mazeData, // the matrix containing the maze cells
            startRow, startCol, // initial position of the player
            exitRow, exitCol, // the exit position
            playerImage, // player's icon (of type Image)
            exitImage, // exit's icon (of type Image)
            true, // is the board enabled (i.e., player can move)
            rows,
            cols,
            ctx2);

        window.document.title = mazeName; //name;
        mazesNames();

        $.ajax({
            url: "../api/Maze/GetOtherPlayerName",
            type: "GET",
            data: { game: mazeName, player: playerName },
            async: false
        }).done(function (otherPlayerName) {
            otherPlayer = otherPlayerName;
            //return false;
            });
        alert("d initial!");
        return false;
    }

    //mazesNames();

    var myMazeBoard;
    var otherMazeBoard;
    var playerName = sessionStorage.getItem("playerName");

    var mazeName;
    var maze;

    var otherPlayer;

    var gameHub = $.connection.gameHub; //messagesHub;
    var toStart = false;


    if (playerName === null) {
        alert("You must register first in order to play MultiGame.");
        //return false;
    } else {
        gameHub.client.gotMessage = function (move) {
            alert("msg!!!!" + playerName);
            if (move == "startGame")
                alert("start game");
                    toStart = true;
                    initialGame();
                }
               // return false;
            };
        $.connection.hub.start().done(function () {
            mazesNames();
            //return false;
            //return false;
           

            $("#joinGame").click(function () {
                gameHub.server.connect(playerName);
                //var name 
                mazeName = $("#games").val();
                $.ajax({
                    url: "../api/Maze/JoinGame",
                    type: "GET",
                    data: { game: mazeName, player: playerName },
                    async: false
                }).done(function (mazeData) {
                    alert("join.");
                    maze = mazeData;
                    //initialGame(name, maze);
                    initialGame();
                    gameHub.server.sendMove(otherPlayer, "startGame");
                    //return false;
                });

                //otherPlayer = "a11";
                //gameHub.server.sendMove(otherPlayer, "startGame");
            });


            $("#startGame").click(function () {
                gameHub.server.connect(playerName);

                mazeName = $("#mazeName").val();
                var rows = $("#rows").val();
                var cols = $("#cols").val();

                $.ajax({
                    url: "../api/Maze/StartGame",
                    type: "GET",
                    data: { name: mazeName, rows: rows, cols: cols, player: playerName },
                    async: false
                }).done(function (mazeData) {
                    maze = mazeData;
                    alert("Waiting for another player...");
                    return false;

                    /*while (!toStart) {
        
                    }
                    initialGame(name, maze);
                    return false;*/
                });


                return false;
            });
        });
});