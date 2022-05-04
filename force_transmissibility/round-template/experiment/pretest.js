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
        "Force transmissibility of a vibrating body mounted on a base is given by",
      answers: {
        a: "1/√((1-r+sup>(2)+(2ζr)+sup>(2)",
        b: "√(1+(2πζ)+sup(2)+)/√((1-r+sup(2)++(2ζr)+sup(2)",
        c: "√(1+2πζ)/√(1-r+sup>(2)",
        d: "None of these",
      },
      correctAnswer: "a",
    },

    {
      question:
        "The equation for force given by a rotating imbalance is given by",
      answers: {
        a: "2mesin(wt)",
        b: "me+sup(2)+w+sup(2)+sin(wt)",
        c: "m+sup(2)+esin(wt)",
        d: "mew+sup(2)+sin(wt)",
      },
      correctAnswer: "d",
    },

    {
      question:
        "If the transmissibility is 1 and damping ratio is equal to 1 then what is the corresponding frequency ratio?",
      answers: {
        a: "1",
        b: "1.414",
        c: "2",
        d: "0.5",
      },
      correctAnswer: "b",
    },
    {
      question:
        "What is the amplitude of force due to an imbalance mass of 20g at a distance of 10mm rotating at 300rad/s?",
      answers: {
        a: "180N",
        b: "1.8N",
        c: "18N",
        d: "None of these",
      },
      correctAnswer: "c",
    },
  ];

  // ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
