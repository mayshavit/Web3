var mazeData;
var startRow;
var startCol;
var exitRow;
var exitCol;
//var playerRow;
//var playerCol;
var playerImage;
var exitImage;
var rows;
var boardEnable;
var cols;
//var ctx;
var rectWidth;
var rectHeight;
var toMove;


jQuery(function ($) {


    $.fn.mazeBoard = function (mazeData2, startRow2, startCol2,
        exitRow2, exitCol2, playerImage2, exitImage2, boardEnable2, rows2, cols2, ctx2) {
        //alert("jq");
        mazeData = mazeData2;
        startRow = startRow2;
        startCol = startCol2;
        exitRow = exitRow2;
        exitCol = exitCol2;
        playerImage = playerImage2;
        exitImage = exitImage2;
        boardEnable = boardEnable;
        rows = rows2;
        cols = cols2;
        var ctx = ctx2;
        toMove = true;
        var playerRow = startRow2;
        var playerCol = startCol2;
        //var canvasName = canvasName2;
        var rectWidth;
        var rectHeight;

        var drawCanvasImage = function (ctx, playerImage, x, y, width, height) {
            return function () {
                ctx.drawImage(playerImage, x, y, width, height);
            }
        }
        this.move = function (direction) {
            if (toMove) {
                var row = playerRow; //startRow;
                var col = playerCol; //startCol;

                //return function () {
                switch (direction) {
                    case "left":
                        //startCol--;
                        col--;
                        break;
                    case "right":
                        //startCol++;
                        col++;
                        break;
                    case "up":
                        //startRow++;
                        row++;
                        break;
                    case "down":
                        //startRow--;
                        row--;
                        break;
                    default:
                        break;
                }


                if ((row < 0) || (col < 0) || (row > rows - 1) || (col > cols - 1)) {
                    return;
                }
                if (mazeData[row * rows + /*startCol*/ playerCol] == 0) {
                    ctx.clearRect(/*startCol*/ playerCol * rectHeight, (rows - /*startRow*/ playerRow - 1) * rectWidth, rectHeight, rectWidth);
                    ctx.strokeRect(/*startCol*/ playerCol * rectHeight, (rows - /*startRow*/ playerRow - 1) * rectWidth, rectHeight, rectWidth);
                    //this.ctx.drawImage(playerImage, startRow * rectWidth, startCol * rectHeight, rectWidth, rectHeight);
                    //playerImage.onload = drawCanvasImage(ctx, playerImage, startCol * rectHeight, (rows - startRow - 1) * rectWidth, rectHeight, rectWidth);
                    ctx.drawImage(playerImage, col * rectHeight, (rows - row - 1) * rectWidth, rectHeight, rectWidth);

                    /*startRow*/ playerRow = row;
                    /*startCol*/ playerCol = col;
                    if ((row == exitRow) && (col == exitCol)) {
                        toMove = false;
                        return "win";
                    }
                    return this;
                }
            }
            //}
        }

        this.solve = function (solution) {
            var i;
            var j = 0;
            var moveFunction = this.move;

            ctx.clearRect(playerCol * rectHeight, (rows - playerRow - 1) * rectWidth, rectHeight, rectWidth);
            ctx.strokeRect(playerCol * rectHeight, (rows - playerRow - 1) * rectWidth, rectHeight, rectWidth);
            ctx.drawImage(playerImage, startCol * rectHeight, (rows - startRow - 1) * rectWidth, rectHeight, rectWidth);
            playerRow = startRow;
            playerCol = startCol;
            for (i = 0; i < solution.length; i++) {
                setTimeout(function () {
                    //this.move
                    moveFunction(solution[j]);
                    j++;
                }, (i + 1) * 250);

                /*setTimeout(/*function () {
                    this.move({
                        direction: solution[0]
                    });
                    //this.move(solution[0])
                } this.move(solution[0]), (0 + 1) * 2000);*/
                //setTimeout(this.move(solution[1]), 2000);

            }
            return this;
        }

        this.each(function () {
            rectWidth = $(this).width() / rows;
            rectHeight = $(this).height() / cols;
            var i = 0;
            var j = 0;

            //this.element = document.createElement('canvas');



            //this.context = this.element.getContext("2d");

            /*var canvas = document.createElement('canvas');
            $(canvas)
                .attr('id', "mazeBoard")
                //.text('unsupported browser')
                .width($(this).width())
                .height($(this).height());
                //.appendTo(location);
            //this.context = this.element.getContext("2d");
            //var canvas = $(this);
            var ctx = canvas.getContext("2d");*/

            ctx.fillStyle = "#000000";
            for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    if (mazeData[i * rows + j] == 1) {
                        //ctx.fillRect()
                        ctx.fillRect(j * rectHeight, (rows - i - 1) * rectWidth, rectHeight, rectWidth);
                    } else if (mazeData[i * rows + j] == 0) {
                        ctx.strokeRect(j * rectHeight, (rows - i - 1) * rectWidth, rectHeight, rectWidth);
                    }
                }
            }

            playerImage.onload = drawCanvasImage(ctx, playerImage, startCol * rectHeight, (rows - startRow - 1) * rectWidth, rectHeight, rectWidth);
            exitImage.onload = drawCanvasImage(ctx, exitImage, exitCol * rectHeight, (rows - exitRow - 1) * rectWidth, rectHeight, rectWidth);
            //ctx.drawImage(playerImage, startCol * rectHeight, (rows - startRow - 1) * rectWidth, rectHeight, rectWidth);
            //ctx.drawImage(exitImage, exitCol * rectHeight, (rows - exitRow - 1) * rectWidth, rectHeight, rectWidth);
            //ctx.drawImage(playerImage, startRow * rectWidth, startCol * rectHeight, rectWidth, rectHeight);
            //ctx.drawImage(exitImage, exitRow * rectWidth, exitCol * rectHeight, rectWidth, rectHeight);
            /*for (i = 0; i < rows; i++) {
                for (j = 0; j < cols; j++) {
                    if (mazeData[i * rows + j] == 1) {
                        ctx.fillRect(460 + i * rectWidth, 100 + j * rectHeight, rectWidth, rectHeight);
                    }
                }
            }*/

            //return this;
        });

        /*$.fn.move = function (direction) {
            switch (direction) {
                case "left":
                    startCol--;
                    break;
                case "right":
                    startCol++;
                    break;
                case "up":
                    startRow++;
                    break;
                case "down":
                    startRow--;
                    break;
                default:
                    break;
            }
            if ((startRow < 0) || (startCol < 0) || (startRow > this.rows - 1) || (startCol > this.cols - 1)) {
                return;
            }
            if (this.mazeData[startRow * rows + startCol] == 0) {

                //this.ctx.drawImage(playerImage, startRow * rectWidth, startCol * rectHeight, rectWidth, rectHeight);
                playerImage.onload = drawCanvasImage(ctx, playerImage, startCol * rectHeight, (rows - startRow - 1) * rectWidth, rectHeight, rectWidth);
                return this;
            }
        };*/
        return this;
    };

});