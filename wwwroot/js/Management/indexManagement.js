$(document).ready(function () {

    var errorAlertElement = document.getElementById("errorAlertManagement");
    var errorMessage = errorAlertElement.textContent;
    if(errorMessage != ""){
        
        $("#errorAlertManagement").addClass("alert");
        $("#errorAlertManagement").addClass("alert-danger");
        errorAlertElement.style.fontWeight = 400;
    }

});