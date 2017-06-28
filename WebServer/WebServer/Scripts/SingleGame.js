$(document).ready(function ($) {
    /*$.getJSON("../api/Maze/GenerateMaze" + "/maze/" + 9 + "/" + 9).done(function (data) {

    });*/
    var myMazeBoard;

    $("#startGame").click(function () {
        var name = $("#mazeName").val();
        var rows = $("#rows").val();
        var cols = $("#cols").val();

        $.ajax({
            url: "../api/Maze/Generate",
            type: "GET",
            data: { name: name, rows: rows, cols: cols },
            async: false
        }).done(function (maze) {
            //alert("7678678865");
            var mazeData = maze.Maze;
            var startRow = maze.Start.Row;
            var startCol = maze.Start.Col;
            var exitRow = maze.End.Row;
            var exitCol = maze.End.Col;
            var playerImage = new Image();
            playerImage.src = "../Views/Images/minion.jpg";
            var exitImage = new Image();
            exitImage.src = "../Views/Images/banana.jpg";

            var canvas = document.getElementById("mazeCanvas");
            var ctx = canvas.getContext("2d");
            //ctx.fillStyle = "#000000";
            //ctx.fillRect(0, 0, 150, 75);
            //$("#mazeCanvas").getContext("2d");

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
                ctx);

            /*rectWidth = $("#mazeCanvas").width() / cols;
            rectHeight = $("#mazeCanvas").height() / rows ;
            ctx.fillStyle = "#000000";
            for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    if (mazeData[i * rows + j] == 1) {
                        ctx.fillRect(i * rectWidth, j * rectHeight, rectWidth, rectHeight);
                    } else if (mazeData[i * rows + j] == 0) {
                        ctx.strokeRect(i * rectWidth, j * rectHeight, rectWidth, rectHeight);
                    }
                }
            }*/
            $("#title").val(name);
            window.document.title = name;
            return false;

        })
            .fail(function () {
                alert("bhjjhvgghcxcfgxdzdzxdxxcxfcg");
            });

        return false;
    });

    $("#solveGame").click(function () {
        var name = window.document.title;
        var algorithm;
        switch ($("#searchAlgo").val()) {
            case "BFS":
                algorithm = 0;
                break;
            case "DFS":
                algorithm = 1;
                break;
            default:
                break;
        }
        $.ajax({
            url: "../api/Maze/Solve",
            type: "GET",
            data: { name: name, algorithm: algorithm },
            async: false
        }).done(function (solution) {
            myMazeBoard.solve(solution);
            return false;
        });
        return false;
    });
    /*$(document).on('keypress', function (e) {
        var tag = e.target.tagName.toLowerCase();
        if (e.which === 119 && tag != 'input' && tag != 'textarea')
            doSomething();
    });*/

    $(document).keydown(function (e) {
        // verifying that a game has been started
        //if ($('#mazeCanvas').css('visibility') == 'visible') {
        //move(e);
        //if (e.type == "keydown") {
        var direction;
        switch (e.keyCode) {
            case 37:
                direction = "left";
                break;
            case 38:
                direction = "up";
                break;
            case 39:
                direction = "right";
                break;
            case 40:
                direction = "down";
                break;
            default:
                return;
                break;
        };
        myMazeBoard.move(direction);
        //}

        //}

    });

});