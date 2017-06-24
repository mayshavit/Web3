$(document).ready(function () {
    if (sessionStorage.getItem("playerName") !== null) {
        $("#registerId").text("Hello " + sessionStorage.getItem("playerName") + "!");
        $("#registerId").attr("href", "HomePage.html");
        $("#loginId").text("Log off");
        $("#loginId").attr("href", "HomePage.html");
    }

    $("#loginId").on("click", function () {
        if (sessionStorage.getItem("playerName") !== null)
        {
            sessionStorage.clear();
            window.location.href = "HomePage.html";
        }
    });
});