var startButton = document.getElementById('start');
startButton.addEventListener('click', loadDoc);


function loadDoc() {
    var filepath = "./assets/data/finalquiz.xml";

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            displayQuiz(ajax);
        }
    };

    ajax.open('GET', filepath, true);
    ajax.send();
}

function displayQuiz(ajax) {
    var xmlDoc = ajax.responseXML;

    var quiz = '<h2>Javascript Final Quiz</h2>';
    var x = xmlDoc.getElementsByTagName('question');

    for (let i = 0; i < x.length; i++) {
        var thisQNumber = x[i].getElementsByTagName('qnumber')[0].childNodes[0].nodeValue;
        var thisQTitle = x[i].getElementsByTagName('qtitle')[0].childNodes[0].nodeValue;
        var thisQA = x[i].getElementsByTagName('a')[0].childNodes[0].nodeValue;
        var thisQB = x[i].getElementsByTagName('b')[0].childNodes[0].nodeValue;
        var thisQC = x[i].getElementsByTagName('c')[0].childNodes[0].nodeValue;
        var thisQD = x[i].getElementsByTagName('d')[0].childNodes[0].nodeValue;

        quiz += '<h3> Question ' + thisQNumber + '</h3>';
        quiz += '<h3> ' + thisQTitle + '</h3>';
        quiz += '<label>';
        quiz += '<input type="radio" name = "question' + thisQNumber+'[]" value="' +thisQNumber+'A">';
        quiz += '<span> a) '+thisQA+'</span>';
        quiz += '</label>';
        quiz += '<label>';
        quiz += '<input type="radio" name = "question' + thisQNumber+'[]" value="' +thisQNumber+'B">';
        quiz += '<span> b) '+thisQB+'</span>';
        quiz += '</label>';
        quiz += '<label>';
        quiz += '<input type="radio" name = "question' + thisQNumber+'[]" value="' +thisQNumber+'C">';
        quiz += '<span> c) '+thisQC+'</span>';
        quiz += '</label>';
        quiz += '<label>';
        quiz += '<input type="radio" name = "question' + thisQNumber+'[]" value="' +thisQNumber+'D">';
        quiz += '<span> d) '+thisQD+'</span>';
        quiz += '</label>';
    }

    quiz += '<br> <button onclick =\"calculateResults()\"> Calculate my Results </button>';

    document.getElementById('quiz').innerHTML = quiz;
}

function calculateResults() {
    var results = 0;
    var displayResults = "";
    var grade = "";
    var question1 = document.querySelector('input[name = "question1[]"]:checked');
    var question2 = document.querySelector('input[name = "question2[]"]:checked');
    var question3 = document.querySelector('input[name = "question3[]"]:checked');
    var question4 = document.querySelector('input[name = "question4[]"]:checked');
    var question5 = document.querySelector('input[name = "question5[]"]:checked');

    if (question1.value == '1B' ){
        results++;
    }

    if (question2.value == '2A' ){
        results++;
    }

    if (question3.value == '3D' ){
        results++;
    }

    if (question4.value == '4A' ){
        results++;
    }

    if (question5.value == '5C' ){
        results++;
    }

    switch (results){
        case 1:
            grade = "F";
            break;
        
        case 2:
            grade = "F";
            break;

        case 3:
            grade = "C-";
            break;

        case 4:
            grade = "B-";
            break;

        case 5:
            grade = "A+";
            break;

        default :
        break;
    }


    displayResults += 'Your Results are ' + results + '/5. Your final grade is ' + grade;

    document.getElementById('results').innerHTML = displayResults;
}