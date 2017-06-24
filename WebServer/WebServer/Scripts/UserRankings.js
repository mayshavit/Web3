$(document).ready(function () {
    var apiUrl = "../api/Client/Rankings";
    // Send an AJAX request
    /*$.ajax({
        method: "GET",

    })*/
    $.getJSON(apiUrl).done(function (data) {
        //alert("...........................")
        var i = 1;
        data.forEach(function (user) {
            // Add a list item for the product
            /*$("<li>" + user.UserName + ": Wins:" + user.Wins
                + ": Loss:" + user.Loses + "</li>").appendTo("#lstRankings");*/
            $("<tr><td>" + i + "</td><td>" + user.UserName + "</td><td>" + user.Wins +
                "</td><td>" + user.Loses + "</td></tr>").appendTo("#rankingsTable");
            i++;
        });
    })
        .fail(function() {
        alert("nnmnmn");
    });
});