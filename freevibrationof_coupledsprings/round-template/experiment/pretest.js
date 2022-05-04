// Don't touch the below code

(function () {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // Don't touch the above code

  // Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question:
        "Expression for equivalent stiffness of the system when a mass is attached between two springs whose stiffnesses are k<sub>1</sub> and k<sub>2</sub> respectively?",
      answers: {
        a: "k'+sub('eq')+'=k'+sub(1)'+'k'+sub(2)",
        b: "k'+sub('eq')+'=k'+sub(1)'+'+k'+sub(2)",
        c: "k'+sub('eq')+'=k'+sub(1)'+'/k'+sub(2)",
        d: "None of the above",
      },
      correctAnswer: "b",
    },

    {
      question:
        "What is the expression for restoring force when both springs are displaced by a distance x?",
      answers: {
        a: "2k' + sub(1) + 'k' + sub(2) + 'x",
        b: "k' + sub(1) + 'x+k' + sub(2) + 'x",
        c: "2k' + sub(1) + 'x' + '+k' + sub(2) + 'x",
        d: "2k' + sub(1) + 'x' + '-k' + sub(2) + 'x",
      },
      correctAnswer: "b",
    },

    {
      question:
        "In a coupled spring mass system where the mass is attached between two spings, if the stiffness of the springs are 5N/m and 7N/m respectively, find the equivalent stiffness of the system(in N/m)",
      answers: {
        a: "35",
        b: "12",
        c: "2",
        d: "7",
      },
      correctAnswer: "b",
    },
    {
      question:
        "The number of cycles per unit time is called the _____ of vibration.",
      answers: {
        a: "Resonance",
        b: "Frequency",
        c: "Periodic Motion",
        d: "Time Period",
      },
      correctAnswer: "b",
    },
    {
      question: "A body is said to undergo free vibration, when?",
      answers: {
        a: "It vibrates in free space",
        b: "It vibrates freely with no force acting on it",
        c: "The force causing the initial displacement is removed",
        d: "It vibrates freely with no resistive force acting on it",
      },
      correctAnswer: "b",
    },
  ];

  // ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
