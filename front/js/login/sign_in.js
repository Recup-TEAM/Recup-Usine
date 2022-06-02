// funtion to hash the password
 function hashPassword(password) {
    return md5(password);
}

//function get email and password and send it to the server
function sign_in() {
    var login = $("#email").val();
    var password = $("#password").val();
    logger.sign_in(login, password);
    //logger.sign_in(login, hashPassword(password));
}



$(document).ready(function() {
    //if already logged in, redirect to home page
    $.ajax({
        url: "/api/user/get/connected",
        type: "GET",
        success: function(data) {
            if (data.connected) {
                window.location.href = "/";
            }
        }
    });

    // focus on the email input
    $("#email").focus();

    $(document).on('click', '#connectionButton', function() {
        sign_in();
    });

    // when enter is pressed on the password field
    $(document).on('keypress', '#password', function(e) {
        if (e.which == 13) {
            sign_in();
        }
    });
    
    // when enter is pressed on the email field
    $(document).on('keypress', '#email', function(e) {
        if (e.which == 13) {
            // focus on the password field
            $('#password').focus();
        }
    });

});