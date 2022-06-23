$(document).ready(function () {
    // ajax request to "/api/user/connected" to know if user if connected
    $.ajax({
        url: "/api/user/get/connected",
        type: "GET",
        success: (data) => {
            let divConnexion;
            if (!data.connected) {
                connected = false;
                if (window.location.href.split('/').length !== 4) {
                    window.location.href = '/'
                }
            } else {
                let name = data.email.split("@")[0];
                document.getElementById("collectorName").textContent = name;
            }
        }
    });

    // event lister click on knowMoreBtn
    $("#knowMoreBtn").click(function () {
        //redirect to collectorInfo
        window.location.href = "collectorInfo";
    });

    //event listener on initnaryBtn redirects to googlemaps
    $("#itinaryBtn").click(function () {
        console.log("Lien Maps");
    });
});