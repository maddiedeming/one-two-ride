


function lyftBarChart(response){
    let labels = [];
    for(var i = 0; i < response.cost_estimates.length; i++) {
        labels.push("Driver " + (i + 1) + " ");
    }
    let costData = [];
    for(var i = 0; i < response.cost_estimates.length; i++) {
        let rideCost = response.cost_estimates[i].estimated_cost_cents_max;
        let convertedCost = rideCost / 100;
        costData.push(convertedCost);
    }
    let lyftCostData = costData.sort();
    let lyftDataSet = {
        label: 'Lyft',
        fill: false,
        lineTenstion: 0,
        backgroundColor: 'rgb(73, 201, 255)',
        borderColor: 'rgb(255, 255, 255)',
        data: lyftCostData
    };
    let lyftData = [lyftDataSet, labels]
    return lyftData;
}  



function uberBarChart(response) {
    let costData = [];
    for(var i = 0; i < response.prices.length; i++) {
        costData.push(response.prices[i].high_estimate);
    }
    let uberCostData = costData.sort();
    let uberDataSet = {
        label: 'Uber',
        fill: false,
        lineTenstion: 0,
        backgroundColor: 'rgb(255, 160, 150)',
        borderColor: 'rgb(255, 255, 255)',
        data: uberCostData
    };
    let uberData = uberDataSet;
    return uberData;
}



// Draws Chart
function BarChartRender(lyftLabels, lyftDataSet, uberData){
    const barChart = document.getElementById('bar-chart').getContext('2d');
    const textBarChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: lyftLabels,
            datasets: [lyftDataSet, uberData] 
            }
    });
    const barChartElement = $("#bar-chart");
    barChartElement.addClass("animated fadeInLeft");
}






function lyftDoughnutChart(response) {
    let seatsArray = [];
    let seatsObject = {};
    for(var i = 0; i < response.ride_types.length; i++) {
        var seats = response.ride_types[i].seats;
        seatsArray.push(seats);
    }

    let lyftSeatsCounted = seatsArray.reduce((acc, curVal) => {
        if (curVal in acc) {
            acc[curVal]++;
        } else {
            acc[curVal] = 1;
        }
        return acc;
    }, seatsObject);

    let seatValues = "";
    for(var value in lyftSeatsCounted) {
        seatValues = seatValues + lyftSeatsCounted[value];
    }
    let seatValuesArray = [];
    seatValues.split("").forEach((value) => {
        seatValuesArray.push(parseInt(value));   
    });

    let lyftSeatKeys =[];
    Object.keys(lyftSeatsCounted).forEach((value) => {
        value =  "Lyft " + value + " Seats" ;
        valueStr = value.toString();
        lyftSeatKeys.push(valueStr);
    });
    lyftSeatData = [lyftSeatKeys, seatValuesArray];
    return lyftSeatData;
}


function uberDoughnutChart(response) {
    let seatsArray = [];
    let seatsObject = {};
    for(var i = 0; i < response.products.length; i++) {
        var seats = response.products[i].capacity;
        seatsArray.push(seats);
    }

    let uberSeatsCounted = seatsArray.reduce((acc, curVal) => {
        if (curVal in acc) {
            acc[curVal]++;
        } else {
            acc[curVal] = 1;
        }
        return acc;
    }, seatsObject);

    let seatValues = "";
    for(var value in uberSeatsCounted) {
        seatValues = seatValues + uberSeatsCounted[value];
    }
    let seatValuesArray = [];
    seatValues.split("").forEach((value) => {
        seatValuesArray.push(parseInt(value));   
    });

    let uberSeatKeys =[];
    Object.keys(uberSeatsCounted).forEach((value) => {
        value = "Uber " + value + " Seats";
        valueStr = value.toString();
        uberSeatKeys.push(valueStr);
    });

    uberSeatData = [uberSeatKeys, seatValuesArray];
    return uberSeatData;
}



function doughnutChartRender (lyftSeatData, uberSeatData) {
    const doughnutChart = document.getElementById("dough-chart");
    let combinedKeyLabels = [];
    for(var i = 0; i <= lyftSeatData[0].length; i++) {
        let indexValue = lyftSeatData[0].shift();
        combinedKeyLabels.push(indexValue);
    }
    for(var i = 0; i <= uberSeatData[0].length; i++) {
        let indexValue = uberSeatData[0].shift();
        combinedKeyLabels.push(indexValue);
    }
    const combinedSeatValues = lyftSeatData[1].join(" ") + " " +uberSeatData[1].join(" ");
    const combinedSeatsArray = combinedSeatValues.split(" ");
    const textDoughnutChart = new Chart(doughnutChart, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: "red",
                fill: true,
                backgroundColor: ["rgb(172, 212, 167)", "rgb(212, 167, 197)", "rgb(48, 158, 204)", "rgb(141, 189, 242)", "rgb(0, 0, 0)" ],
                data: combinedSeatsArray
            }],
            
            labels: combinedKeyLabels
            
        },
    });
    const doughnutElement = $("#dough-chart");
    doughnutElement.addClass("animated fadeInRight");
}



