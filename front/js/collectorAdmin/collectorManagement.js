all_collectors = [];

//function collector call api_request.addCollector
function getAllCollector(collector) {
  let data = api_request.getAllCollector();
  return data;
}

//function add all collectors to html
function writeToHtml(list_collectors) {
  //reset  id="collector-list"
  $("#collector-list").empty();
  //if list_collectors is empty use all_collectors
  for (let i = 0; i < list_collectors.length; i++) {
    let collector = list_collectors[i];
    html = '<div class="card mb-4 shadow-sm text-center hvr-grow-shadow">'+
            '<div class="card-header">'+
            '<h4 class="my-0 font-weight-normal">'+ collector.prenom + ' ' + collector.nom +  '</h4>'+
                '</div>'+
            '<div class="card-body">'+
            '<p>'+collector.email+ '</p>'+
                '<button type="button" class="btn btn-sm btn-edit cardCollector hvr-shutter-out-vertical" value="' + collector.id_user + '">Editer</button>'+
                '</div>'+
            '</div>';
    $("#collector-list").append(html);
  }

  // listeenr click on cardCollector
  $(".cardCollector").click(function () {
    id = $(this).val();
    console.log("click on cardCollector id=" + id);
    //stock in localstorage
    localStorage.setItem("id_collector", id);
    //redirect to specificCollectorManagement.html
    window.location.href = "specificCollectorManagement";
  });
}

// function researh collector and rewrite html
function searchCollector() {
  console.log("searchCollector");
  let search = $("#search").val();
  let collector_search = [];
  for (let i = 0; i < all_collectors.length; i++) {
    let collector = all_collectors[i];
    // if collector.nom.includes(search) || collector.prenom.includes(search)  or collector.email.includes(search) tolowercase
    if (
      collector.nom.toLowerCase().includes(search) ||
      collector.prenom.toLowerCase().includes(search) ||
      collector.email.toLowerCase().includes(search)
    ) {
      collector_search.push(collector);
    }
  }
  writeToHtml(collector_search);
}

// when document is ready
$(document).ready(function () {
  //get all collector from database
  allCollector = getAllCollector();
  console.log(allCollector);
  for (let i = 0; i < allCollector.data.length; i++) {
    //create a new collector
    let collector = {
      nom: allCollector.data[i].nom,
      prenom: allCollector.data[i].prenom,
      email: allCollector.data[i].email,
      accepted: allCollector.data[i].accepted,
      id_user: allCollector.data[i].id_user,
    };

    if (collector.accepted == 1) {
      // add collector to the list
      all_collectors.push(collector);
    }
  }
  writeToHtml(all_collectors);

  // listener researh
  $("#search").on("keyup", function () {
    searchCollector();
  });

  // when  addCollector button is clicked
  $("#addCollector").click(function () {
    //redirect to addCollector.html
    console.log("addCollector");
    window.location.href = "collectorCreationManagement";
  });
});
