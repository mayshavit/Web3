$(document).ready(function ($) {

    function mazesNames() {
        $.getJSON("../api/Maze/GetMazes").done(function (data) {
            var i = 0;
            data.forEach(function (mazes) {
                $("<option>" + mazes[i] + "</option>").appendTo("#games");
                i++;
            });
        })
            .fail(function () {
                alert("nnmnmn");
            });

        return false;
    }

    function initialGame(name, maze) {
        var mazeData = maze.Maze;
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
            /*function (direction, playerRow, playerCol) { // a callback function which is invoked after each move
            })*/
            rows,
            cols,
            ctx2);

        window.document.title = name;
        mazesNames();

        $.ajax({
            url: "../api/Maze/GetOtherPlayerName",
            type: "GET",
            data: { game: name, player: playerName },
            async: false
        }).done(function (otherPlayerName) {
            otherPlayer = otherPlayerName;
            return false;
        });
        return false;
    }

    mazesNames();

    var myMazeBoard;
    var otherMazeBoard;
    var playerName = sessionStorage.getItem("playerName");
    var otherPlayer;

    var gameHub = $.connection.gameHub; //messagesHub;
    var toStart = false;

    

    $.connection.hub.start().done(function () {
        gameHub.client.gotMessage = function (text) {
        //$("#lstMessages").append("<li><strong>" + senderPhoneNum + "</strong>:" + text + "</li>");
        if (text === "startGame") {
            toStart = true;
            //otherPlayer = senderUserName;
        }
    };
        /*$("#btnConnect").click(function () {
            var userPhoneNum = $("#userPhoneNum").val();
            gameHub.server.connect(userPhoneNum);
        });*/

        $("#joinGame").click(function () {
            //var userPhoneNum = $("#userPhoneNum").val();
            //var senderPhoneNum = $("#targetPhoneNum").val();
            //var text = $("#msgText").val();
            gameHub.server.connect(playerName);
            var name = $("#games").val();
            $.ajax({
                url: "../api/Maze/JoinGame",
                type: "GET",
                data: { game: name, player: playerName },
                async: false
            }).done(function (maze) {
                initialGame(name, maze);
                gameHub.server.sendMove(otherPlayer, "startGame");
                return false;
            });

            //gameHub.server.sendMove();
        });


        $("#startGame").click(function () {
            //var playerName = sessionStorage.getItem("playerName"); //$("#userPhoneNum").val();
            gameHub.server.connect(playerName);



            var name = $("#mazeName").val();
            var rows = $("#rows").val();
            var cols = $("#cols").val();

            $.ajax({
                url: "../api/Maze/StartGame",
                type: "GET",
                data: { name: name, rows: rows, cols: cols, player: playerName },
                async: false
            }).done(function (maze) {
                alert("Waiting for another player...");

                while (!toStart) {

                }
                /*var mazeData = maze.Maze;
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

                window.document.title = name;
                mazesNames();
                return false;*/

                initialGame(name, maze);
                return false;
            });


            return false;
        });
    });
});