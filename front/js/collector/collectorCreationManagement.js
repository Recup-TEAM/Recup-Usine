//function addCollector call api_request.addCollector
function addCollector(collector) {
  let data = api_request.addCollector();
  console.log(data);
if (data.success == true) {
    alert("collector ajouté avec succès");
}
else {
    alert(data.err);
}}


// when document is ready
$(document).ready(function() {

    // listerner when enter is pressed on name to prenom
    $("#name").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#prenom").focus();
        }
    });

    // listerner when enter is pressed on prenom to email
    $("#prenom").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#email").focus();
        }
    });

    // listerner when enter is pressed on email to execute the function
    $("#email").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            addCollector();
        }
    });

    // when submit button is clicked
    $("#buttonSubmit").click(function(event) {
        event.preventDefault();
        addCollector();
    });

    // cursor pointer on buttonSubmit
    $("#buttonSubmit").css("cursor", "pointer");

});