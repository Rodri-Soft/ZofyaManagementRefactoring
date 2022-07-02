
function setOrdersInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#ordersButton").addClass("active");
    clearContainers();

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