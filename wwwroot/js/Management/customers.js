
function setCustomersInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#customersButton").addClass("active");
    clearContainers();

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