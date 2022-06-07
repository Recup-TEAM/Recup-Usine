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
    id = 1
    collector = getOneCollector(id);
    console.log(collector.data[0]);
    $("#name").html(collector.data[0].nom);
    $("#prenom").html(collector.data[0].prenom);
    $("#email").html(collector.data[0].email);
    //tour
    $("#nbrCollect").html(collector.data[0].tour);

    user = getUserById(id);
    //#dateInscri = Date : user.registerDate
   dateEnd = new Date(user.data.registerDate);
    //format date to dd/mm/yyyy
    dateEnd = dateEnd.getDate() + "/" + (dateEnd.getMonth() + 1) + "/" + dateEnd.getFullYear();

    $("#dateInscri").html(dateEnd);




});