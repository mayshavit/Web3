$("#btnRegister").click(function () {
    var dataa = {
        ID: 1,
        UserName: $("#usrName").val(),
        Password: $("#password").val(),
        EMail: $("#email").val(),
        Wins: 0,
        Loses: 0
    };
    $.ajax({
        method: "POST",
        url: "../api/Client",
        data: dataa
    }).done(function () {
            alert("ghgjhgjh");
        });
    //$.post("../api/Client", dataa);
    sessionStorage.setItem("playerName", $("#usrName").val());
    //$("registerForm").load("../Views/HomePage.html");
    window.location.href = "../Views/HomePage.html";
});