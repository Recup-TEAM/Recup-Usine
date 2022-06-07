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

  return {
    addCollector() {
      return request_add_collector();
    },
  };
})();
