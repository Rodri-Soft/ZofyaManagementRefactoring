var urlServer = "https://localhost:7004";

let sidebarToggle = document.querySelector(".sidebarToggle");
sidebarToggle.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
    document.getElementById("sidebarToggle").classList.toggle("active");
});

function clearContainers() {

    $('#pageContentFluid').empty();
    $('#pageContent').empty();
    $('#pageContentlg').empty();
    $('#pageContentColorTable').empty();
    $('#pageContentImageTable').empty();
    $('#pageContentSizeTable').empty();
    $('#highchartsContainer').empty();
}

function captureRestriction(input, validateFunction) {

    $("#" + input).keydown(function (event) {
        validateFunction();
    });
    $("#" + input).keyup(function (event) {
        validateFunction();
    });
    $("#" + input).click(function (event) {
        validateFunction();
    });         

}

function validateAverageField(field, invalidField, fieldName) {

    var fieldValue = $("#" + field).val();

    const fieldMaxLength = 50;
    var isCorrect = true;

    var fieldLength = fieldValue.length;

    var pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if (!pattern.test(fieldValue)) {

        isCorrect = false;
        var invalidFieldValue = document.getElementById(invalidField);
        invalidFieldValue.innerHTML = "Invalid " + fieldName + " Format.";

    }

    if ((fieldValue === "") || (fieldLength > fieldMaxLength)) {

        isCorrect = false;
        var invalidFieldValue = document.getElementById(invalidField);

        if (fieldValue === "") {
            invalidFieldValue.innerHTML = fieldName + " Field Required";
        } else {
            invalidFieldValue.innerHTML = "Maximum length of 50 characters";
        }
    }

    if (!isCorrect) {
        changeInValidFieldInput(field);
    } else {
        changeValidFieldInput(field);
    }

    return isCorrect;
}

function setAdministratorUpdateInformation(userEmail) {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#personalButton").addClass("active");
    clearContainers();

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
        columns: [
            { "data": "field" },
            { "data": "value" }
        ]
    });

    loadData(userEmail);
    setUpdateTableListeners();
    
}

function setUpdateFormFooter(footerOptions, parameters) {
    
    $("#" + footerOptions.idForm).html(`

        <button onclick="${footerOptions.updateFunction}();" type="button" class="btn button-action-style"
            id=${footerOptions.idButton}>${footerOptions.saveMessage}</button>
        <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
            onclick="${footerOptions.closeFunction}(${parameters});">Close</button>

    `);
}


function setRFCForm(footerOptions) {

    clearField('updateInput');
    $('#updateDialog').modal('show');
    document.getElementById("updateLabel").innerHTML = "RFC";
    document.getElementById("updateNewLabel").innerHTML = "New RFC:";
        
    footerOptions.updateFunction = 'updateRFC';
    footerOptions.saveMessage = "Save RFC";

    setUpdateFormFooter(footerOptions);
    validateField('updateInput', validateRFC);
}

function setCURPForm(footerOptions) {

    clearField('updateInput');
    $('#updateDialog').modal('show');
    document.getElementById("updateLabel").innerHTML = "CURP";
    document.getElementById("updateNewLabel").innerHTML = "New CURP:";                
    
    footerOptions.updateFunction = 'updateCURP';
    footerOptions.saveMessage = "Save CURP";

    setUpdateFormFooter(footerOptions);
    validateField('updateInput', validateCURP);
}

function setEmailForm(footerOptions) {
    
    clearField('updateInput');
    $('#updateDialog').modal('show');
    document.getElementById("updateLabel").innerHTML = "Email";
    document.getElementById("updateNewLabel").innerHTML = "New Email:";                
   
    footerOptions.updateFunction = 'updateEmail';
    footerOptions.saveMessage = "Save Email";

    setUpdateFormFooter(footerOptions);
    validateField('updateInput', validateEmail);
}

function setFullnameForm(footerOptions) {
    
    clearField('updateInput');
    $('#updateDialog').modal('show');
    document.getElementById("updateLabel").innerHTML = "Fullname";
    document.getElementById("updateNewLabel").innerHTML = "Fullname:";       

    footerOptions.updateFunction = 'updateFullname';
    footerOptions.saveMessage = "Save Full name";

    setUpdateFormFooter(footerOptions);
    validateField('updateInput', validateFullName);
}

function setPasswordForm(footerOptions) {
    
    clearField('updateInputNewPassword');
    clearField('updateInputCurrentPassword');

    $('#updateDialogPassword').modal('show');
        
    footerOptions.idForm = 'updateFormFooterPassword';
    footerOptions.updateFunction = 'updatePassword';
    footerOptions.idButton = 'updatePasswordButton';
    footerOptions.saveMessage = "Save Password";
    footerOptions.closeFunction = 'hideModal';

    setUpdateFormFooter(footerOptions, "'updateDialogPassword'");
    validateField('updateInputNewPassword', validatePassword);

}

function setPhoneForm(footerOptions) {
    
    clearField('updateInput');
    $('#updateDialog').modal('show');
    document.getElementById("updateLabel").innerHTML = "Phone";
    document.getElementById("updateNewLabel").innerHTML = "New Phone:";
   
    footerOptions.updateFunction = 'updatePhone';
    footerOptions.saveMessage = "Save Phone";

    setUpdateFormFooter(footerOptions);
    validateField('updateInput', validatePhone);
}

function setUpdateTableListeners() {

    $("#administratorTable tbody").on("click", "tr", function () {

        var informationRow = administratorTable.row(this).data();
        var footerOptions = {
            "idForm": 'updateFormFooter',    
            "idButton": "updateButton",    
            "closeFunction": 'hideUpdateModal'
        }

        switch (informationRow.field) {

            case 'RFC':
                
                setRFCForm(footerOptions);
                break;

            case 'CURP':
                
                setCURPForm(footerOptions);
                break;

            case 'Email':
                
                setEmailForm(footerOptions);
                break;

            case 'Fullname':
                
                setFullnameForm(footerOptions);
                break;

            case 'Password':
                
                setPasswordForm(footerOptions);
                break;

            case 'Phone':
                
                setPhoneForm(footerOptions);
                break;

            default:
                break;
        }
    });
}

var staffInformation;
function loadData(userEmail) {

    var IDResult = {
        "id": userEmail
    };

    $.ajax({

        method: "POST",
        url: urlServer + "/PostFindStaffEmail",
        cache: false,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(IDResult)

    }).done(function (data) {

        staffInformation = data;
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

function validateField(input, validateFunction) {

    $("#" + input).keydown(function (event) {
        validateFunction();
    });
    $("#" + input).keyup(function (event) {
        validateFunction();
    });
    $("#" + input).blur(function (event) {
        validateFunction();
    });
}

function validateRFC() {

    var newRFC = $("#updateInput").val();
    var field = document.getElementById("invalidField");

    const rfcMaxLength = 13;
    var isCorrect = true;

    var rfcLength = newRFC.length;

    var pattern = new RegExp(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/);
    if (!pattern.test(newRFC)) {

        isCorrect = false;        
        field.innerHTML = "Invalid RFC Format";
    }

    if ((newRFC === "") || (rfcLength > rfcMaxLength)) {

        isCorrect = false;        

        if (newRFC === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 13 characters";
        }
    }

    if (!isCorrect) {        
        changeInValidFieldInput('updateInput');
    } else {
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validateCURP() {

    var newCURP = $("#updateInput").val();
    var field = document.getElementById("invalidField");

    const curpMaxLength = 18;
    var isCorrect = true;

    var curpLength = newCURP.length;

    var pattern = new RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
    if (!pattern.test(newCURP)) {

        isCorrect = false;        
        field.innerHTML = "Invalid CURP Format";
    }

    if ((newCURP === "") || (curpLength > curpMaxLength)) {

        isCorrect = false;        

        if (newCURP === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 18 characters";
        }
    }

    if (!isCorrect) {        
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validateEmail() {

    var newEmail = $("#updateInput").val();
    var field = document.getElementById("invalidField");

    const emailMaxLength = 50;
    var isCorrect = true;

    var emailLength = newEmail.length;

    var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{1,})$/);
    if (!pattern.test(newEmail)) {

        isCorrect = false;        
        field.innerHTML = "Invalid Email Format";
    }

    if ((newEmail === "") || (emailLength > emailMaxLength)) {

        isCorrect = false;        

        if (newEmail === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 50 characters";
        }
    }

    if (!isCorrect) {        
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validateFullName() {

    var newFullname = $("#updateInput").val();
    var field = document.getElementById("invalidField");

    const fullnameMaxLength = 100;
    var isCorrect = true;

    var fullnameLength = newFullname.length;

    var pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if (!pattern.test(newFullname)) {

        isCorrect = false;        
        field.innerHTML = "Invalid Full Name Format";
    }

    if ((newFullname === "") || (fullnameLength > fullnameMaxLength)) {

        isCorrect = false;        

        if (newFullname === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 100 characters";
        }
    }

    if (!isCorrect) {        
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validatePhone() {

    var newPhone = $("#updateInput").val();
    var field = document.getElementById("invalidField");

    const phoneMaxLength = 10;
    var isCorrect = true;

    var phoneLength = newPhone.length;

    var pattern = new RegExp(/^[0-9]{10}$/);
    if (!pattern.test(newPhone)) {

        isCorrect = false;        
        field.innerHTML = "Invalid Phone Format";
    }

    if ((newPhone === "") || (phoneLength != phoneMaxLength)) {

        isCorrect = false;        

        if (newPhone === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of 10 characters";
        }
    }

    if (!isCorrect) {        
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validatePassword() {

    var newPassword = $("#updateInputNewPassword").val();
    var field = document.getElementById("invalidFieldNewPassword");

    const passwordMinLenght = 8;
    const passwordMaxLength = 16;

    var isCorrect = true;

    var passwordLenght = newPassword.length;

    if (newPassword === "") {

        isCorrect = false;                
        field.innerHTML = "Password Field Required";        
    }

    if ((passwordLenght < passwordMinLenght) || (passwordLenght > passwordMaxLength)) {

        isCorrect = false;       

        if (passwordLenght < passwordMinLenght) {
            field.innerHTML = "Minimum length of 8 characters";
        } else {
            field.innerHTML = "Maximum length of 16 characters";
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

function cleanFields(field) {

    $("#" + field).val("");
    $("#" + field).removeClass("active");
    $("#" + field).removeClass("is-valid");
    $("#" + field).removeClass("is-invalid");
}

function updateRFC() {

    disableButton('updateButton');
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
            url: urlServer + "/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearField('updateInput');
                enableButton('updateButton');

                hideUpdateModal();
                showSuccessAlert(data.message, 'modalCorrectUserInformation');

            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);                
                changeInValidFieldInput('updateInput');
                enableButton('updateButton');
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableButton('updateButton');

        });

    } else {
        enableButton('updateButton');
    }

}

function updateCURP() {

    disableButton('updateButton');
    var validationResult = true;

    validationResult = validateCURP();

    if (validationResult) {

        var updateCURPValue = $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "curp",
            "value": updateCURPValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer + "/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearField('updateInput');
                enableButton('updateButton');

                hideUpdateModal();
                showSuccessAlert(data.message, 'modalCorrectUserInformation');


            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);                
                changeInValidFieldInput('updateInput');
                enableButton('updateButton');
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableButton('updateButton');

        });

    } else {
        enableButton('updateButton');
    }

}

function updateEmail() {

    disableButton('updateButton');
    var validationResult = true;

    validationResult = validateEmail();

    if (validationResult) {

        var updateEmailValue = $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "email",
            "value": updateEmailValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer + "/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearField('updateInput');
                enableButton('updateButton');

                hideUpdateModal();
                showSuccessAlert(data.message, 'modalCorrectUserAccess');

            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);                
                changeInValidFieldInput('updateInput');
                enableButton('updateButton');
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableButton('updateButton');

        });

    } else {
        enableButton('updateButton');
    }
}

function updateFullname() {

    disableButton('updateButton');
    var validationResult = true;

    validationResult = validateFullName();

    if (validationResult) {

        var updateFullnameValue = $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "fullname",
            "value": updateFullnameValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer + "/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearField('updateInput');
                enableButton('updateButton');

                hideUpdateModal();
                showSuccessAlert(data.message, 'modalCorrectUserInformation');

            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);                
                changeInValidFieldInput('updateInput');
                enableButton('updateButton');
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableButton('updateButton');

        });

    } else {
        enableButton('updateButton');
    }

}

function updatePassword() {

    disableButton('updatePasswordButton');
    var validationResult = true;

    validationResult = validatePassword();

    if (validationResult) {

        var updateCurrentPasswordValue = $("#updateInputCurrentPassword").val();
        var updateNewPasswordValue = $("#updateInputNewPassword").val();

        var staffInformationUpdate = {
            "currentValue": updateCurrentPasswordValue,
            "newValue": updateNewPasswordValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer + "/UpdateAdministratorPassword",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearField('updateInputNewPassword');
                clearField('updateInputCurrentPassword');

                enableButton('updatePasswordButton');

                hideModal('updateDialogPassword');
                showSuccessAlert(data.message, 'modalCorrectUserInformation');

            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);                
                changeInValidFieldInput('updateInput');
                enableButton('updatePasswordButton');
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableButton('updatePasswordButton');

        });

    } else {
        enableButton('updatePasswordButton');
    }

}

function updatePhone() {

    disableButton('updateButton');
    var validationResult = true;

    validationResult = validatePhone();

    if (validationResult) {

        var updatePhoneValue = $("#updateInput").val();

        var staffInformationUpdate = {
            "field": "phone",
            "value": updatePhoneValue,
            "primaryKeyRFC": staffInformation.rfc
        }

        $.ajax({

            method: "PUT",
            url: urlServer + "/UpdateAdministrator",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(staffInformationUpdate)

        }).done(function (data) {

            if (data.correct) {
                
                clearField('updateInput');
                enableButton('updateButton');

                hideUpdateModal();
                showSuccessAlert(data.message, 'modalCorrectUserInformation');

            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);                
                changeInValidFieldInput('updateInput');
                enableButton('updateButton');
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus);
            enableButton('updateButton');

        });

    } else {
        enableButton('updateButton');
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

function showSuccessAlert(successMessages, modal) {


    $("#" + modal).find(".modal-body").empty();
    successMessages.forEach(message => {

        $("#" + modal).find(".modal-body").html(`
            <i class="fa-regular fa-circle-check fa-3x" style="color:green"></i>
            <br>
            <br>
            ${message}        
        `);

    });

    $("#" + modal).modal('show');
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

function disableButton(button) {
    document.getElementById(button).setAttribute("disabled", "");
}

function enableButton(button) {
    document.getElementById(button).removeAttribute("disabled");
}

function changeValidFieldInput(input) {

    $("#" + input).removeClass("is-invalid");
    $("#" + input).addClass("is-valid");

}

function changeInValidFieldInput(input) {

    $("#" + input).removeClass("is-valid");
    $("#" + input).addClass("is-invalid");

}

function uncheckButtons() {

    $("#personalButton").removeClass("active");
    $("#customersButton").removeClass("active");
    $("#productsButton").removeClass("active");
    $("#ordersButton").removeClass("active");
    $("#analyticsButton").removeClass("active");

}

function hideUpdateModal() {

    hideModal('updateDialog');
    clearField('updateInput');
}

function hideModal(modal) {

    $("#" + modal).modal('hide');

}

function clearField(input) {

    $("#" + input).val("");
    $("#" + input).removeClass("is-valid");
    $("#" + input).removeClass("is-invalid");
    $("#" + input).removeClass("active");

}