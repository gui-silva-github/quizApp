/* Creating the questions and acumulating in a variable:
    Inside of this variable will contain a array "[]" with object "{}";
    In the "{}" will appear 2 attributes: the question and answers (that also contain a object "{}" with 2 attributes - text and correct -> presenting a boolean value);
*/

const questions = [
    {
        question: "Which is the largest animal in the World?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the World?",
            answers: [
                { text: "Vatican City", correct: true},
                { text: "Buthan", correct: false},
                { text: "Nepal", correct: false},
                { text: "Shri Lanka", correct: false},
            ]
    },
    {
        question: "Which is the largest desert in the World?",
            answers: [
                { text: "Kalahari", correct: false},
                { text: "Gobi", correct: false},
                { text: "Sahara", correct: false},
                { text: "Antarctica", correct: true},
            ]
    },
    {
        question: "Which is the smallest continent in the World?",
            answers: [
                { text: "Asia", correct: false},
                { text: "Australia", correct: true},
                { text: "Arctic", correct: false},
                { text: "Africa", correct: false},
            ]
    },
    {
        question: "In which year did the Titanic sink?",
            answers: [
                { text: "1910", correct: false},
                { text: "1911", correct: false},
                { text: "1912", correct: true},
                { text: "1913", correct: false},
            ]
    },
    {
        question: "Who is the author of the play 'Romeo and Juliet'?",
            answers: [
                { text: "Clarice Lispector", correct: false},
                { text: "Edgar Allan Poe", correct: false},
                { text: "William Shakespeare", correct: true},
                { text: "Fiódor Dostoiévski", correct: false},
            ]
    },
    {
        question: "What is the largest planet in our solar system?",
            answers: [
                { text: "Jupiter", correct: true},
                { text: "Neptune", correct: false},
                { text: "Uranus", correct: false},
                { text: "Earth", correct: false},
            ]
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
            answers: [
                { text: "Isaac Newton", correct: false},
                { text: "Albert Einstein", correct: true},
                { text: "Louis Pasteur", correct: false},
                { text: "Charles Darwin", correct: false},
            ]
    },
    {
        question: "In which country did the Olympic Games originate?",
            answers: [
                { text: "France", correct: false},
                { text: "Italy", correct: false},
                { text: "Australia", correct: false},
                { text: "Greece", correct: true},
            ]
    },
    {
        question: "What is the longest river in the world?",
            answers: [
                { text: "Amazon River", correct: false},
                { text: "Nile River", correct: true},
                { text: "Yangtze River", correct: false},
                { text: "Mississippi River", correct: false},
            ]
    },
];

// Taking the elements that will need to manipulate

// The question that need to appear to the user and change moment by moment

const question = document.getElementById('question');

// Answers that appear depending the question requested

const answersBtn = document.getElementById('answer');

// The button that allow the user change, going to the next question

const next = document.getElementById('next');

/* In this moment, we have the necessary elements and questions with answers to offer
in this quiz
*/

// So, the current question, must be the first [0] and the score is 0

let currentQuestionIndex = 0;
let score = 0;

// To start the quiz, we have to make a function that helps show the question

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    // And the next button can receive the text "next"

    next.innerHTML = "Next";

    // Lately, in the goal to show the question, a function is called

    showQuestion();
};

// Making the function to show

function showQuestion(){

    // We need to clear the pattern in index.html and in fact, show the question

    resetState(); // This function is called to clean the pattern in the HTML

    let currentQuestion = questions[currentQuestionIndex]; // a question will take because of the index
    let questionNo = currentQuestionIndex + 1; // number of the question, remember that starts in 0

    // Adding the question for his attribute

    question.innerHTML = questionNo + ". " + currentQuestion.question;

    // So, it's time to show the answers through a loop of the answer

    currentQuestion.answers.forEach(answer =>{

        const button = document.createElement('button'); // creating the button
        button.innerHTML = answer.text; // putting the text on the button
        button.classList.add('btn'); // inserting a class btn in this button
        answersBtn.appendChild(button); // taking this button to the answersBtn
        if (answer.correct){ // case this answer have true
            button.dataset.correct = answer.correct; // the button will receive this attribute correct
        };
        button.addEventListener("click", selectAnswer); // case this button be clicked it will acionate another function to verify the answer
    });

};

function resetState(){

    next.style.display = "none"; // Display is none, because since you didn't chose the answer, following isn't allowed

    while (answersBtn.firstChild){ // while the answer have firstChild
        answersBtn.removeChild(answersBtn.firstChild); // remove this firstChild
    }

};

// Checking the answer

function selectAnswer(e){

    const selectedBtn = e.target; // the button selected is the one who receive the event
    const isCorrect = selectedBtn.dataset.correct === 'true'; // checking if the selected button have the attribute with value "true"

    if (isCorrect){ // case this is a true
        selectedBtn.classList.add('correct'); // receive the class correct
        score++; // and there's a score increase
    } else { // otherwise
        selectedBtn.classList.add('incorrect'); // receive the class incorrect
    };

    // for each btn that has the answerBtn as your parent

    Array.from(answersBtn.children).forEach(button =>{
        if (button.dataset.correct === 'true'){ // if have the attribute with value "true"
            button.classList.add('correct'); // receive the class correct
        }
        button.disabled = true; // and all the btns receive a disabled to verify the answer
    });

    next.style.display = 'block'; // the button to change the question is showed

};

next.addEventListener('click', () =>{ // if this button is clicked it will trigger this scopes
    if (currentQuestionIndex < questions.length){ // if the index be less than the length of the variable questions
        handleNextButton(); // handle with another function
    } else { // otherwise
        startQuiz(); // start again the quiz
    };
});

// handling with the next

function handleNextButton(){
    currentQuestionIndex++; // increasing the index
    if (currentQuestionIndex < questions.length){ // if the index be less than the length of the variable questions
        showQuestion(); // show another question
    } else {
        showScore(); // it will trigger another function
    }
};

function showScore(){

    resetState(); // reset the pattern

    // presenting the score
    question.innerHTML = `You scored ${score} out of ${questions.length}! <br> ${score*10}% of the ${(questions.length)*10}%!`;

    // renew the button next through the "Play Again"
    next.innerHTML = "Play Again";
    next.style.display = "block"; // show this button
}

// initializing the quiz
startQuiz();