let logger = (function(){

    function request_connexion(email, password) {
        console.log(email + ' essaye de se connecter');
        $.ajax({
            type: "POST",
            url: "/user/login/",
            data: {
                email: email,
                password: password
            },
            success: () => {
                window.location.href = "/";
            }


        });
    }

    function request_incription(email, password) {
        console.log(email + ' essaye de se connecter');
        $.ajax({
            type: "POST",
            url: "/user/signup/",
            data: {
                email: email,
                password: password
            },
            success: () => {
                window.location.href = "/";
            }
        });
    }

    return {
        connexion(email, password) {
            request_connexion(email, password);
        },
        inscription( email, password) {
            request_incription( email, password);
        }
    }
})();