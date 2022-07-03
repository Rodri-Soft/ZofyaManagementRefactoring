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

function setFieldsForm(formOptions) {
   
    clearField(formOptions.input);
    $("#" + formOptions.dialog).modal('show');
    document.getElementById("updateLabel").innerHTML = formOptions.updateLabel;
    document.getElementById("updateNewLabel").innerHTML = formOptions.updateNewLabel;
}

function setUpdateForms(formOptions, footerOptions, updateOptions) {
    
    setFieldsForm(formOptions);
    setUpdateFormFooter(footerOptions);
    validateField('updateInput', updateOptions);

}

function getUpdateRFCOptions() {
    
    var pattern = new RegExp(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/);
    
    var updateOptions = {        
        "maxLength": 13,
        "pattern": pattern,
        "field": "RFC"
    }

    return updateOptions;
}

function setRFCForm(footerOptions, formOptions) {    

    formOptions.updateLabel = "RFC";
    formOptions.updateNewLabel = "New RFC:";
        
    footerOptions.updateFunction = 'updateRFC';
    footerOptions.saveMessage = "Save RFC";   

    var updateOptions = getUpdateRFCOptions();
       
    setUpdateForms(formOptions, footerOptions, updateOptions);
}

function getUpdateCURPOptions() {
    
    var pattern = new RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);

    var updateOptions = {        
        "maxLength": 18,
        "pattern": pattern,
        "field": "CURP"
    }

    return updateOptions;
}

function setCURPForm(footerOptions, formOptions) {   
    
    formOptions.updateLabel = "CURP";
    formOptions.updateNewLabel = "New CURP:";
    
    footerOptions.updateFunction = 'updateCURP';
    footerOptions.saveMessage = "Save CURP";    

    var updateOptions = getUpdateCURPOptions();
    
    setUpdateForms(formOptions, footerOptions, updateOptions);
}

function getUpdateEmailOptions() {
    
    var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{1,})$/);

    var updateOptions = {        
        "maxLength": 50,
        "pattern": pattern,
        "field": "Email"
    }

    return updateOptions;
}

function setEmailForm(footerOptions, formOptions) {       
    
    formOptions.updateLabel = "Email";
    formOptions.updateNewLabel = "New Email:";    
   
    footerOptions.updateFunction = 'updateEmail';
    footerOptions.saveMessage = "Save Email";   

    var updateOptions =  getUpdateEmailOptions();
    
    
    setUpdateForms(formOptions, footerOptions, updateOptions);
}

function getUpdateFullnameOptions() {
    
    var pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);

    var updateOptions = {        
        "maxLength": 100,
        "pattern": pattern,
        "field": "Full Name"
    }

    return updateOptions;
}

function setFullnameForm(footerOptions, formOptions) {         

    formOptions.updateLabel = "Full Name";
    formOptions.updateNewLabel = "New Full Name:";    

    footerOptions.updateFunction = 'updateFullname';
    footerOptions.saveMessage = "Save Full name";    

    var updateOptions = getUpdateFullnameOptions();
    
    setUpdateForms(formOptions, footerOptions, updateOptions);
}

function getUpdatePhoneOptions() {
    
    var pattern = new RegExp(/^[0-9]{10}$/);

    var updateOptions = {        
        "maxLength": 10,
        "pattern": pattern,
        "field": "Phone"
    }

    return updateOptions;
}

function setPhoneForm(footerOptions, formOptions) {        

    formOptions.updateLabel = "Full Phone";
    formOptions.updateNewLabel = "New Phone:";    
   
    footerOptions.updateFunction = 'updatePhone';
    footerOptions.saveMessage = "Save Phone";    

    var updateOptions = getUpdatePhoneOptions();
    
    setUpdateForms(formOptions, footerOptions, updateOptions);
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

function setUpdateTableListeners() {

    $("#administratorTable tbody").on("click", "tr", function () {

        var informationRow = administratorTable.row(this).data();
        var footerOptions = {
            "idForm": 'updateFormFooter',    
            "idButton": "updateButton",    
            "closeFunction": 'hideUpdateModal'
        }

        var formOptions = {
            "input": 'updateInput',
            "dialog": 'updateDialog',        
        }        

        switch (informationRow.field) {

            case 'RFC':
                
                setRFCForm(footerOptions, formOptions);
                break;

            case 'CURP':
                
                setCURPForm(footerOptions, formOptions);
                break;

            case 'Email':
                
                setEmailForm(footerOptions, formOptions);
                break;

            case 'Fullname':
                
                setFullnameForm(footerOptions, formOptions);
                break;

            case 'Password':
                
                setPasswordForm(footerOptions);
                break;

            case 'Phone':
                
                setPhoneForm(footerOptions, formOptions);
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

function validateField(input, updateOptions) {

    $("#" + input).keydown(function (event) {

        if (input === 'updateInputNewPassword') {
            updateOptions();
        } else {
            validateAdministratorField(updateOptions);    
        }
        
    });
    $("#" + input).keyup(function (event) {
        
        if (input === 'updateInputNewPassword') {
            updateOptions();
        } else {
            validateAdministratorField(updateOptions);    
        }
    });
    $("#" + input).blur(function (event) {

        if (input === 'updateInputNewPassword') {
            updateOptions();
        } else {
            validateAdministratorField(updateOptions);    
        }
    });
}

function validateAdministratorField(updateOptions) {

    var newField = $("#updateInput").val();
    var field = document.getElementById("invalidField");

    const maxLength = updateOptions.maxLength;
    var isCorrect = true;

    var newInputLength = newField.length;
    
    var pattern = updateOptions.pattern;
    if (!pattern.test(newField)) {

        isCorrect = false;        
        field.innerHTML = "Invalid "+updateOptions.field+" Format";
    }

    if ((newField === "") || (newInputLength > maxLength)) {

        isCorrect = false;        

        if (newField === "") {
            field.innerHTML = "Field required";
        } else {
            field.innerHTML = "Maximum length of "+updateOptions.maxLength+" characters";
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
    
    var updateOptions = getUpdateRFCOptions();

    validationResult = validateAdministratorField(updateOptions);

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

    var updateOptions = getUpdateCURPOptions();

    validationResult = validateAdministratorField(updateOptions);

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

    var updateOptions = getUpdateEmailOptions();

    validationResult = validateAdministratorField(updateOptions);

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

    var updateOptions = getUpdateFullnameOptions();

    validationResult = validateAdministratorField(updateOptions);

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

    var updateOptions = getUpdatePhoneOptions();

    validationResult = validateAdministratorField(updateOptions);

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