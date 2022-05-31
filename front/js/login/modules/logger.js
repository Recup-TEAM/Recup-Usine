let logger = (function(){

    function request_login(email, password) {
        console.log(email + ' essaye de se connecter');
        $.ajax({
            type: "POST",
            url: "/user/login/",
            data: {
                email: email,
                password: password
            },
            success: () => { window.location.href = "/"; }
        });
    }

    function request_signup(email, password) {
        console.log(email + ' essaye de se connecter');
        $.ajax({
            type: "POST",
            url: "/user/signup/",
            data: {
                email: email,
                password: password
            },
            success: () => { window.location.href = "/"; }
        });
    }

    return {
        login(email, password) {
            request_login(email, password);
        },

        sign_up( email, password) {
            request_signup( email, password);
        }
    }
})();