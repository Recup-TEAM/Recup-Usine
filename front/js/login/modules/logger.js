let logger = (function(){

    function postLog(email, password) {
        console.log(email + ' se connecte');
        $.ajax({
            type: "POST",
            url: "/login/",
            data: {
                email: email,
                password: password
            },
            success: () => {
                window.location.href = "/";
            },
        });
    }

    function postInsc(email, password) {
        console.log(email + ' se connecte');
        $.ajax({
            type: "POST",
            url: "/signup/",
            data: {
                email: email,
                password: password
            },
            success: () => {
                window.location.href = "/";
            },
        });
    }

    return {
        connexion(email, password) {
            postLog(email, password);
        },
        inscription( email, password) {
            postInsc( email, password);
        }
    }
})();