let logger = (function () {
  function request_signup(entreprise_adresse, email, password, img, entreprise_name, descriptionRegistration) {
    console.log("request_signup\n  - email :" + email + "\n  - password :" + password + "\n  - img :" + img + "\n  - entreprise_name :" + entreprise_name + "\n  - descriptionRegistration :" + descriptionRegistration);
    $.ajax({
      type: "POST",
      url: "/api/user/signup",
      async: false,
      data: {
        email: email,
        password: password,
      },
      success: (data) => {
        console.log("CreateUser :", data);
      },
    });

    // ajax funct to create an entreprise
    $.ajax({
      type: "POST",
      url: "/api/entreprises/add",
      async: false,
      data: {
        name: entreprise_name,
        adresse: entreprise_adresse, 
        img: img,
        descRegister : descriptionRegistration,
      },
      success: (data) => {
        console.log("CreateEntreprise :", data);
      },
    });

    // ajax func add subscription to user (/api/user/update/subscribe)
      $.ajax({
        type: "POST",
        url: "/api/user/update/subscribe",
        async: false,

        success: (data) => {
          console.log("AddSubscription :", data);
          window.location.href = "/";
        }
      });
  }

  // get one enterprise
  function request_load_image(url) {
    let dataSucces;
    $.ajax({
      type: "POST",
      url: "/api/user/update/uploadImage",
      async: false,
      data: {
        url: url,
      },
      success: (data) => {
        dataSucces = data;
      },
    });
    return dataSucces;
  }

  return {
    sign_up(entreprise_adresse, email, password, img, entreprise_name, descriptionRegistration) {
      request_signup(entreprise_adresse, email, password, img, entreprise_name, descriptionRegistration);
    },
    upload_image(url){
      return request_load_image(url);
    }
  };
})();
