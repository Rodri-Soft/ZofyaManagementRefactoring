function setItemsInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#productsButton").addClass("active");
    clearContainers();

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

    validateField("newInputImage", validateImage);
    validateSKUField();
    validateField("newInputDescription", validateDescription);
    validateNameField();
    validateField("newInputPrice", validatePrice);
    validateField("newInputStock", validateStock);
    validateField("newInputCare", validateCare);

    setGenderRestriction();    
    captureRestriction('newInputGender', setGenderRestriction);    
    captureRestriction('newInputStatus', setStatusRestriction);

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

function showModalAddItem() {
    $("#addItemModal").modal("show");
    $("#modalFooterContent").html(`

        <button onclick="addItem();" type="button" class="btn button-action-style"
            id="addItemButton">Add Item</button>
        <button type="button" class="btn button-action-style" data-bs-dismiss="modal" 
            onclick="hideAddItemModal();">Close</button>
    `);
}

function getValidationResults(isNew) {
    
    var validationResult = true;

    var validationFieldsResults = []

    if (isNew) {
        validationFieldsResults.push(validateAverageField("newInputSKU", "invalidFieldSKU", "SKU"));
    }    

    validationFieldsResults.push(validateDescription());
    validationFieldsResults.push(validateAverageField("newInputName", "invalidFieldName", "Name"));
    validationFieldsResults.push(validatePrice());
    validationFieldsResults.push(validateStock());
    validationFieldsResults.push(validateCare());
    
    validationFieldsResults.push(validateList(colorsList));
    validationFieldsResults.push(validateList(imagesList));    
    validationFieldsResults.push(validateList(sizesList));

    var result = validationFieldsResults.includes(false);

    if (result) {
        validationResult = false;
    }

    return validationResult;
}

function validateList(list) {
    
    var elementsNumber = list.length;

    if (elementsNumber > 0) {
        return true;
    } else {
        return false;
    }
}

function createItem() {

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

    return item;
}

function addItem() {

    disableButton("addItemButton");

    var validationResult = true;   
    validationResult = getValidationResults(true);

    if (validationResult) {        

        var item = createItem();

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

function updateDBItem() {

    disableButton("updateItemButton");    

    var validationResult = true;   
    validationResult = getValidationResults(false);

    if (validationResult) {

        var item = createItem();

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

var sizesList = [];
function addSize() {


    var sizeValue = $("#newInputSize").val();

    disableButton("addSizeButton");

    var isCorrect = validateSize();

    if (!isCorrect) {

        enableButton("addSizeButton");

        return;
    }

    sizesList.push(sizeValue);

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

    enableButton("addSizeButton");
}

var imagesList = [];
function addImage() {

    var imageValue = $("#newInputImage").val();

    disableButton("addImageButton");

    var isCorrect = validateImage();

    if (!isCorrect) {
        changeInValidFieldInput("newInputImage");
        enableButton("addImageButton");

        return;
    }

    clearField("newInputImage");
    imagesList.push(imageValue);

    var imagesNumber = imagesList.length;
    var imageTag = "image_" + (imagesNumber);

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

    enableButton("addImageButton");
}

var colorsList = [];
function addColor() {


    var colorValue = $("#newInputColor").val();

    disableButton("addColorButton");

    var isCorrect = validateColor();

    if (!isCorrect) {

        enableButton("addColorButton");

        return;
    }

    colorsList.push(colorValue);

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

    enableButton("addColorButton");
}

function deleteColor(color) {

    var index = colorsList.findIndex(c => c === color);
    colorsList.splice(index, 1);

    $("#colorsTable").find("tbody").empty();

    $.each(colorsList, function (i, colorValue) {

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

}

function deleteImage(image) {

    var index = imagesList.findIndex(i => i === image);
    imagesList.splice(index, 1);

    $("#imagesTable").find("tbody").empty();

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

}

function deleteSize(size) {

    var index = sizesList.findIndex(s => s === size);
    sizesList.splice(index, 1);

    $("#sizesTable").find("tbody").empty();

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

}

function addSizeTable(size) {

    $("#sizesTable").find("tbody")
        .append($("<tr>")
            .append($("<td>").html(size.size))
            .append($("<td>").html(size.delete))

        );
}

function addImageTable(image) {
    $("#imagesTable").find("tbody")
        .append($("<tr>")
            .append($("<td>").html(image.image))
            .append($("<td>").html(image.delete))

        );
}

function addColorTable(color) {

    $("#colorsTable").find("tbody")
        .append($("<tr>")
            .append($("<td>").html(color.color))
            .append($("<td>").html(color.delete))

        );
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

function clearItemsLists() {
    colorsList = [];
    imagesList = [];
    sizesList = [];
    $("#colorsTable").find("tbody").empty();
    $("#imagesTable").find("tbody").empty();
    $("#sizesTable").find("tbody").empty();
}

