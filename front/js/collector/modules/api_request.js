let api_request = (function () {
    function request_change_mail_user(email) {
        let dataSucces;
        console.log("Changement de mail");
        $.ajax({
            type: "POST",
            url: "/api/user/update/changeMail",
            async: false,
            data: {
                newMail: email,
            },
            success: (data) => {
                console.log("succes:", data);
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    function request_change_password_user() {
        console.log("Changement de mot de passe");
        let dataSucces;
        $.ajax({
            type: "POST",
            url: "/api/user/update/changePassword",
            async: false,
            data: {
                oldPassword: $("#oldpassword").val(),
                newPassword: $("#newPassword").val(),
            },
            success: (data) => {
                console.log(data);
                dataSucces = data;
            },
        });
        return dataSucces;
    }
    function request_reset_change_password_user() {
        console.log("Changement de mot de passe");
        let dataSucces;
        $.ajax({
            type: "POST",
            url: "/api/user/update/resetPassword/",
            async: false,
            data: {
                password: $("#new-password").val(),
                id_user: getUrlParameter("id_user"),
                temp_pswd: getUrlParameter("temp_pswd"),
            },
            success: (data) => {
                console.log(data);
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    function request_isconnected() {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/user/get/connected",
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    function request_getUserById(id) {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/user/get/userById/" + id,
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    // get products by entreprise id
    function request_getProductsByEntrepriseId(id) {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/products/get/allProductsFrom/" + id,
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    // is c
    function request_isconnected() {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/user/get/connected",
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    // get all enterprise
    function request_getAllCollector() {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/entreprises/get/allEntreprises",
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    // get user
    function request_getUserData(user_id) {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/user/get/userById/" + user_id,
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    function request_getUserData() {
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/user/get/data/",
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }

    // /api/collector/get/getItinaryByCollectorId/:id
    function request_getItinaryByCollectorId(id) {
        console.log("getItinaryByCollectorId", id);
        let dataSucces;
        $.ajax({
            type: "GET",
            url: "/api/collector/get/getItinaryByCollectorId/" + id,
            async: false,
            success: (data) => {
                dataSucces = data;
            },
        });
        return dataSucces;
    }


    return {
        isConnected() {
            return request_isconnected();
        },
        getAllCollector() {
            return request_getAllCollector();
        },
        //get user data
        getUserData(user_id) {
            return request_getUserData(user_id);
        },
        getUserData() {
            return request_getUserData();
        },
        isConnected() {
            return request_isconnected();
        },
        change_mail_user(email) {
            return request_change_mail_user(email);
        },
        change_password_user() {
            return request_change_password_user();
        },
        getUserById(id) {
            return request_getUserById(id);
        },
        getProductsByEntrepriseId(id) {
            return request_getProductsByEntrepriseId(id);
        },
        reset_change_password_user() {
            return request_reset_change_password_user();
        },
        // request_getItinaryByCollectorId
        getItinaryByCollectorId(id) {
            return request_getItinaryByCollectorId(id);
        }

    };
})();
