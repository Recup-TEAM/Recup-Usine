var all_entreprise = [];
//function get all enterprise
function getAllEnterprise() {
    data = api_request.getAllEnterprise()
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        all_entreprise.push(data[i]);
    }
    pushToHtml(all_entreprise);
}

// function push to html
function pushToHtml(data) {
    /* html = <div class="overlap-group">
            <div class="logo"></div>
            <h1 class="name valign-text-middle calibri-bold-black-26px">Nom de l’entreprise</h1>
        </div>//*/
    for (let i = 0; i < data.length; i++) {
        let entreprise = data[i];
        html = '<div class="overlap-group cardEntreprise" id="' + entreprise.id_entreprise + '">' +
            '<div class="logo"></div>' +
            '<h1 class="name-1 valign-text-middle calibri-bold-black-26px">' +
            entreprise.nom +
            " " +
            entreprise.prenom +
            " </h1>" +
            //add mail
            '<h5>' +
            entreprise.email +
            " </h5>" +
            "</div>";
        $("#entreprise-list").append(html);
    }

    // listeenr click on cardEntreprise
    $(".cardEntreprise").click(function () {
        id = $(this).attr("id");
        console.log("click on cardEntreprise id=" + id);
        //stock in localstorage
        localStorage.setItem("id_entreprise", id);
        //redirect to specificEntrepriseManagement.html
        //window.location.href = "specificEntrepriseManagement";
    });
}

// is connected
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

// when the page is loaded
$(document).ready(function() {
    // if user is connected
    if (isConnected()) {
        getAllEnterprise();
    }
});