$(document).ready(function () {
    var apiUrl = "api/Client";
    // Send an AJAX request
    $.getJSON().done(function (data) {
        data.forEach(function (user) {
            // Add a list item for the product
            $("<li> " + user.UserName + ": Wins:" + user.Wins
                + ": Loss:" + user.Loses + "</li> ").appendTo("#lstRankings");
        });
    })
        .fail(function() {
        alert("nnmnmn");
    });
});