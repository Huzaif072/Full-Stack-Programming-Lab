// Questions, options and their answers
var question1 = "What does HTML stand for?";
var options1 = ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"];
var answer1 = "Hyper Text Markup Language";

var question2 = "Which language is used for styling web pages?";
var options2 = ["Python", "CSS", "Java", "C++"];
var answer2 = "CSS";

var question3 = "What does 'DOM' stand for in JavaScript?";
var options3 = ["Document Object Model", "Data Object Manager", "Digital Ordinance Model", "Document Order Mode"];
var answer3 = "Document Object Model";

var question4 = "Which symbol is used for single-line comments in JavaScript?";
var options4 = ["<!-- -->", "//", "/* */", "#"];
var answer4 = "//";

var question5 = "What keyword is used to declare a variable in JavaScript?";
var options5 = ["dim", "int", "var", "string"];
var answer5 = "var";


// Render questions into the DOM
function renderQuestion(questionNum, questionText, optionsArr) {
    document.getElementById("q" + questionNum + "-text").textContent = "Q" + questionNum + ". " + questionText;

    var optionsContainer = document.getElementById("q" + questionNum + "-options");
    optionsContainer.innerHTML = "";

    for (var i = 0; i < optionsArr.length; i++) {
        var label = document.createElement("label");

        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "q" + questionNum;
        radio.value = optionsArr[i];

        label.appendChild(radio);
        label.appendChild(document.createTextNode(optionsArr[i]));
        optionsContainer.appendChild(label);
    }
}

// Render all questions
renderQuestion(1, question1, options1);
renderQuestion(2, question2, options2);
renderQuestion(3, question3, options3);
renderQuestion(4, question4, options4);
renderQuestion(5, question5, options5);


// Check answer
function checkAnswer(questionNum, correctAnswer) {
    var selected = document.querySelector('input[name="q' + questionNum + '"]:checked');
    var feedbackEl = document.getElementById("q" + questionNum + "-feedback");

    if (!selected) {
        feedbackEl.textContent = "Not answered";
        feedbackEl.className = "feedback incorrect";
        return 0;
    }

    if (selected.value === correctAnswer) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "feedback correct";
        return 1;
    } else {
        feedbackEl.textContent = "Wrong! Correct answer: " + correctAnswer;
        feedbackEl.className = "feedback incorrect";
        return 0;
    }
}


// Calculate total score
function calculateScore() {
    var score = 0;
    score += checkAnswer(1, answer1);
    score += checkAnswer(2, answer2);
    score += checkAnswer(3, answer3);
    score += checkAnswer(4, answer4);
    score += checkAnswer(5, answer5);
    return score;
}


// Submit quiz
function submitQuiz() {
    var totalScore = calculateScore();
    var totalQuestions = 5;
    var resultDiv = document.getElementById("result");

    resultDiv.style.display = "block";
    resultDiv.className = "result";

    if (totalScore === totalQuestions) {
        resultDiv.textContent = "Perfect Score! You got " + totalScore + "/" + totalQuestions + "!";
        resultDiv.classList.add("excellent");
    } else if (totalScore >= 3) {
        resultDiv.textContent = "Good job! You scored " + totalScore + "/" + totalQuestions + ".";
        resultDiv.classList.add("good");
    } else if (totalScore >= 1) {
        resultDiv.textContent = "You scored " + totalScore + "/" + totalQuestions + ". Keep practicing!";
        resultDiv.classList.add("poor");
    } else {
        resultDiv.textContent = "You scored 0/" + totalQuestions + ". Better luck next time!";
        resultDiv.classList.add("poor");
    }
}


// Reset quiz
function resetQuiz() {
    // Clear all radio selections
    var radios = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // Clear all feedback messages
    for (var q = 1; q <= 5; q++) {
        var feedbackEl = document.getElementById("q" + q + "-feedback");
        feedbackEl.textContent = "";
        feedbackEl.className = "feedback";
    }

    // Hide result
    var resultDiv = document.getElementById("result");
    resultDiv.style.display = "none";
    resultDiv.textContent = "";
    resultDiv.className = "result";
}
