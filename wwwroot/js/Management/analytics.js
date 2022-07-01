
function setAnalyticsInformation() {

    $("body").addClass("active");
    $("#sidebarToggle").addClass("active");

    uncheckButtons();
    $("#analyticsButton").addClass("active");
    $('#pageContentFluid').empty();
    $('#pageContent').empty();
    $('#pageContentlg').empty();
    $('#pageContentColorTable').empty();
    $('#pageContentImageTable').empty();
    $('#pageContentSizeTable').empty();

    $("#highchartsContainer").html(`
        <div class="row">
            <figure class="highcharts-figure col-6">
                <div id="containerPie"></div>        
            </figure>

            <figure class="highcharts-figure col-6">
                <div id="containerBar"></div>                      
            </figure>  
        </div>
    `);

    $.ajax({

        method: "GET",
        url: urlServer + "/PopularItems",
        cache: false,
        processData: false,
        contentType: false,
        data: null

    }).done(function (data) {

        setPieGraph(data);

    });

    $.ajax({

        method: "GET",
        url: urlServer + "/DeliveryOrders",
        cache: false,
        processData: false,
        contentType: false,
        data: null

    }).done(function (data) {

        setBarGraph(data);

    });


}

function setBarGraph(data) {

    Highcharts.chart('containerBar', {
        chart: {
            type: 'column'
        },
        title: {
            align: 'center',
            text: 'Concentration of delivery dates'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent delivery dates'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        series: [
            {
                name: "Delivery date",
                colorByPoint: true,
                data: data
            }
        ],
        credits: false

    });
}

function setPieGraph(data) {
    Highcharts.chart('containerPie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Customer Interest In Zofya Items'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Interest',
            colorByPoint: true,
            data: data
        }],
        credits: false
    });

}