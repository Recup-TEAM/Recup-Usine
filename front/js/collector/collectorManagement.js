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
    html =
      '<div class="overlap-group">' +
      '<div class="logo"></div>' +
      '<h1 class="name-1 valign-text-middle calibri-bold-black-26px">' +
      collector.prenom +
      " " +
      collector.nom +

      " </h1>" +
      //add mail
        '<h5>' +
        collector.email +
        " </h5>" +
      "</div>";
    $("#collector-list").append(html);
  }
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
});
