var current_entreprise, current_user, current_subscription;
// confirmButtonSubscriptionPriceChange
function submit_new_price() {
    // if #newPrice and #confirmNewPrice is the same and not empty
    if ($("#newPrice").val() == $("#confirmNewPrice").val() && $("#newPrice").val() != "") {
        data = api_request.changeSubscriptionPrice(current_subscription.id_subscription, $("#newPrice").val());
        if (data.success) {
        // place new price in placeholder
        $("#newPrice").attr("placeholder", $("#newPrice").val() + "€");
        $("#confirmNewPrice").attr("placeholder", $("#newPrice").val() + "€");
        //reset value
        $("#newPrice").val("");
        $("#confirmNewPrice").val("");
        alert("Le prix a bien été modifié");    
        }
        else {
            alert(data.err)
        }
    }
}

function getOneEntreprise(id) {
  let entreprise = api_request.getOneEntreprise(id);
  $("#name").html(entreprise.data[0].name);
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
  // set date inscription
  let dateEnd = new Date(data.data.registerDate);
  //format date to dd/mm/yyyy
  dateEnd = dateEnd.getDate() + "/" + (dateEnd.getMonth() + 1) + "/" + dateEnd.getFullYear();
  $("#dateInscri").html(dateEnd);

  if (data.data.compte_level == 0) {
    $("#subscription").html("Utilisateur");
  } else if (data.data.compte_level == 1) {
    $("#subscription").html("Récupartner");
  } else {
    $("#subscription").html("Compte de type : " + data.data.compte_level);
  }
}

// get subscription data
function getUserSubscription(user_id) {
  let data = api_request.getUserSubscription(user_id);
  console.log(data);
  current_subscription = data.data[0];


  let dateEnd = new Date(data.data[0].start_date);
  dateEnd.setUTCDate(dateEnd.getDay() + data.data[0].subscription_duration);
  if (dateEnd.getDate() > 30) {
    dateEnd = dateEnd.getDate() - 30 + "/" + (dateEnd.getMonth() + 1) + "/" + dateEnd.getFullYear();
  }
  if (dateEnd.getMonth() > 12) {
    dateEnd.setMonth(dateEnd.getMonth() - 12);
    dateEnd.setFullYear(dateEnd.getFullYear() + 1);
  }
  dateEnd = dateEnd.getDay() + "/" + (dateEnd.getMonth() + 1) + "/" + dateEnd.getFullYear();

  $("#subscriptionDate").html(dateEnd);

  if (data.data[0].subscription_duration == 1) {
    $("#daily").prop("checked", true);
  } else if (data.data[0].subscription_duration == 7) {
    $("#hebdo").prop("checked", true);
  } else if (data.data[0].subscription_duration == 14) {
    $("#bimensuel").prop("checked", true);
  } else if (data.data[0].subscription_duration == 30) {
    $("#monthly").prop("checked", true);
  } else {
    $("#annuel").prop("checked", true);
  }

  //set price in placeholder #newPrice and #confirmNewPrice
    $("#newPrice").attr("placeholder", data.data[0].price+ "€");
    $("#confirmNewPrice").attr("placeholder", data.data[0].price) + "€";
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

  // when enter in #newPrice
    $("#newPrice").on("keyup", function (event) {
        //focus on #confirmNewPrice
        if (event.keyCode == 13) {
        $("#confirmNewPrice").focus();
        }
    });

 //when "enter" is pressed in #confirmNewPrice
    $("#confirmNewPrice").on("keyup", function (event) {
        //if enter
        if (event.keyCode == 13) {
        submit_new_price();
        }
    });

    //when click on #confirmButtonSubscriptionPriceChange
    $("#confirmButtonSubscriptionPriceChange").on("click", function (event) {
        submit_new_price();
    });


    // #backButton
    $("#backButton").on("click", function (event) {
        window.location.href = "partnerManagement";
        });
});
