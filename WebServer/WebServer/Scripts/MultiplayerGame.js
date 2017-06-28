$(document).ready(function ($) {
    var myMazeBoard;
    var otherMazeBoard;

    var messagesHub = $.connection.messagesHub;
    var toStart = false;

    messagesHub.client.gotMessage = function (senderPhoneNum, text) {
        //$("#lstMessages").append("<li><strong>" + senderPhoneNum + "</strong>:" + text + "</li>");
        if (text == "startGame") {
            toStart = true;
        }     
    };

    $.connection.hub.start().done(function () {
        /*$("#btnConnect").click(function () {
            var userPhoneNum = $("#userPhoneNum").val();
            messagesHub.server.connect(userPhoneNum);
        });*/

        $("#btnSendMessage").click(function () {
            var userPhoneNum = $("#userPhoneNum").val();
            var senderPhoneNum = $("#targetPhoneNum").val();
            var text = $("#msgText").val();
            messagesHub.server.sendMessage(userPhoneNum, senderPhoneNum, text);
        });


        $("#startGame").click(function () {
            var userName = sessionStorage.getItem("playerName"); //$("#userPhoneNum").val();
            messagesHub.server.connect(userName);

            alert("Waiting for another player...");

            while (!toStart) {

            }

            var name = $("#mazeName").val();
            var rows = $("#rows").val();
            var cols = $("#cols").val();

            $.ajax({
                url: "../api/Maze/StartGame",
                type: "GET",
                data: { name: name, rows: rows, cols: cols },
                async: false
            }).done(function (maze) {
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

                window.document.title = name;
                return false;
            });
            return false;
        });
    });
});