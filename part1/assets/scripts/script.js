var employeeArray = [];

document.onload = loadFileForSearch();
document.onload = initialize();

function initialize() {
    var searchLastNameInput = document.getElementById('searchLastName');
    searchLastNameInput.addEventListener('keyup', function(){
        searchByLastName(employeeArray, searchLastNameInput.value);
    });

    var searchIdInput = document.getElementById('searchID');
    searchIdInput.addEventListener('keyup', function(){
        searchByID(employeeArray, searchIdInput.value);
    });

    var searchAddressInput = document.getElementById('searchAddress');
    searchAddressInput.addEventListener('keyup', function(){
        searchByAddress(employeeArray, searchAddressInput.value);
    });
}

function loadFileForSearch() {
    var filePath = "./assets/data/employeedata.json";

    var ajax = new XMLHttpRequest;

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            employeeArray = JSON.parse(ajax.responseText);
        }
    }

    ajax.open('GET', filePath, true);
    ajax.send();
}

function searchByLastName(searchArray, value) {

    var resultArray = [];

    for (let i = 0; i < searchArray.length; i++) {

        var thisEmployee = searchArray[i];
        var searchFound = thisEmployee.lastname.indexOf(value);

        if (searchFound != -1) {

            resultArray.push(thisEmployee);
        }
    }

    displayResults(resultArray);
}

function searchByID(searchArray, value) {

    var resultArray = [];

    for (let i = 0; i < searchArray.length; i++) {

        var thisEmployee = searchArray[i];
        var searchFound = thisEmployee.idnumber.indexOf(value, 0);

        if (searchFound != -1) {

            resultArray.push(thisEmployee);
        }

    }

    displayResults(resultArray);
}

function searchByAddress(searchArray, value) {

    var resultArray = [];

    for (let i = 0; i < searchArray.length; i++) {

        var thisEmployee = searchArray[i];
        var searchFound = thisEmployee.address.indexOf(value);

        if (searchFound != -1) {

            resultArray.push(thisEmployee);
        }

    }

    displayResults(resultArray);
}

function displayResults(resultArray) {
    

    var result = "";

    for (let i = 0; i < resultArray.length; i++) {

        var thisEmployee = resultArray[i];
        
        result += '<div class="employee">';
        result += '<h4>Employee #' + thisEmployee.idnumber + '</h4>';
        result += thisEmployee.firstname + ' ' + thisEmployee.lastname + '<br>';
        result += 'Phone: ' + thisEmployee.phone + '<br>';
        result += 'Address: ' + thisEmployee.address;
        result += '</div> <br>';
    }

    document.getElementById('search_results').innerHTML = result;
}
