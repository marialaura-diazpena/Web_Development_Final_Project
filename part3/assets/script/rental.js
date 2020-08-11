var clientArray = [];
var client = {};
var searchBox = document.getElementById('input_client_search');
searchBox.addEventListener('keyup', clientSearch);

document.onload = loadFile();
document.onload = initialize();

function initialize() {
    var todayDate = new Date();

  todayDate.month = todayDate.getMonth() + 1;

  var date =  todayDate.month +'/'+ todayDate.getDate() +'/'+ todayDate.getFullYear() + '<br> ' + todayDate.getHours() + ':' + todayDate.getMinutes();

  document.getElementById('currentDate').innerHTML = date;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
  

function loadFile() {
    var filePath = "./assets/data/rentalclients.json";

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            clientArray = JSON.parse(ajax.responseText);
        }
    }

    ajax.open('GET', filePath, true);
    ajax.send();

}


function clientSearch() {

    var resultsArray = [];

    if (searchBox.value != "") {
        for (let i = 0; i <clientArray.length; i++) {
            var thisClient = clientArray[i];
            var search = thisClient.last_name.indexOf(searchBox.value);

            if (search != -1) {
            resultsArray.push(thisClient);
            }
        }
    }

    else {
        resultsArray = [];
    }

    clientSearchDisplayResults(resultsArray)
}

function clientSearchDisplayResults(resultsArray) {

    var display = '<ul>';

    for (let i=0; i<resultsArray.length; i++) {
        var thisResult = resultsArray[i];
        display += '<li><button onclick =\"populateRentalForm(\''+ thisResult.email+'\');">';
        display += thisResult.first_name + ' ' + thisResult.last_name;
        display += '</button></li>';

    }

    display += '</u>'

    document.getElementById('client_results').innerHTML = display;
}

function populateRentalForm(selectedEmail) {

    for (let i = 0; i < clientArray.length; i++) {
        var thisClient = clientArray[i];

        if (selectedEmail == thisClient.email) {
            client = thisClient;
            break;
        }

    }

    document.getElementById('c_firstname').value = client.first_name;
    document.getElementById('c_lastname').value = client.last_name;
    document.getElementById('c_address').value = client.address;
    document.getElementById('c_provState').value = client.state_prov;
    document.getElementById('c_email').value = client.email;
    document.getElementById('c_phone').value = client.phone;


    var allInputs = document.querySelectorAll('input');

    for (let i=0; i < allInputs.length; i++) {
        allInputs[i].disabled = false;
    }

    var submitButton = document.getElementById('submit_form');
    submitButton.disabled = false;
}

function submitForm(client) {
    var total = 0;
    
    var vehicleType = document.querySelector('input[name="vehicle_type[]"]:checked');
    
    if (vehicleType.value == 'Compact') {
        total += 10;
    }
    
    if (vehicleType.value == 'Mid-size') {
        total += 20;
    }
    
    if (vehicleType.value == 'Luxury') {
        total += 35;
    }
    
    if (vehicleType.value == 'Van/Truck') {
        total += 40;
    }
    
    var options = [];
    var vehicleOptions = document.getElementsByName('vehicle_options[]');
    
    for (let i = 0; i < vehicleOptions.length; i++) {
        var thisOption = vehicleOptions[i];
        
        if (vehicleOptions[i].checked == true ) {
            if (thisOption.value == 'rack') {
                total += 5;
                options.push("Roof Rack / Bicycle Rack");
            }
            
            if (thisOption.value == 'gps') {
                total += 10;
                options.push("GPS");
            }
            
            if (thisOption.value == 'childseat') {
                options.push("Child Seat");
            }

        }
        
    }
    
    var rentalDays = document.getElementById('rental_days').value;
    
    total = total * rentalDays;
    
    client.typeOfVehicle = vehicleType.value;
    client.options = options;
    client.days = rentalDays;
    client.totalCost = total.toFixed(2);
    
    displayReceipt(client);
}

function displayReceipt(client){
    receipt = '<h3> Dodgy Brakes Car Rental </h3>';
    receipt += '<h4> Receipt Description</h4>';
    var d = new Date();

    d.month = d.getMonth() + 1;

    receipt += '<b>Date: </b>' + d.month +'/'+d.getDate() +'/'+d.getFullYear() + '<br>';
    receipt += '<b>Client Name: </b>' + client.first_name + ' ' + client.last_name + '<br>';
    receipt += '<b>Client Address: </b>' + client.address + ', ' + client.state_prov + '<br>';
    receipt += '<b>Client Email: </b>' + client.email + '<br>';
    receipt += '<b>Client Phone: </b>' + client.phone + '<br>';
    receipt += '<b>Type of Vehicle Rented: </b>'+ client.typeOfVehicle +'<br>';
    receipt += '<ul>';

    for (var i = 0; i < client.options.length; i++) {

        receipt += '<li>' + client.options[i] + '</li>';

    }

    receipt += '</ul>';
    receipt += '<b>Total of days for rental: </b>' + client.days + '<br>';
    receipt += '<b>Total Cost:</b> $' + client.totalCost + '<p></p>';

    document.getElementById('rental_display').innerHTML = receipt;

}