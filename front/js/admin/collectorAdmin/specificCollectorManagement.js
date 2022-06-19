//function collector call api_request.addCollector
function getOneCollector(id) {
    let data = api_request.getOneCollector(id);
    return data;
}

function getUserById(id) {
    let data = api_request.getUserById(id);
    return data;
}



//when document is ready
$(document).ready(function () {
    // get the id from localstorage
    let id = localStorage.getItem("id_collector");
    console.log("id_collector=" + id);
    //if id is  null
    if (id == null) {
        //redirect to collectorManagement.html
        window.location.href = "collectorManagement";
    }
    collector = getOneCollector(id);
    console.log(collector.data[0]);
    $("#name").html(collector.data[0].nom + " " + collector.data[0].prenom);
    $("#prenom").html(collector.data[0].prenom);
    $("#email").html(collector.data[0].email);
    //tour
    $("#nbrCollect").html(collector.data[0].tour);

    //user = getUserById(id);

    dateEnd = new Date(collector.data[0].registerDate);
    dateEnd.setUTCDate(dateEnd.getDay() + data.data[0].subscription_duration);
    if (dateEnd.getDate() > 30) {
      dateEnd.setDate(dateEnd.getDate() - 30);
      dateEnd.setMonth(dateEnd.getMonth() + 1);
    }

    if (dateEnd.getMonth() > 12) {
      dateEnd.setMonth(dateEnd.getMonth() - 12);
      dateEnd.setFullYear(dateEnd.getFullYear() + 1);
    }
    dateEnd =
      dateEnd.getDay() +
      "/" +
      (dateEnd.getMonth()) +
      "/" +
      dateEnd.getFullYear();

    $("#dateInscri").html(dateEnd);



    //listenner click on button back
    $("#back").click(function () {
        window.location.href = "collectorManagement";
    });

    //listenner click on button deleteDontGoBackOnThatDecision
    $("#deleteDontGoBackOnThatDecision").click(function () {
        console.log("deleteDontGoBackOnThatDecision");
        //delete collector
        let data = api_request.deleteCollector(id);
        console.log(data);
        console.log(data.data);
        if (data.success == true) {
            //redirect to collectorManagement.html
            window.location.href = "collectorManagement";
        }
    });
    
    // cursor pointer on button deleteDontGoBackOnThatDecision  
    $("#deleteDontGoBackOnThatDecision").css("cursor", "pointer");

});