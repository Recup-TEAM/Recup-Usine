var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};





function changePassword() {
  if (
    $("#new-confirm-password").val() == $("#new-password").val() &&
    isValidPassword($("#new-confirm-password").val())
  ) {
    data = api_request.reset_change_password_user();
    console.log(data);
    if (data.success) {
      $("#new-confirm-password").val("");
      $("#new-password").val("");
      alert("Votre mot de passe a bien été modifié");
    } else {
      alert("L'ancien mot de passe est incorrect. (" + data.err + ")");
    }
  } else {
    alert(
      "Votre mot de passe n'est pas valide ou les deux mots de passe ne correspondent pas."
    );
  }
}

function isValidPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/;
  console.log(re.test(String(password)));
  return re.test(String(password));
}

//when the page is loaded
$(document).ready(function () {
    id_user = getUrlParameter('id_user');
    temp_pswd = getUrlParameter('temp_pswd');
    console.log(id_user, temp_pswd);    


  //when enter in new-password
  $("#new-password").keypress(function (e) {
    //focus on new-confirm-password
    //if enter
    if (e.which == 13) {
      //prevent
      e.preventDefault();
      $("#new-confirm-password").focus();
    }
  });
  //when enter in new-confirm-password
  $("#new-confirm-password").keypress(function (e) {
    //if enter
    if (e.which == 13) {
      //prevent
      e.preventDefault();
      changePassword();
    }
  }); 

  //#letsgojemeco prevent & call changePassword
  $("#letsgojemeco").click(function (e) {
    e.preventDefault();
    changePassword();
  });
});
