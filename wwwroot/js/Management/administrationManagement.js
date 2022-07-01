var urlServer = "https://localhost:7004";

let sidebarToggle = document.querySelector(".sidebarToggle");
sidebarToggle.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
    document.getElementById("sidebarToggle").classList.toggle("active");
});

// var sizesList = [];
// function addSize() {


//     var sizeValue = $("#newInputSize").val();

//     disableButton("addSizeButton");

//     var isCorrect = validateSize();

//     if (!isCorrect) {

//         enableButton("addSizeButton");

//         return;
//     }

//     sizesList.push(sizeValue);

//     var sizeValuesTable = {
//         "size": sizeValue,

//         "delete":
//             `        
//                 <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
//                     onclick='deleteSize("${sizeValue}");'>
//                     <i class="fas fa-times"></i>
//                 </button>    
//             `
//     };

//     addSizeTable(sizeValuesTable);

//     enableButton("addSizeButton");
// }

// var imagesList = [];
// function addImage() {

//     var imageValue = $("#newInputImage").val();

//     disableButton("addImageButton");

//     var isCorrect = validateImage();

//     if (!isCorrect) {
//         changeInValidFieldInput("newInputImage");
//         enableButton("addImageButton");

//         return;
//     }

//     clearField("newInputImage");
//     imagesList.push(imageValue);

//     var imagesNumber = imagesList.length;
//     var imageTag = "image_" + (imagesNumber);

//     var imageValuesTable = {
//         "image":
//             `
//                                 <a href="${imageValue}" target="_blank">
//                                    ${imageTag}
//                                 </a>
//                             `
//         ,

//         "delete":
//             `        
//                                 <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
//                                     onclick='deleteImage("${imageValue}");'>
//                                     <i class="fas fa-times"></i>
//                                 </button>    
//                             `
//     };

//     addImageTable(imageValuesTable);

//     enableButton("addImageButton");
// }

// var colorsList = [];
// function addColor() {


//     var colorValue = $("#newInputColor").val();

//     disableButton("addColorButton");

//     var isCorrect = validateColor();

//     if (!isCorrect) {

//         enableButton("addColorButton");

//         return;
//     }

//     colorsList.push(colorValue);

//     var colorValuesTable = {
//         "color": colorValue,

//         "delete":
//             `        
//                                 <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
//                                     onclick='deleteColor("${colorValue}");'>
//                                     <i class="fas fa-times"></i>
//                                 </button>    
//                             `
//     };

//     addColorTable(colorValuesTable);

//     enableButton("addColorButton");
// }

// function deleteColor(color) {

//     var index = colorsList.findIndex(c => c === color);
//     colorsList.splice(index, 1);

//     $("#colorsTable").find("tbody").empty();

//     $.each(colorsList, function (i, colorValue) {

//         var colorValuesTable = {
//             "color": colorValue,

//             "delete":
//                 `        
//                     <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
//                         onclick='deleteColor("${colorValue}");'>
//                         <i class="fas fa-times"></i>
//                     </button>    
//                 `
//         };

//         addColorTable(colorValuesTable);

//     });

// }

// function deleteImage(image) {

//     var index = imagesList.findIndex(i => i === image);
//     imagesList.splice(index, 1);

//     $("#imagesTable").find("tbody").empty();

//     $.each(imagesList, function (i, imageValue) {

//         var index = imagesList.findIndex(i => i === imageValue);
//         var imageTag = "image_" + (index + 1);

//         var imageValuesTable = {
//             "image":
//                 `
//                     <a href="${imageValue}" target="_blank">
//                     ${imageTag}
//                     </a>
//                 `
//             ,

//             "delete":
//                 `        
//                     <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
//                         onclick='deleteImage("${imageValue}");'>
//                         <i class="fas fa-times"></i>
//                     </button>    
//                 `
//         };

//         addImageTable(imageValuesTable);

//     });

// }

// function deleteSize(size) {

//     var index = sizesList.findIndex(s => s === size);
//     sizesList.splice(index, 1);

//     $("#sizesTable").find("tbody").empty();

//     $.each(sizesList, function (i, sizeValue) {

//         var sizeValuesTable = {
//             "size": sizeValue,

//             "delete":
//                 `        
//                     <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
//                         onclick='deleteSize("${sizeValue}");'>
//                         <i class="fas fa-times"></i>
//                     </button>    
//                 `
//         };

//         addSizeTable(sizeValuesTable);

//     });

// }

// function addSizeTable(size) {

//     $("#sizesTable").find("tbody")
//         .append($("<tr>")
//             .append($("<td>").html(size.size))
//             .append($("<td>").html(size.delete))

//         );
// }

// function addImageTable(image) {
//     $("#imagesTable").find("tbody")
//         .append($("<tr>")
//             .append($("<td>").html(image.image))
//             .append($("<td>").html(image.delete))

//         );
// }

// function addColorTable(color) {

//     $("#colorsTable").find("tbody")
//         .append($("<tr>")
//             .append($("<td>").html(color.color))
//             .append($("<td>").html(color.delete))

//         );
// }

function validateFieldItems(input, validateFunction) {

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

function captureGenderRestriction() {

    $("#newInputGender").keydown(function (event) {
        setGenderRestriction();
    });
    $("#newInputGender").keyup(function (event) {
        setGenderRestriction();
    });
    $("#newInputGender").click(function () {
        setGenderRestriction();
    });

}

function captureStatusRestriction() {

    $("#newInputStatus").keydown(function (event) {
        setStatusRestriction();
    });
    $("#newInputStatus").keyup(function (event) {
        setStatusRestriction();
    });
    $("#newInputStatus").click(function () {
        setStatusRestriction();
    });
}

function setStatusRestriction() {

    var statusValue = $("#newInputStatus").val();

    if (statusValue === "Unavailable") {
        setStockRestriction();
    } else if (statusValue === "Available") {
        validateStock();
    }
}

function setStockRestriction() {


    $("#newInputStock").addClass("active");
    changeValidFieldInput("newInputStock");
    $("#newInputStock").val(0);

}

function setGenderRestriction() {

    var genderValue = $("#newInputGender").val();

    if (genderValue === "Feminine") {
        setFemenineOptions();
    } else {
        setMaleOptions();
    }
}

function setFemenineOptions() {

    $("#newInputCategory").empty();

    $("#newInputCategory").html(`
          
        <option value="T-Shirt">T-Shirt</option>
        <option value="Jacket">Jacket</option>
        <option value="Jeans">Jeans</option>
        <option value="Blouse">Blouse</option>
        <option value="Dress">Dress</option>
        <option value="Pijama">Pijama</option>          
    `);
}

function setMaleOptions() {

    $("#newInputCategory").empty();

    $("#newInputCategory").html(`          
        <option value="T-Shirt">T-Shirt</option>
        <option value="Jacket">Jacket</option>                
    `);
}

function validateSKUField() {

    $("#newInputSKU").keydown(function (event) {
        validateAverageField("newInputSKU", "invalidFieldSKU", "SKU");
    });
    $("#newInputSKU").keyup(function (event) {
        validateAverageField("newInputSKU", "invalidFieldSKU", "SKU");
    });
    $("#newInputSKU").blur(function (event) {
        validateAverageField("newInputSKU", "invalidFieldSKU", "SKU");
    });
}

function validateNameField() {

    $("#newInputName").keydown(function (event) {
        validateAverageField("newInputName", "invalidFieldName", "Name");
    });
    $("#newInputName").keyup(function (event) {
        validateAverageField("newInputName", "invalidFieldName", "Name");
    });
    $("#newInputName").blur(function (event) {
        validateAverageField("newInputName", "invalidFieldName", "Name");
    });
}

function validateColor() {

    var color = $("#newInputColor").val();

    var isCorrect = true;

    var index = colorsList.findIndex(c => c === color);
    if (index != -1) {
        isCorrect = false;
    }


    return isCorrect;
}

function validateSize() {

    var size = $("#newInputSize").val();

    var isCorrect = true;

    var index = sizesList.findIndex(s => s === size);
    if (index != -1) {
        isCorrect = false;
    }


    return isCorrect;
}

function validateImage() {

    var image = $("#newInputImage").val();

    const imageMaxLength = 200;
    var isCorrect = true;

    var imageLength = image.length;

    var pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    if (!pattern.test(image)) {

        isCorrect = false;
    }

    if ((image === "") || (imageLength > imageMaxLength)) {

        isCorrect = false;
    }

    var index = imagesList.findIndex(c => c === image);
    if (index != -1) {
        isCorrect = false;
    }

    if (!isCorrect) {
        changeInValidFieldInput("newInputImage");
    } else {
        changeValidFieldInput("newInputImage");
    }

    return isCorrect;
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

function validateDescription() {

    var newDescription = $("#newInputDescription").val();

    const descriptionMaxLength = 100;
    var isCorrect = true;

    var descriptionLength = newDescription.length;

    var pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if (!pattern.test(newDescription)) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldDescription");
        field.innerHTML = "Invalid Description Format.";
    }

    if ((newDescription === "") || (descriptionLength > descriptionMaxLength)) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldDescription");

        if (newDescription === "") {
            field.innerHTML = "Description Field Required";
        } else {
            field.innerHTML = "Maximum length of 100 characters";
        }
    }

    if (!isCorrect) {
        changeInValidFieldInput("newInputDescription");
    } else {
        changeValidFieldInput("newInputDescription")
    }

    return isCorrect;
}

function validatePrice() {

    var newPrice = $("#newInputPrice").val();

    const minPrice = 99;
    var isCorrect = true;

    if ((newPrice === "") || (newPrice < minPrice)) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldPrice");

        if (newPrice === "") {
            field.innerHTML = "Price Field Required";
        } else {
            field.innerHTML = "Minimum price of 99";
        }
    }

    if (!isCorrect) {
        changeInValidFieldInput("newInputPrice");
    } else {
        changeValidFieldInput("newInputPrice")
    }

    return isCorrect;
}

function validateStock() {

    var newStock = $("#newInputStock").val();

    var isCorrect = true;

    var pattern = new RegExp(/^\d+$/);
    if (!pattern.test(newStock)) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldStock");
        field.innerHTML = "Only integers.";
    }

    if (newStock === "") {

        isCorrect = false;
        var field = document.getElementById("invalidFieldStock");

        field.innerHTML = "Stock Field Required";

    }

    var statusValue = $("#newInputStatus").val();

    if (newStock == 0 && statusValue === "Available") {
        isCorrect = false;
        var field = document.getElementById("invalidFieldStock");

        field.innerHTML = "There must be at least one";
    }

    if (!isCorrect) {
        changeInValidFieldInput("newInputStock");
    } else {
        changeValidFieldInput("newInputStock")
    }

    return isCorrect;
}

function validateCare() {

    var newCare = $("#newInputCare").val();

    var isCorrect = true;

    var pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:º',_-]{0,}$/);
    if (!pattern.test(newCare)) {

        isCorrect = false;
        var field = document.getElementById("invalidFieldCare");
        field.innerHTML = "Invalid Care Format.";
    }

    if (newCare === "") {

        isCorrect = false;
        var field = document.getElementById("invalidFieldCare");

        field.innerHTML = "Care Field Required";

    }

    if (!isCorrect) {
        changeInValidFieldInput("newInputCare");
    } else {
        changeValidFieldInput("newInputCare")
    }

    return isCorrect;
}

function setItemsInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#productsButton").addClass("active");
    $('#pageContentFluid').empty();
    $('#pageContent').empty();
    $('#pageContentlg').empty();
    $('#pageContentColorTable').empty();
    $('#pageContentImageTable').empty();
    $('#pageContentSizeTable').empty();
    $('#highchartsContainer').empty();

    $("#pageContentFluid").html(`

        <div class="text-center mb-3">
            <h3 class="brand-zofya brand-zofya-logo">Items</h3>
        </div>        
        <table id="itemsTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">SKU</th>
                    <th scope="col">Description</th>                    
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Care</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
               
            </tbody>
        </table>
        <div class="my-3">
            <button id="buttonTest" class="btn button-action-style" onclick="showModalAddItem();">Add new
             item</button>
        </div>
    `);

    $("#pageContentColorTable").html(`
          
        <table id="colorsTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Color</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
    `);

    $("#pageContentImageTable").html(`
          
        <table id="imagesTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
    `);

    $("#pageContentSizeTable").html(`
          
        <table id="sizesTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Size</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
    `);

    itemsTable = $('#itemsTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        scrollY: 300,
        columns: [
            { "data": "sku" },
            { "data": "description" },
            { "data": "name" },
            { "data": "price" },
            { "data": "category" },
            { "data": "status" },
            { "data": "stock" },
            { "data": "gender" },
            { "data": "care" },
            { "data": "edit" },
            { "data": "delete" }
        ]
    });

    loadItemsServerData();

    colorTable = $('#colorsTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        columns: [
            { "data": "color" },
            { "data": "delete" }
        ]
    });

    imageTable = $('#imagesTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        columns: [
            { "data": "image" },
            { "data": "delete" }
        ]
    });

    sizeTable = $('#sizesTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        columns: [
            { "data": "size" },
            { "data": "delete" }
        ]
    });

    validateFieldItems("newInputImage", validateImage);
    validateSKUField();
    validateFieldItems("newInputDescription", validateDescription);
    validateNameField();
    validateFieldItems("newInputPrice", validatePrice);
    validateFieldItems("newInputStock", validateStock);
    validateFieldItems("newInputCare", validateCare);

    setGenderRestriction();
    captureGenderRestriction();
    captureStatusRestriction();

}

function showModalAddItem() {
    $("#addItemModal").modal("show");
    $("#modalFooterContent").html(`

        <button onclick="addItem();" type="button" class="btn button-action-style"
            id="addItemButton">Add Item</button>
        <button type="button" class="btn button-action-style" data-bs-dismiss="modal" 
            onclick="hideAddItemModal();">Close</button>
    `);
}

var items = [];
function loadItemsServerData() {

    $.ajax({

        method: "POST",
        url: urlServer + "/ItemsData",
        cache: false,
        processData: false,
        contentType: "application/json",
        data: null
    }).done(function (data) {

        $("#itemsTable").find("tbody").empty();
        items = data;
        loadItemsDataTable(items);

    });
}

function loadItemsDataTable(items) {


    $.each(items, function (i, item) {

        var itemSKUValue = item.sku;

        var descriptionString = item.description;
        var descriptionLength = item.description.length;
        var newDescriptionTag = "";
        const descriptionTagLength = 25;

        if (descriptionLength > descriptionTagLength) {
            for (let i = 0; i < descriptionTagLength; i++) {

                const charDescription = descriptionString[i];
                newDescriptionTag += charDescription;

            }
            newDescriptionTag = newDescriptionTag + "...";

        } else {
            newDescriptionTag = descriptionString;
        }

        var careString = item.care;
        var careLength = item.care.length;
        var newCareTag = "";
        const careTagLength = 30;

        if (careLength > careTagLength) {
            for (let i = 0; i < careTagLength; i++) {

                const charCare = careString[i];
                newCareTag += charCare;

            }
            newCareTag = newCareTag + "...";

        } else {
            newCareTag = careString;
        }


        var itemValues = {
            "sku": item.sku,
            "description": newDescriptionTag,
            "name": item.name,
            "price": item.price,
            "category": item.category,
            "status": item.status,
            "stock": item.stock,
            "gender": item.gender,
            "care": newCareTag,
            "edit":
                `        
                                <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                    onclick='updateItem("${itemSKUValue}");'>
                                    <i class="fa-solid fa-pencil"></i>
                                </button>    
                            `,
            "delete":
                `        
                                <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                    onclick='deleteItem("${itemSKUValue}");'>
                                    <i class="fas fa-times"></i>
                                </button>    
                            `
        };

        if (item.status === "Deleted") {
            addItemDangerTable(itemValues)
        } else {
            addItemTable(itemValues);
        }

    });

}

function updateItem(sku) {

    $("#modalFooterContent").html(`

        <button onclick="updateDBItem();" type="button" class="btn button-action-style"
            id="updateItemButton">Update Item</button>
        <button type="button" class="btn button-action-style" data-bs-dismiss="modal" 
            onclick="hideAddItemModal();">Close</button>
    `);


    var skuValue = {
        "id": sku
    }

    $.ajax({

        method: "POST",
        url: urlServer + "/PostFindItemSKU",
        cache: false,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(skuValue)

    }).done(function (data) {


        $("#newInputSKU").val(data.sku);
        document.getElementById("newInputSKU").setAttribute("disabled", "");

        $("#newInputDescription").val(data.description);
        $("#newInputName").val(data.name);
        $("#newInputPrice").val(data.price);
        $("#newInputCategory").val(data.category);
        $("#newInputStatus").val(data.status);
        $("#newInputStock").val(data.stock);
        $("#newInputGender").val(data.gender);
        $("#newInputCare").val(data.care);

        colorsList = data.colors;
        $.each(data.colors, function (i, colorValue) {

            var colorValuesTable = {
                "color": colorValue,

                "delete":
                    `        
                                    <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                        onclick='deleteColor("${colorValue}");'>
                                        <i class="fas fa-times"></i>
                                    </button>    
                                `
            };

            addColorTable(colorValuesTable);

        });

        imagesList = data.images;
        $.each(imagesList, function (i, imageValue) {

            var index = imagesList.findIndex(i => i === imageValue);
            var imageTag = "image_" + (index + 1);

            var imageValuesTable = {
                "image":

                    `
                                    <a href="${imageValue}" target="_blank">
                                        ${imageTag}
                                    </a>
                                `
                ,

                "delete":
                    `        
                                    <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                        onclick='deleteImage("${imageValue}");'>
                                        <i class="fas fa-times"></i>
                                    </button>    
                                `
            };

            addImageTable(imageValuesTable);

        });

        sizesList = data.sizes;
        $.each(sizesList, function (i, sizeValue) {

            var sizeValuesTable = {
                "size": sizeValue,

                "delete":
                    `        
                                    <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                        onclick='deleteSize("${sizeValue}");'>
                                        <i class="fas fa-times"></i>
                                    </button>    
                                `
            };

            addSizeTable(sizeValuesTable);

        });


        $("#addItemModal").modal("show");


    });
}

var deleteSKU = "";
function deleteItem(sku) {
    deleteSKU = sku;
    $("#modalDeleteItem").modal("show");
}

function removeItem() {

    hideModal('modalDeleteItem');

    var skuValueUpdate = {
        "id": deleteSKU
    }

    $.ajax({

        method: "PUT",
        url: urlServer + "/UpdateItemDelete",
        cache: false,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(skuValueUpdate)

    }).done(function (data) {

        if (data.correct) {

            loadItemsServerData();
            showSuccessAlert(data.message, 'modalCorrectMessage');

        } else {

            var errorMessages = data.message;
            showAlert(errorMessages, true)
        }
    });
}

function addItemTable(item) {

    $("#itemsTable").find("tbody")
        .append($("<tr>")
            .append($("<td>").html(item.sku))
            .append($("<td>").html(item.description))
            .append($("<td>").html(item.name))
            .append($("<td>").html(item.price))
            .append($("<td>").html(item.category))
            .append($("<td>").html(item.status))
            .append($("<td>").html(item.stock))
            .append($("<td>").html(item.gender))
            .append($("<td>").html(item.care))
            .append($("<td>").html(item.edit))
            .append($("<td>").html(item.delete))

        );
}

function addItemDangerTable(item) {
    $("#itemsTable").find("tbody")
        .append($("<tr class='table-danger'>")
            .append($("<td>").html(item.sku))
            .append($("<td>").html(item.description))
            .append($("<td>").html(item.name))
            .append($("<td>").html(item.price))
            .append($("<td>").html(item.category))
            .append($("<td>").html(item.status))
            .append($("<td>").html(item.stock))
            .append($("<td>").html(item.gender))
            .append($("<td>").html(item.care))
            .append($("<td>").html(item.edit))
            .append($("<td>").html(item.delete))

        );
}

function setCustomersInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#customersButton").addClass("active");
    $('#pageContentFluid').empty();
    $('#pageContent').empty();
    $('#pageContentlg').empty();
    $('#pageContentColorTable').empty();
    $('#pageContentImageTable').empty();
    $('#pageContentSizeTable').empty();
    $('#highchartsContainer').empty();

    $("#pageContentlg").html(`

        <div class="text-center mb-3">
            <h3 class="brand-zofya brand-zofya-logo">Customers</h3>
        </div>        
        <table id="customersTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th id="fullnameCol">Full Name</th>
                    <th id="emailCol">Email</th>
                    <th id="phoneCol">Phone</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    `);

    customerTable = $('#customersTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        scrollY: 300,
        columns: [
            { "data": "fullname" },
            { "data": "email" },
            { "data": "phone" },
            { "data": "delete" }
        ]
    });

    loadCustomersServerData();


}

function setOrdersInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#ordersButton").addClass("active");
    $('#pageContentFluid').empty();
    $('#pageContent').empty();
    $('#pageContentlg').empty();
    $('#pageContentColorTable').empty();
    $('#pageContentImageTable').empty();
    $('#pageContentSizeTable').empty();
    $('#highchartsContainer').empty();

    $("#pageContentlg").html(`

        <div class="text-center mb-3">
            <h3 class="brand-zofya brand-zofya-logo">Orders</h3>
        </div>        
        <table id="ordersTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th id="idCol">ID</th>
                    <th id="dateCol">Date</th>
                    <th id="deliveryDateCol">Delivery Date</th>
                    <th id="statusCol">Status</th>
                    <th id="totalToPayCol">Total to Pay</th>
                    <th id="idUserCol">ID User</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    `);

    customerTable = $('#ordersTable').DataTable({
        paging: false,
        ordering: false,
        searching: false,
        info: false,
        scrollY: 300,
        columns: [
            { "data": "id" },
            { "data": "date" },
            { "data": "deliveryDate" },
            { "data": "status" },
            { "data": "totalToPay" },
            { "data": "idUser" },
            { "data": "delete" }
        ]
    });

    loadOrdersServerData();

}

var orders = [];
function loadOrdersServerData() {

    $.ajax({

        method: "POST",
        url: urlServer + "/OrdersData",
        cache: false,
        processData: false,
        contentType: "application/json",
        data: null
    }).done(function (data) {

        $("#ordersTable").find("tbody").empty();
        orders = data;
        loadOrdersDataTable(orders);

    });
}

function loadOrdersDataTable(orders) {


    $.each(orders, function (i, order) {

        var orderIDValue = order.idOrder;

        var dateFormat = order.date;
        dateFormat = dateFormat.substring(0, 10);

        var deliveryDateFormat = order.deliveryDate;
        deliveryDateFormat = deliveryDateFormat.substring(0, 10);

        var orderValues = {
            "id": order.idOrder,
            "date": dateFormat,
            "deliveryDate": deliveryDateFormat,
            "status": order.status,
            "totalToPay": order.totalToPay,
            "idUser": order.idUser,
            "delete":
                `        
                                <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                    onclick='updateOrder("${orderIDValue}");'>
                                    <i class="fa-solid fa-pencil"></i>
                                </button>    
                            `
        };

        addOrderTable(orderValues);

    });

}

var updatedIDOrder = "";
function updateOrder(idOrder) {
    updatedIDOrder = idOrder;
    $("#updateOrderModal").modal("show");
}

function updateOrderStatus() {

    hideModal('updateOrderModal');

    var newStatus = $("#updatedStatudInput").val();

    let orderUpdateValuesJson = {
        "idOrder": updatedIDOrder,
        "status": newStatus
    }

    $.ajax({

        method: "PATCH",
        url: urlServer + "/UpdateOrder",
        contentType: "application/json",
        data: JSON.stringify(orderUpdateValuesJson)

    }).done(function (data) {

        if (data.correct) {

            loadOrdersServerData();
            showSuccessAlert(data.message, 'modalCorrectMessage');

        } else {

            var errorMessages = data.message;
            showAlert(errorMessages, true)
        }

    }).fail(function (jqXHR, textStatus) {

        console.log(jqXHR, textStatus);

    });
}


function addOrderTable(order) {

    $("#ordersTable").find("tbody")
        .append($("<tr>")
            .append($("<td>").html(order.id))
            .append($("<td>").html(order.date))
            .append($("<td>").html(order.deliveryDate))
            .append($("<td>").html(order.status))
            .append($("<td>").html(order.totalToPay))
            .append($("<td>").html(order.idUser))
            .append($("<td>").html(order.delete))

        );
}

var customers = [];
function loadCustomersServerData() {

    $.ajax({

        method: "POST",
        url: urlServer + "/CustomersData",
        cache: false,
        processData: false,
        contentType: "application/json",
        data: null
    }).done(function (data) {

        $("#customersTable").find("tbody").empty();
        customers = data;
        loadCustomersDataTable(customers);

    });
}

function loadCustomersDataTable(customers) {


    $.each(customers, function (i, customer) {
        var customerEmailValue = customer.email;

        var customerValues = {
            "fullname": customer.fullName,
            "email": customer.email,
            "phone": customer.phone,
            "delete":
                `        
                                <button type="button" class="btn btn-link btn-sm px-3 icon-color" data-ripple-color="dark"
                                    onclick='deleteCustomer("${customerEmailValue}");'>
                                    <i class="fas fa-times"></i>
                                </button>    
                            `
        };

        addCustomerTable(customerValues);

    });

}

var deleteEmail = "";
function deleteCustomer(email) {
    deleteEmail = email;
    $("#modalDelete").modal("show");
}

function removeCustomer() {
    hideModal('modalDelete');
    $.ajax({

        method: "DELETE",
        url: urlServer + "/CustomerDelete/" + deleteEmail,
        cache: false,
        processData: false,
        contentType: false,
        data: null

    }).done(function (data) {

        if (data.correct) {


            loadCustomersServerData();
            showSuccessAlert(data.message, 'modalCorrectMessage');

        } else {

            var errorMessages = data.message;
            showAlert(errorMessages, true)
        }
    });
}

function addCustomerTable(customer) {

    $("#customersTable").find("tbody")
        .append($("<tr>")
            .append($("<td>").html(customer.fullname))
            .append($("<td>").html(customer.email))
            .append($("<td>").html(customer.phone))
            .append($("<td>").html(customer.delete))

        );
}

function setAdministratorUpdateInformation(userEmail) {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#personalButton").addClass("active");
    $('#pageContentFluid').empty();
    $('#pageContent').empty();
    $('#pageContentlg').empty();
    $('#pageContentColorTable').empty();
    $('#pageContentImageTable').empty();
    $('#pageContentSizeTable').empty();
    $('#highchartsContainer').empty();

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

    $("#administratorTable tbody").on("click", "tr", function () {

        var informationRow = administratorTable.row(this).data();

        switch (informationRow.field) {

            case 'RFC':
                
                clearField('updateInput');
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "RFC";
                document.getElementById("updateNewLabel").innerHTML = "New RFC:";
                $("#updateFormFooter").html(`

                    <button type="button" class="btn button-action-style" id="updateButton" onclick="updateRFC();">Save RFC</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateRFC);
                break;

            case 'CURP':
                
                clearField('updateInput');
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "CURP";
                document.getElementById("updateNewLabel").innerHTML = "New CURP:";
                $("#updateFormFooter").html(`

                    <button onclick="updateCURP();" type="button" class="btn button-action-style"
                     id="updateButton">Save CURP</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateCURP);
                break;

            case 'Email':
                
                clearField('updateInput');
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Email";
                document.getElementById("updateNewLabel").innerHTML = "New Email:";
                $("#updateFormFooter").html(`

                    <button onclick="updateEmail();" type="button" class="btn button-action-style" 
                        id="updateButton">Save Email</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateEmail);
                break;

            case 'Fullname':
                
                clearField('updateInput');
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Fullname";
                document.getElementById("updateNewLabel").innerHTML = "Fullname:";
                $("#updateFormFooter").html(`

                    <button onclick="updateFullname();" type="button" class="btn button-action-style"
                        id="updateButton">Save Fullname</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideUpdateModal();">Close</button>
                
                `);

                validateField(validateFullName);
                break;

            case 'Password':
                
                clearField('updateInputNewPassword');
                clearField('updateInputCurrentPassword');

                $('#updateDialogPassword').modal('show');

                $("#updateFormFooterPassword").html(`

                    <button onclick="updatePassword();" type="button" class="btn button-action-style" id="updatePasswordButton">Save Password</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
                        onclick="hideModal('updateDialogPassword');">Close</button>
                
                `);

                validatePasswordField(validatePassword);
                break;

            case 'Phone':
                
                clearField('updateInput');
                $('#updateDialog').modal('show');
                document.getElementById("updateLabel").innerHTML = "Phone";
                document.getElementById("updateNewLabel").innerHTML = "New Phone:";
                $("#updateFormFooter").html(`

                    <button onclick="updatePhone(); return false;" type="button" class="btn button-action-style"
                        id="updateButton">Save Phone</button>
                    <button type="button" class="btn button-action-style" data-bs-dismiss="modal"
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

    var pattern = new RegExp(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/);
    if (!pattern.test(newRFC)) {

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
        changeInValidFieldInput('updateInput');
    } else {
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validateCURP() {

    var newCURP = $("#updateInput").val();

    const curpMaxLength = 18;
    var isCorrect = true;

    var curpLength = newCURP.length;

    var pattern = new RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
    if (!pattern.test(newCURP)) {

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
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validateEmail() {

    var newEmail = $("#updateInput").val();

    const emailMaxLength = 50;
    var isCorrect = true;

    var emailLength = newEmail.length;

    var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{1,})$/);
    if (!pattern.test(newEmail)) {

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
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validateFullName() {

    var newFullname = $("#updateInput").val();

    const fullnameMaxLength = 100;
    var isCorrect = true;

    var fullnameLength = newFullname.length;

    var pattern = new RegExp(/^[0-9a-zA-ZÀ-ÿ\\u00f1\\u00d1]{1,}[0-9\sa-zA-ZÀ-ÿ\\u00f1\\u00d1.:',_-]{0,}$/);
    if (!pattern.test(newFullname)) {

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
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
    }

    return isCorrect;
}

function validatePhone() {

    var newPhone = $("#updateInput").val();

    const phoneMaxLength = 10;
    var isCorrect = true;

    var phoneLength = newPhone.length;

    var pattern = new RegExp(/^[0-9]{10}$/);
    if (!pattern.test(newPhone)) {

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
        changeInValidFieldInput('updateInput');
    } else {        
        changeValidFieldInput('updateInput');
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

function validateColorsList() {

    var colorsNumber = colorsList.length;

    if (colorsNumber > 0) {
        return true;
    } else {
        return false;
    }
}

function validateImagesList() {

    var imagesNumber = imagesList.length;

    if (imagesNumber > 0) {
        return true;
    } else {
        return false;
    }
}

function validateSizesList() {

    var sizesNumber = sizesList.length;

    if (sizesNumber > 0) {
        return true;
    } else {
        return false;
    }
}

function addItem() {

    disableButton("addItemButton");
    var validationResult = true;

    var validationFieldsResults = []
    validationFieldsResults.push(validateAverageField("newInputSKU", "invalidFieldSKU", "SKU"));
    validationFieldsResults.push(validateDescription());
    validationFieldsResults.push(validateAverageField("newInputName", "invalidFieldName", "Name"));
    validationFieldsResults.push(validatePrice());
    validationFieldsResults.push(validateStock());
    validationFieldsResults.push(validateCare());

    validationFieldsResults.push(validateColorsList());
    validationFieldsResults.push(validateImagesList());
    validationFieldsResults.push(validateSizesList());

    var result = validationFieldsResults.includes(false);

    if (result) {
        validationResult = false;
    }

    if (validationResult) {

        var sku = $("#newInputSKU").val();
        var description = $("#newInputDescription").val();
        var name = $("#newInputName").val();
        var price = $("#newInputPrice").val();
        var category = $("#newInputCategory").val();
        var status = $('#newInputStatus').val();
        var stock = $('#newInputStock').val();
        var gender = $('#newInputGender').val();
        var care = $('#newInputCare').val();

        var colorsValues = colorsList;
        var imagesValues = imagesList;
        var sizesValues = sizesList;

        var item = {

            "sku": sku,
            "description": description,
            "name": name,
            "price": price,
            "category": category,
            "status": status,
            "stock": stock,
            "gender": gender,
            "care": care,
            "colors": colorsValues,
            "images": imagesValues,
            "sizes": sizesValues
        };

        $.ajax({

            method: "POST",
            url: urlServer + "/AddItem",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(item)

        }).done(function (data) {

            if (data.correct) {

                enableButton("addItemButton");
                hideAddItemModal();

                loadItemsServerData();
                cleanFields("newInputSKU");
                cleanFields("newInputDescription");
                cleanFields("newInputName");
                cleanFields("newInputPrice");
                cleanFields("newInputStock");
                cleanFields("newInputCare");
                enableButton("addItemButton");

                showSuccessAlert(data.message, 'modalCorrectMessage');


            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);
                enableButton("addItemButton");
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus, true);
            enableButton("addItemButton");

        });



    } else {
        showAlert(["Correct or complete the form fields"], true);
        enableButton("addItemButton");
    }
}

function updateDBItem() {

    disableButton("updateItemButton");
    var validationResult = true;

    var validationFieldsResults = []

    validationFieldsResults.push(validateDescription());
    validationFieldsResults.push(validateAverageField("newInputName", "invalidFieldName", "Name"));
    validationFieldsResults.push(validatePrice());
    validationFieldsResults.push(validateStock());
    validationFieldsResults.push(validateCare());

    validationFieldsResults.push(validateColorsList());
    validationFieldsResults.push(validateImagesList());
    validationFieldsResults.push(validateSizesList());

    var result = validationFieldsResults.includes(false);

    if (result) {
        validationResult = false;
    }

    if (validationResult) {

        var sku = $("#newInputSKU").val();
        var description = $("#newInputDescription").val();
        var name = $("#newInputName").val();
        var price = $("#newInputPrice").val();
        var category = $("#newInputCategory").val();
        var status = $('#newInputStatus').val();
        var stock = $('#newInputStock').val();
        var gender = $('#newInputGender').val();
        var care = $('#newInputCare').val();

        var colorsValues = colorsList;
        var imagesValues = imagesList;
        var sizesValues = sizesList;

        var item = {

            "sku": sku,
            "description": description,
            "name": name,
            "price": price,
            "category": category,
            "status": status,
            "stock": stock,
            "gender": gender,
            "care": care,
            "colors": colorsValues,
            "images": imagesValues,
            "sizes": sizesValues
        };

        $.ajax({

            method: "PUT",
            url: urlServer + "/UpdateItem",
            cache: false,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(item)

        }).done(function (data) {

            if (data.correct) {

                enableButton("updateItemButton");
                hideAddItemModal();

                loadItemsServerData();
                cleanFields("newInputSKU");
                cleanFields("newInputDescription");
                cleanFields("newInputName");
                cleanFields("newInputPrice");
                cleanFields("newInputStock");
                cleanFields("newInputCare");

                showSuccessAlert(data.message, 'modalCorrectMessage');


            } else {

                var errorMessages = data.message;                

                showAlert(errorMessages, true);
                enableButton("updateItemButton");
            }

        }).fail(function (jqXHR, textStatus) {

            showRequestErrors(jqXHR, textStatus, true);
            enableButton("updateItemButton");

        });



    } else {
        showAlert(["Correct or complete the form fields"], true);
        enableButton("updateItemButton");
    }
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

function hideAddItemModal() {

    document.getElementById("newInputSKU").removeAttribute("disabled");
    hideModal('addItemModal');

    clearField("newInputSKU");
    clearField("newInputDescription");
    clearField("newInputName");
    clearField("newInputPrice");
    clearField("newInputStock");
    clearField("newInputCare");
    clearField("newInputImage");

    clearItemsLists();

}

function hideModal(modal) {

    $("#" + modal).modal('hide');

}

function clearItemsLists() {
    colorsList = [];
    imagesList = [];
    sizesList = [];
    $("#colorsTable").find("tbody").empty();
    $("#imagesTable").find("tbody").empty();
    $("#sizesTable").find("tbody").empty();
}

function clearField(input) {

    $("#" + input).val("");
    $("#" + input).removeClass("is-valid");
    $("#" + input).removeClass("is-invalid");
    $("#" + input).removeClass("active");

}