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