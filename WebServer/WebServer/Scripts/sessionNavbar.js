$(document).ready(function () {
    if (sessionStorage.getItem("playerName") !== null) {
        $("#registerId").text(sessionStorage.getItem("playerName"));
        $("#registerId").attr("href", "HomePage.html");
        $("#loginId").text("Logout");
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