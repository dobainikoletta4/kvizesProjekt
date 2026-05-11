//Persze megölöm tóth krisztofer lászló családját 😊
let quizData = [
  {
    question: "Az alábbiak közül melyik a budapesti Szabadságszobor?",
    options: [
      {src:"nkepek/b.jpg", label:"sz"},
      {src:"nkepek/a.jpg", label:"a"},
      {src:"nkepek/c.jpg", label:"vauvau"},
      {src:"nkepek/d.jpg", label:"r"}
    ],
    correct: "sz",
  },
  {
    question: "Az alábbiak küzöl melyik a Lánchíd?",
    options: [
      {src:"nkepek/f.jpg", label:"nig"},
      {src:"nkepek/e.jpg", label:"y"},
      {src:"nkepek/g.webp", label:"g3"},
      {src:"nkepek/h.jpg", label:"h4"}
    ],
    correct: "y",
  },
  {
    question: "Melyik a Parlament?",
    options: [
      {src:"nkepek/j.jpg", label:"ahh"},
      {src:"nkepek/k.jpg", label:"k"},
      {src:"nkepek/L.jpg", label:"t"},
      {src:"nkepek/m.jpg", label:"f"}
    ],
    correct: "ahh",
  },
  {
    question: "Az alábbiak közül melyik a tatabányai Csónakázó-tó?",
    options: [
      {src:"nkepek/a1.avif", label:"w"},
      {src:"nkepek/a2.jpg", label:"dniggerniggerniggerniggerniggernigger"},
      {src:"nkepek/a3.jpg", label:"g3"},
      {src:"nkepek/a4.jpg", label:"f4"}
    ],
    correct: "w",
  },
  {
    question: "Melyik a Ranzinger Vince-kilátó?",
    options: [
      {src:"nkepek/b1.jpg", label:"g"},
      {src:"nkepek/b2.jpg", label:"gasda"},
      {src:"nkepek/b3.jpg", label:"gfgd"},
      {src:"nkepek/b4.jpg", label:"gb4"}
    ],
    correct: "g",
  },
  
  {
    question: "Melyik képen látható Tel Aviv városa?",
    options: [
      {src:"nkepek/c1.jpg", label:"q"},
      {src:"nkepek/c2.jpg", label:"qagfg"},
      {src:"nkepek/c3.jpg", label:"qttt"},
      {src:"nkepek/c4.jpg", label:"qer"}
    ],
    correct: "q",
  },
  {
    question: "Tatai vár?",
    options: [
      {src:"nkepek/d1.jpg", label:"d1"},
      {src:"nkepek/d2.jpg", label:"AAAAHHHHHHH"},
      {src:"nkepek/d3.jpg", label:"NIGGER"},
      {src:"nkepek/d4.jpg", label:"d4HMMM "}
    ],
    correct: "d1",
  },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 5;
let timerInterval;
let answered = false;
const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes shimmer {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes flashIn {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(styleTag);


const progressContainer = document.createElement("div");
progressContainer.style.cssText = `
  max-width: 900px;
  margin: 16px auto 0;
  padding: 0 16px;
  display: none;
`;
progressContainer.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
    <span style="font-family: Roboto, sans-serif; font-size: 14px; font-weight: bold; color: #1d3557;">Haladás</span>
    <span id="progress-percent" style="font-family: Roboto, sans-serif; font-size: 14px; font-weight: bold; color: #1d3557;">0%</span>
  </div>
  <div style="
    background: #dce8f5;
    border-radius: 999px;
    height: 22px;
    overflow: hidden;
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.15), inset 0 -2px 4px rgba(255,255,255,0.4);
    position: relative;
  ">
    <div id="progress-bar" style="
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #1565c0, #1e88e5, #42a5f5);
      background-size: 200% 100%;
      border-radius: 999px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(30, 136, 229, 0.5), inset 0 1px 2px rgba(255,255,255,0.3);
      animation: shimmer 2s linear infinite;
      position: relative;
    ">
      <div style="
        position: absolute;
        top: 3px; left: 10px; right: 10px; bottom: 50%;
        background: rgba(255,255,255,0.25);
        border-radius: 999px;
      "></div>
    </div>
  </div>
`;
quizContainer.parentNode.insertBefore(progressContainer, quizContainer);

const updateProgress = () => {
  const percent = Math.round((questionNumber / MAX_QUESTIONS) * 100);
  const bar = document.getElementById("progress-bar");
  const label = document.getElementById("progress-percent");
  if (bar) bar.style.width = percent + "%";
  if (label) label.textContent = percent + "%";
};


const showFailOverlay = () => {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    z-index: 9999;
    background: black;
    animation: flashIn 10s ease forwards;
  `;
  const img = document.createElement("img");
  img.src = "nkepek/f2.jpg";
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `;
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 10000);
};



const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (let i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

const checkAnswer = (e) => {
  if (answered) return;
answered = true;
  const btn = e.target.closest("button");
  let userAnswer = btn.dataset.label;

  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  document.querySelectorAll(".quiz-container .option").forEach((o) => {
    o.classList.add("disabled");
  });
          setTimeout(() => {
  displayNextQuestion();
}, 1000);
};

const createQuestion = () => {
  answered = false;
  clearInterval(timerInterval);
  updateProgress();

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");
  timerDisplay.textContent = `hátramaradt idő: 10 másodperc`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `hátramaradt idő: ${secondsLeft.toString().padStart(2, "0")} másodperc`;
    secondsLeft--;
    if (secondsLeft < 3) timerDisplay.classList.add("danger");
    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  shuffleArray(quizData[questionNumber].options).forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    const img = document.createElement("img");
    img.src = o.src;
    img.alt = o.label;
    img.width = 200;
    option.appendChild(img);
    option.dataset.label = o.label;
    option.addEventListener("click", checkAnswer);
    options.appendChild(option);
  });
};

const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();
  updateProgress();
  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
  progressContainer.style.display = "block";
};

const displayQuizResult = () => {

  questionNumber = MAX_QUESTIONS;
  updateProgress();

  const showResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    progressContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `${score} / ${MAX_QUESTIONS} pontot szereztél.`;
    quizResult.appendChild(resultHeading);

    for (let i = 0; i < MAX_QUESTIONS; i++) {
      const resultItem = document.createElement("div");
      resultItem.classList.add("question-container");
      const userAnswer = localStorage.getItem(`userAnswer_${i}`);
      const correctAnswer = quizData[i].correct;
      const answeredCorrectly = userAnswer === correctAnswer;

      if (!answeredCorrectly) resultItem.classList.add("incorrect");
      else resultItem.classList.add("correct");

      resultItem.innerHTML = `
        <div class="question">${i + 1}. kérdés: ${quizData[i].question}</div>
        <div class="result-status">${answeredCorrectly ? "✅ " : "❌"}</div>
      `;
      quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Újra";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
  };

  if (score === 0) {
    showFailOverlay();
    setTimeout(showResult, 10500); 
  } else {
    showResult();
  }
};

const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }
  questionNumber++;
  createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);
  nextBtn.style.display = "none";
startBtn.addEventListener("click", () => {

  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  progressContainer.style.display = "block"; 
  createQuestion();
});