let api_request = (function () {
  function request_add_collector() {
    $.ajax({
      type: "POST",
      url: "/api/collector/add",
      async: false,
      data: {
        nom: $("#name").val(),
        prenom: $("#prenom").val(),
        email: $("#email").val(),
      },
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

function request_get_all_collector() {
  $.ajax({
    type: "GET",
    url: "/api/collector/get/all",
    async: false,
    success: (data) => {
      dataSucces = data;
    },
  });
  return dataSucces;
}

// get one collector
function request_get_one_collector(id) {
  $.ajax({
    type: "GET",
    url: "/api/collector/get/collectorById/" + id,
    async: false,
    success: (data) => {
      dataSucces = data;
    },
  }); 
  return dataSucces;
}

function request_user_id(id) {
  $.ajax({
    type: "GET",
    url: "/api/user/get/userById/" + id,
    async: false,
    success: (data) => {
      dataSucces = data;
    },
  });
  return dataSucces;
}


  return {
    addCollector() {
      return request_add_collector();
    },
    getAllCollector() {
      return request_get_all_collector();
    },
    getOneCollector(id) {
      return request_get_one_collector(id);
    },
    getUserById(id) {
      return request_user_id(id);
    }
  };
})();
