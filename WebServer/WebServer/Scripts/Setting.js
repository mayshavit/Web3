var defualtSettings;
var algoMap = new Array();
algoMap[0] = "BFS";
algoMap[1] = "DFS";
$(document).ready(function () {
    // if its first time to define settings.
    if (localStorage.getItem("mazeParameters") === null) {
        defualtSettings = {
            firstAlgo: 0,
            secondAlgo: 1,
            rows: "3",
            cols: "3"
        };
    }
    else {
        defualtSettings = JSON.parse(localStorage.getItem("mazeParameters"))
    }
    // put values in text boxes.
    document.getElementById("rowsId").value = defualtSettings.rows;
    document.getElementById("colsId").value = defualtSettings.cols;
    $('#algoSelection').append($('<option>', {
        value: defualtSettings.firstAlgo,
        text: algoMap[defualtSettings.firstAlgo],
    }));
    $('#algoSelection').append($('<option>', {
        value: defualtSettings.secondAlgo,
        text: algoMap[defualtSettings.secondAlgo],
    }));

    // after hitting submit.
    $("#mazeForm").submit(function () {
        defualtSettings = {
            firstAlgo: $("#algoSelection").val(),
            rows: $("#rowsId").val(),
            cols: $("#colsId").val()
        };
        defualtSettings.secondAlgo = 1 - defualtSettings.firstAlgo;
        localStorage.setItem("mazeParameters", JSON.stringify(defualtSettings));
    });
});
