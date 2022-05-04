
// Don't touch the below code

(function() {
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
      question: "A vertical shaft supports a flywheel. A shaft with a diameter of 50 mm is fastened at both ends. The flywheel has a mass of 500 kg, a modulus of rigidity of 80 GN/m2 for the shaft material, and a gyration radius of 0.5 m. Determine the natural frequency of torsional vibrations.",
      answers: {
        a: "5.32",
        b: "5.86",
        c: "5.65",
        d: "6.66"
      },
      correctAnswer: "a"
    },

    {
      question: "Calculate the free torsional vibration frequency of a single motor system from the data: \n c = 8 GN/m2, L=9 m, I = 600 Kg-m2, J = 8×104 m4",
      answers: {
        a: "162132 Hz",
        b: "172132 Hz",
        c: "182132 Hz",
        d: "192132 Hz"
      },
      correctAnswer: "b"
    },

    {
      question: "A shaft transmits a power of 40 kW at a speed of 75/π. The torque needed in the shaft is",
      answers: {
        a: "266.67 Nm",
        b: "270 Nm",
        c: "263.33 Nm",
        d: "260 Nm"
      },
      correctAnswer: "a"
    },
    {
      question: "A disc with mass moment of inertia I is attached to a shaft with torsional stiffness q. The natural frequency of free torsional vibration is",
      answers: {
        a: "2π√qI",
        b: "2π√1/qI",
        c: "√qI / 2π",
        d: "√q / (2π√I)"
      },
      correctAnswer: "d"
    },
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
