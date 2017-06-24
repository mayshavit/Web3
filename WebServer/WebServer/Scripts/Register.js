$(document).ready(function () {
    var detailsValidator = false;

    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    detailsValidator = $("#registerForm").validate({
        rules: {
            usrName: "required",
            password: "required",
            passwordValidation: {
                required: true,
                equalTo: "#password"
            },
            email: "required"
        }
    });

    $("#btnRegister").click(function () {
        if (detailsValidator.form()) {
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
                data: dataa,
                async: false
            })
                .done(function (data) {
                    if (data === "Conflict") {
                        alert("This name is already exists. Please choose another name");
                    } else if (data === "Success") {
                        alert("ghgjhgjh");
                        //$.post("../api/Client", dataa);
                        sessionStorage.setItem("playerName", $("#usrName").val());
                        //$("registerForm").load("../Views/HomePage.html");
                        window.location.href = "../Views/HomePage.html";
                        return false;
                    }
                })
                .fail(function (jqXHR, textStatus, err) {
                        alert(err);
                });
        }
        else {
            alert("Please enter your details correctly!");
        }
    });
});