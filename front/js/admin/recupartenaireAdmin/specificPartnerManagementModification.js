var current_entreprise, current_user, current_subscription;
// confirmButtonSubscriptionPriceChange
function submit_new_price() {
  // if #newPrice and #confirmNewPrice is the same and not empty

  data = api_request.changeSubscriptionPrice(
    current_subscription.id_subscription,
    $("#newPrice").val()
  );
  if (data.success) {
    // place new price in placeholder
    $("#newPrice").attr("placeholder", $("#newPrice").val() + "€");
    //reset value
    $("#newPrice").val("");
    alert("Le prix a bien été modifié");
  } else {
    alert(data.err);
  }
}

function getOneEntreprise(id) {
  let entreprise = api_request.getOneEntreprise(id);
  $("#nameEntreprise").html(entreprise.data[0].name);
  //console.log(entreprise.data[0].name)
  current_entreprise = entreprise.data[0];
  return entreprise.data[0].id_user;
}

//get user data
function getUserData(user_id) {
  let data = api_request.getUserData(user_id);
  console.log(data);

  // set mail
  $("#email").html(data.data.email);
}

function getUserSubscription(id) {
  let data = api_request.getSubscription(id);
  current_subscription = data.data[0];
  //#subRenouvellement

  if (data.data.length == 0) {
    $("#subRenouvellement").html("Aucune souscription");
  } else {
    console.log(data.data[0]);
    $("#subInfo").html(
      data.data[0].price + "€ (" + data.data[0].subscription_duration + " mois)"
    );

    let dateEnd = new Date(data.data[0].start_date);
    dateEnd.setUTCDate(dateEnd.getDay() + data.data[0].subscription_duration);
    if (dateEnd.getDate() > 30) {
      dateEnd =
        dateEnd.getDate() -
        30 +
        "/" +
        (dateEnd.getMonth() + 1) +
        "/" +
        dateEnd.getFullYear();
    }
    if (dateEnd.getMonth() > 12) {
      dateEnd.setMonth(dateEnd.getMonth() - 12);
      dateEnd.setFullYear(dateEnd.getFullYear() + 1);
    }
    dateEnd =
      dateEnd.getDay() +
      "/" +
      (dateEnd.getMonth() + 1) +
      "/" +
      dateEnd.getFullYear();

    $("#subRenouvellement").html(dateEnd);
  }
  $("#newPrice").attr("placeholder", data.data[0].price + "€");

  /*<option id="bimensuel">Bimensuel</option>
  <option id="mensuel">Mensuel</option>
  <option id="bimestriel">Bimestriel</option>
  <option id="trimestriel">Trimestriel</option>*/
  if (data.data[0].subscription_duration == 30) {
    $("#mensuel").prop("checked", true);
  } else if (data.data[0].subscription_duration == 15) {
    $("#bimensuel").prop("checked", true);
  } else if (data.data[0].subscription_duration == 60) {
    $("#bimestriel").prop("checked", true);
  } else if (data.data[0].subscription_duration == 120) {
    $("#trimestriel").prop("checked", true);
  }
  // refresh periodePicker
  $("#periodePicker").selectpicker("refresh");

  return data;
}

//when the page is loaded
$(document).ready(function () {
  // get the id from localstorage
  let id = localStorage.getItem("id_entreprise");
  if (id == null) {
    window.location.href = "entrepriseManagement";
  }

  user_id = getOneEntreprise(id);
  getUserData(user_id);
  getUserSubscription(user_id);


  //when "enter" is pressed in #confirmNewPrice
  $("#newPrice").on("keyup", function (event) {
    //if enter
    if (event.keyCode == 13) {
      submit_new_price();
    }
  });

  //when click on #confirmButtonSubscriptionPriceChange
  $("#confirmButtonSubscriptionPriceChange").on("click", function (event) {
    submit_new_price();
  });

  //when click on #confirmButtonSubscriptionTypeChange
  $("#confirmButtonSubscriptionTypeChange").on("click", function (event) {
    //prevent refresh
    event.preventDefault();
    // get the value of the radio button id #periodePicker
    let subscription_duration = $("#periodePicker").val()[0];
    // if the value is not empty
    console.log(subscription_duration);
    if (subscription_duration != undefined) {
      // change the subscription duration
      api_request.changeSubscriptionDuration(
        current_subscription.id_subscription,
        subscription_duration
      );
    }})

  // #backButton
  $("#backButton").on("click", function (event) {
    window.location.href = "partnerManagement";
  });
});
