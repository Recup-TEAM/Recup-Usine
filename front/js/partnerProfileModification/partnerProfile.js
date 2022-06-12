function isConnected() {
    data  = api_request.isConnected();
    console.log(data)
    if (data.status == "success") {
        return true;
    } else {
        //redirect /
        //window.location.href = "/";
        console.log("not connected");
        return true;
}}

function getOneEntreprise(id) {
    let data = api_request.getOneEntreprise(id);
    return data;
}

//when the page is loaded
$(document).ready(function() {
    // get id localstorage
    let id = localStorage.getItem("id_entreprise");
    id = 1
    console.log(id);

    isConnected()
    entreprise_data = getOneEntreprise(id);
    id_user = entreprise_data.data[0].id_user;
    console.log(id_user);
    
});