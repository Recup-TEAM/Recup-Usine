// funtion to hash the password
 function hashPassword(password) {
    return md5(password);
}



$(document).ready(function() {
    $(document).on('click', '#connectionButton', function() {
        var login = $('#email').val();
        var password = $('#password').val();
        logger.sign_in(login, password);
    });


});