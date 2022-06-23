$(document).ready(function () {
    // ajax request to "/api/user/connected" to know if user if connected
    $.ajax({
        url: "/api/user/get/data",
        type: "GET",
        success: (data) => {
            if (!data.success) {
                connected = false;
                if (window.location.href.split('/').length !== 4) {
                    window.location.href = '/'
                }
            } else {
                let name = data.data.email.split("@")[0];
                document.getElementById("collectorName").textContent = name;

                //Collector Infos
                $.ajax({
                    url: "/api/collector/get/collectorByIdUser/" + data.data.id,
                    type: "GET",
                    success: (dataCollector) => {
                        document.getElementById('vehicule').textContent = "Camion " + dataCollector.data[0].id;
                        document.getElementById('nbCollect').textContent = dataCollector.data[0].tour;
                    }
                });
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