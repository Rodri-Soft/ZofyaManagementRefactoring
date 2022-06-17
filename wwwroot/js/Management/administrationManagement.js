var urlServer = "https://localhost:7004";

let sidebarToggle = document.querySelector(".sidebarToggle");
sidebarToggle.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
    document.getElementById("sidebarToggle").classList.toggle("active");
});


function setAdministratorUpdateInformation(userEmail) {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#personalButton").addClass("active");
    $('#pageContent').empty();

    $("#pageContent").html(`

        <div class="text-center mb-3">
            <h3 class="brand-zofya brand-zofya-logo">Update</h3>
        </div>
        <h6 style="color: #e2504c;">•Please select the field you want to update</h6>
        <table id="administratorTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Personal information</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">RFC</th>
                    <td id="rfcRow"></td>
                </tr>
                <tr>
                    <th scope="row">CURP</th>
                    <td id="curpRow"></td>
                </tr>
                <tr>
                    <th scope="row">Email</th>
                    <td id="emailRow"></td>
                </tr>
                <tr>
                    <th scope="row">Fullname</th>
                    <td id="fullnameRow"></td>
                </tr>
                <tr>
                    <th scope="row">Password</th>
                    <td>********</td>
                </tr>
                <tr>
                    <th scope="row">Phone</th>
                    <td id="phoneRow"></td>
                </tr>
            </tbody>
        </table>
    `);

    administratorTable = $('#administratorTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        columns : [            
            {"data": "field"},
            {"data": "value"}
        ] 
    });

    loadData(userEmail);

    $("#administratorTable tbody").on("click", "tr", function () {
    
        var informationRow = administratorTable.row(this).data();                
        
        switch (informationRow.field) {

            case 'RFC':            
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "RFC";
                document.getElementById("updateNewLabel").innerHTML = "New RFC:";
                $("#updateFormFooter").html(`

                    <button type="button" class="btn btn-primary" id="updateButton" onclick="updateRFC();">Save RFC</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);             

                validateField(validateRFC);
                break;

            case 'CURP':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "CURP";
                document.getElementById("updateNewLabel").innerHTML = "New CURP:";
                $("#updateFormFooter").html(`

                    <button onclick="updateCURP();" type="button" class="btn btn-primary"
                     id="updateButton">Save CURP</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateCURP);
                break;

            case 'Email':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Email";
                document.getElementById("updateNewLabel").innerHTML = "New Email:";
                $("#updateFormFooter").html(`

                    <button onclick="updateEmail();" type="button" class="btn btn-primary" 
                        id="updateButton">Save Email</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateEmail);
                break;

            case 'Fullname':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Fullname";
                document.getElementById("updateNewLabel").innerHTML = "Fullname:";
                $("#updateFormFooter").html(`

                    <button onclick="updateFullname();" type="button" class="btn btn-primary"
                        id="updateButton">Save Fullname</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);
                
                validateField(validateFullName);
                break;

            case 'Password':

                clearUpdatePasswordForm();
                $('#updateDialogPassword').modal('show');                

                $("#updateFormFooterPassword").html(`

                    <button onclick="updatePassword();" type="button" class="btn btn-primary" id="updatePasswordButton">Save Password</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="hideUpdateModalPassword();">Close</button>
                
                `);

                validatePasswordField(validatePassword);
                break;

            case 'Phone':
                
                clearUpdateForm();
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Phone";
                document.getElementById("updateNewLabel").innerHTML = "New Phone:";
                $("#updateFormFooter").html(`

                    <button onclick="updatePhone(); return false;" type="button" class="btn btn-primary"
                        id="updateButton">Save Phone</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);
                
                validateField(validatePhone);
                break;

            default:                
                break;
        } 
    });
}

var staffInformation;
function loadData(userEmail) {        

    var IDResult = {
        "id" : userEmail
    };   

    $.ajax({

        method: "POST",
        url: urlServer+"/PostFindStaffEmail",
        cache: false,
        processData: false,
        contentType: "application/json",                    
        data: JSON.stringify(IDResult)

    }).done(function (data) {
        
        staffInformation = data;               
        console.log(staffInformation);
        loadStaffDataTable(staffInformation);
    });
} 

function loadStaffDataTable(staffInformation) {      

    $("#rfcRow").html(staffInformation.rfc);
    $("#curpRow").html(staffInformation.curp);
    $("#emailRow").html(staffInformation.email);
    $("#fullnameRow").html(staffInformation.fullName);
    $("#phoneRow").html(staffInformation.phone);

}

function validateField(validateFunction) {

    $("#updateInput").keydown(function (event) {
        validateFunction();
    });
    $("#updateInput").keyup(function (event) {
        validateFunction();
    });
    $("#updateInput").blur(function (event) {
        validateFunction();
    });
}

function validatePasswordField(validateFunction) {

    $("#updateInputNewPassword").keydown(function (event) {
        validateFunction();
    });
    $("#updateInputNewPassword").keyup(function (event) {
        validateFunction();
    });
    $("#updateInputNewPassword").blur(function (event) {
        validateFunction();
    });
}

function validateRFC() {

    var newRFC = $("#updateInput").val();

    const rfcMaxLength = 13;
    var isCorrect = true;

    var rfcLength = newRFC.length;    

    var pattern =  new RegExp(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/);
    if(!pattern.test(newRFC)){
        
        isCorrect = false; 
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid RFC Format";       
    }

    if ((newRFC === "") || (rfcLength > rfcMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newRFC === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 13 characters";
        }
    }

    if (!isCorrect) {
        changeInValidField()
    } else {
        changeValidField()
    }

    return isCorrect;
}

function validateCURP() {

    var newCURP = $("#updateInput").val();

    const curpMaxLength = 18;
    var isCorrect = true;

    var curpLength = newCURP.length;    

    var pattern =  new RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
    if(!pattern.test(newCURP)){
        
        isCorrect = false; 
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid CURP Format";       
    }

    if ((newCURP === "") || (curpLength > curpMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newCURP === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 18 characters";
        }
    }

    if (!isCorrect) {
        changeInValidField()
    } else {
        changeValidField()
    }

    return isCorrect;
}

function validateEmail() {

    var newEmail = $("#updateInput").val();

    const emailMaxLength = 50;
    var isCorrect = true;

    var emailLength = newEmail.length;

    var pattern =  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{1,})$/);
    if(!pattern.test(newEmail)){
        
        isCorrect = false;
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid Email Format";
    }

    if ((newEmail === "") || (emailLength > emailMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newEmail === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 50 characters";
        }
    }

    if (!isCorrect) {
        changeInValidField();
    } else {
        changeValidField();
    }

    return isCorrect;
}

function validateFullName() {

    var newFullname = $("#updateInput").val();

    const fullnameMaxLength = 100;
    var isCorrect = true;

    var fullnameLength = newFullname.length;

    var pattern =  new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if(!pattern.test(newFullname)){
        
        isCorrect = false;
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid Full Name Format";
    }

    if ((newFullname === "") || (fullnameLength > fullnameMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newFullname === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 100 characters";
        }
    }
            
    if (!isCorrect) {
        changeInValidField()
    } else {
        changeValidField()
    }

    return isCorrect;
}

function validatePhone() {

    var newPhone = $("#updateInput").val();

    const phoneMaxLength = 10;
    var isCorrect = true;

    var phoneLength = newPhone.length;

    var pattern =  new RegExp(/^[0-9]{10}$/);
    if(!pattern.test(newPhone)){
        
        isCorrect = false;
        var field = document.getElementById("invalidField");
        field.innerHTML = "Invalid Phone Format";
    }

    if ((newPhone === "") || (phoneLength != phoneMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidField");

        if (newPhone === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 10 characters";
        }
    }

    if (!isCorrect) {
        changeInValidField();
    } else {
        changeValidField();
    }

    return isCorrect;
}

function validatePassword() {

    var newPassword = $("#updateInputNewPassword").val();

    const passwordMinLenght = 8;
    const passwordMaxLength = 16;

    var isCorrect = true;

    var passwordLenght = newPassword.length;    

    if ((newPassword === "") ||
        ((passwordLenght < passwordMinLenght) || (passwordLenght > passwordMaxLength))) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldNewPassword");

        if (newPassword === "") {
            field.innerHTML = "Password Field Required";
        } else {
            if (passwordLenght < passwordMinLenght) {
                field.innerHTML = "Minimum length of 8 characters";
            } else {
                field.innerHTML = "Maximum length of 16 characters";
            }
        }
    }

    if (!isCorrect) {
        
        $("#updateInputNewPassword").removeClass("is-valid");
        $("#updateInputNewPassword").addClass("is-invalid");

    } else {
        $("#updateInputNewPassword").removeClass("is-invalid");
        $("#updateInputNewPassword").addClass("is-valid");
    }

    return isCorrect;
}

function updateRFC() {

    disableUpdateButton();
    var validationResult = true;   

    validationResult = validateRFC();

    if (validationResult) {        

        var updateRFC = $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "rfc",
            "value": updateRFC,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessInformationAlert(data.message);  
                // showSuccessAlert(data.message);
                // loadData(staffInformation.email);

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }

}

function updateCURP() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validateCURP();

    if (validationResult) {        

        var updateCURPValue= $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "curp",
            "value": updateCURPValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessInformationAlert(data.message);  
                // showSuccessAlert(data.message);
                // loadData(staffInformation.email);

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }

}

function updateEmail() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validateEmail();

    if (validationResult) {        

        var updateEmailValue= $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "email",
            "value": updateEmailValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessAccessAlert(data.message);                

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }
}

function updateFullname() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validateFullName();

    if (validationResult) {        

        var updateFullnameValue= $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "fullname",
            "value": updateFullnameValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessInformationAlert(data.message);                

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }

}

function updatePassword() {
    
    disableUpdatePasswordButton();
    var validationResult = true;   

    validationResult = validatePassword();

    if (validationResult) {        

        var updateCurrentPasswordValue= $("#updateInputCurrentPassword").val();
        var updateNewPasswordValue= $("#updateInputNewPassword").val();

        var staffInformationUpdate = {
            "currentValue": updateCurrentPasswordValue,
            "newValue": updateNewPasswordValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateAdministratorPassword",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdatePasswordForm();
                enableUpdatePasswordButton();

                hideUpdateModalPassword();
                showSuccessInformationAlert(data.message);                

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdatePasswordButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdatePasswordButton();

        });

    } else {
        enableUpdatePasswordButton();
    }

}

function updatePhone() {
    
    disableUpdateButton();
    var validationResult = true;   

    validationResult = validatePhone();

    if (validationResult) {        

        var updatePhoneValue= $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "phone",
            "value": updatePhoneValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer+"/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",                    
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearUpdateForm();
                enableUpdateButton();

                hideUpdateModal();
                showSuccessInformationAlert(data.message);                  

            } else {

                var errorMessages = data.message;
                var errorFields = data.field;
                
                showAlert(errorMessages, true);
                changeInValidField();
                enableUpdateButton();
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableUpdateButton();

        });

    } else {
        enableUpdateButton();
    }

}

function showAlert(errorMessages, isErrorAlert) {      
    

    $("#modalErrors").find(".modal-body").empty();
    errorMessages.forEach(message => {

        if (message === "Invalid Password Format.") {
            message = "Invalid password format. The password must have between 8 and 16 characters, at least one digit, at least 1 special character, at least one lower case, at least one upper case and no whitespace";
        }

        const alert = document.createElement('DIV');
        alert.textContent = message;
        alert.classList.add('alert');        
        if (isErrorAlert) {
            alert.classList.add('alert-danger');
        } else {
            alert.classList.add('alert-success');
        }
        
        $("#modalErrors").find(".modal-body").append(alert);          

    });
    
    $('#modalErrors').modal('show');    
}

function showSuccessAlert(successMessages) {      
    

    $("#modalCorrectMessage").find(".modal-body").empty();
    successMessages.forEach(message => {
       
        $("#modalCorrectMessage").find(".modal-body").html(`
            <i class="fa-regular fa-circle-check fa-3x" style="color:green"></i>
            <br>
            <br>
            ${message}        
        `);     

    });
    
    $('#modalCorrectMessage').modal('show');    
}

function showSuccessAccessAlert(successMessages) {      
    

    $("#modalCorrectUserAccess").find(".modal-body").empty();
    successMessages.forEach(message => {
       
        $("#modalCorrectUserAccess").find(".modal-body").html(`
            <i class="fa-regular fa-circle-check fa-3x" style="color:green"></i>
            <br>
            <br>
            ${message}        
        `);     

    });
    
    $('#modalCorrectUserAccess').modal('show');    
}

function showSuccessInformationAlert(successMessages) {      
    

    $("#modalCorrectUserInformation").find(".modal-body").empty();
    successMessages.forEach(message => {
       
        $("#modalCorrectUserInformation").find(".modal-body").html(`
            <i class="fa-regular fa-circle-check fa-3x" style="color:green"></i>
            <br>
            <br>
            ${message}        
        `);     

    });
    
    $('#modalCorrectUserInformation').modal('show');    
}

function showRequestErrors(jqXHR, textStatus) {

    var errorMessages = [];

    if (jqXHR.status === 0) {

        var message = 'Not connect: Verify Network.';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
        

    } else if (jqXHR.status == 404) {

        var message = 'Requested page not found [404]';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
        

    } else if (jqXHR.status == 500) {

        var message = 'Internal Server Error [500].';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
        

    } else if (jqXHR.status == 400) {

        var message = 'Check wrong fields';
        errorMessages.push(message);
        
        showAlert(errorMessages, true);
                

    } else if (textStatus === 'parsererror') {

        var message = 'Requested JSON parse failed.';
        errorMessages.push(message);

        showAlert(errorMessages, true);
       

    } else if (textStatus === 'timeout') {

        var message = 'Time out error.';
        errorMessages.push(message);
       
        showAlert(errorMessages, true);
        

    } else if (textStatus === 'abort') {

        var message = 'Ajax request aborted.';
        errorMessages.push(message);

        showAlert(errorMessages, true);
        

    } else {

        var message = 'Uncaught Error: ' + jqXHR.responseText;
        console.error(message);

    }
}

function hideModalErrors() {
    $('#modalErrors').modal('hide');
}

function hideSuccessModal() {
    $('#modalCorrectMessage').modal('hide');
}

function disableUpdateButton() {
    document.getElementById("updateButton").setAttribute("disabled", "");           
}

function disableUpdatePasswordButton() {
    document.getElementById("updatePasswordButton").setAttribute("disabled", "");           
}

function enableUpdateButton() {
    document.getElementById("updateButton").removeAttribute("disabled");      
}

function enableUpdatePasswordButton() {
    document.getElementById("updatePasswordButton").removeAttribute("disabled");      
}

function changeValidField() {

    $("#updateInput").removeClass("is-invalid");
    $("#updateInput").addClass("is-valid");

}

function changeInValidField() {

    $("#updateInput").removeClass("is-valid");
    $("#updateInput").addClass("is-invalid");

}

function uncheckButtons() {
    $("#dashBoardButton").removeClass("active");
    $("#personalButton").removeClass("active");
}

function hideUpdateModal() {
    $('#updateDialog').modal('hide');
    $("#updateInput").val("");
    $("#updateInput").removeClass("is-valid");
    $("#updateInput").removeClass("is-invalid");
}

function hideUpdateModalPassword() {
    $('#updateDialogPassword').modal('hide');
}

function clearUpdateForm() {
    
    $("#updateInput").val("");
    $("#updateInput").removeClass("is-valid");
    $("#updateInput").removeClass("is-invalid");
}

function clearUpdatePasswordForm() {
    
    $("#updateInputCurrentPassword").val("");
    $("#updateInputNewPassword").val("");
    $("#updateInputNewPassword").removeClass("is-valid");
    $("#updateInputNewPassword").removeClass("is-invalid");
}

   



