var map_link;

// parseDataCollect
function parseDataCollect(data) {
    list_waypoints = data[0].list_waypoints.split(",");
    // tojson
    duration = data[0].duration;
    distance = data[0].distance;
    $("#duration").text(duration);
    $("#distance").text(distance);
    $("#nbStop").text(list_waypoints.length);
    map_link = data[0].map_link;
   
}


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
                console.log("jse");

                //Collector Infos
                $.ajax({
                    url: "/api/collector/get/collectorByIdUser/" + data.data.id,
                    type: "GET",
                    success: (dataCollector) => {
                        console.log(dataCollector);
                        id_collector = dataCollector.data[0].id;
                        document.getElementById('vehicule').textContent = "Camion " + dataCollector.data[0].id;
                        document.getElementById('nbCollect').textContent = dataCollector.data[0].tour;
                         dataCollect = api_request.getItinaryByCollectorId(id_collector);
                         console.log(data);
                          if(dataCollect.success){
                            parseDataCollect(dataCollect.data);
                          }

                    }//Ce rêve bleu

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
        window.location.href = map_link;
    });
});