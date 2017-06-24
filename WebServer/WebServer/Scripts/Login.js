$(document).ready(function () {
    $("#loginForm").submit(function () {
        var username = $("#usernameId").val();
        var password = $("#passwordId").val();
        if (username == "" || password == "") {
            alert("you have to fill username and password");
        }
        else {
            try {
                $.ajax({
                    type: "GET",
                    url: "/../api/Client",
                    data: { id: username, password: password },
                    async: false,
                    success: function (data) {
                        if (data == "notFound") {
                            alert("wrong username or password");
                        }
                        else {
                            sessionStorage.setItem("playerName", username);
                            window.location.href = "HomePage.html";
                        }
                    },
                    Error: function (errorMess) {
                        alert("Error");
                    }
                });
            }
            catch (exeptionMess) {
                alert("priblem in ajax");
            }
            return false;
        }
    });
});