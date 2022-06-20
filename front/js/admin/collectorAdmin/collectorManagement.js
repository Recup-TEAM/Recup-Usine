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
    html =  '<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">\n' +
            '<div class="card mb-4 shadow-sm text-center hvr-grow-shadow">'+
            '<div class="card-header">'+
            '<h5 class="card-title font-weight-normal">'+ collector.prenom + ' ' + collector.nom +  '</h5>'+
                '</div>'+
            '<div class="card-body">'+
            '<p>'+collector.email+ '</p>'+
                '<button type="button" class="btn btn-sm btn-edit cardCollector hvr-shutter-out-vertical" value="' + collector.id + '">Editer</button>'+
                '</div>'+
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



function searchCollector()  {
  let search = $("#search").val();
  let collector_search = [];
  for (let i = 0; i < all_collectors.length; i++) {
    let collector = all_collectors[i];
    // if collector.nom.includes(search) || collector.prenom.includes(search)  or collector.email.includes(search) tolowercase
    if (
      collector.nom.toLowerCase().includes(search.toLowerCase()) ||
      collector.prenom.toLowerCase().includes(search.toLowerCase()) ||
      collector.email.toLowerCase().includes(search.toLowerCase())
    ) {
      collector_search.push(collector);
    }
  }
  writeToHtml(collector_search);
}


// when document is ready
$(document).ready(function () {
  $.ajax({
    url: "/api/user/get/compteLevel",
    type: "GET",
    success: (data) => {
      console.log(data);
      if (!data.success) {
        connected = false;
        window.location.href = "/";
      }
      else {
      if(data.data.compteLevel !=2 ){
          console.log("compteLevel is false");
          admin = false;
          window.location.href = "/";
        }
      }
    }
  });



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
      id: allCollector.data[i].id,
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

  // #search
  $("#search").keyup(function () {
    searchCollector();
  }
  );
});
