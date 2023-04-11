const section = document.querySelector("section");
const container = document.querySelector(".container");
const startBtn = document.querySelector(".start-btn");
const name = document.querySelector(".name");
const navbar = document.querySelector(".navbar");
const level = document.querySelector(".level span");
const bestScore = document.querySelector(".best-score span");
let counter = 1;
bestScore.textContent = "0";

const arr = [];
let ansCount = 0;
let result;
let nextLevelElm;
let lostGame;
let laugh;
let game;
let mainScore;

// LOGIC FUNCTIONS
startBtn.addEventListener("click", handleStart);

function reloadFunctions() {
  container.style.display = "flex";
  randomNum();
  randOperation();
  nearResult();
  renderGame();
  renderTest();
  ansCount = 0;
}

function randomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

function randOperation() {
  const operations = ["+", "-", "*"];
  const randIdx = Math.floor(Math.random() * operations.length);
  return operations[randIdx];
}

function nearResult() {
  let idx = Math.floor(Math.random() * arr.length);
  return arr[ansCount];
}

// RENDER FUNCTIONS

function renderGame() {
  [...container.children].forEach((elm) => elm.remove());

  game = document.createElement("div");
  game.classList.add("game");
  const num = document.createElement("div");
  const operation = document.createElement("div");
  const num2 = document.createElement("div");

  num.classList.add("num");
  operation.classList.add("operation");
  num2.classList.add("num");

  num.textContent = randomNum();
  num2.textContent = randomNum();
  operation.textContent = randOperation();

  result = eval(
    `${num.textContent}${operation.textContent}${num2.textContent}`
  );
  arr.splice(0);

  // laugh = document.createElement("div");
  // if (operation.textContent === "+") {
  //   laugh.classList.add("win");
  //   laugh.textContent = "Shuni ham topa olmadingmi 🤣";
  // } else {
  //   laugh.textContent = "";
  // }

  game.append(num, operation, num2);
  container.appendChild(game);
}

function renderTest() {
  const testElm = document.createElement("div");

  testElm.classList.add("test");

  for (let i = 1; i <= 4; i++) {
    const btn = document.createElement("button");
    btn.classList.add("btn", `btn${i}`);

    testElm.appendChild(btn);
  }
  let idx = Math.floor(Math.random() * testElm.children.length);

  testElm.children[idx].textContent = result;
  testElm.children[idx].classList.add("answer");
  testElm.children[idx].addEventListener("click", () => {
    testElm.children[idx].classList.add("winner");
    for (let elm of testElm.children) {
      elm.style.pointerEvents = "none";
    }
    setTimeout(() => {
      nextLevelElm = document.createElement("button");
      nextLevelElm.textContent = "Next level ->";
      nextLevelElm.classList.add("event");
      nextLevelElm.addEventListener("click", () => {
        nextLevelElm.style.pointerEvents = "none";
        handleNextLevel();
      });

      section.appendChild(nextLevelElm);
    }, 1000);
  });

  console.log(result);
  for (let item of testElm.children) {
    if (!item.classList.contains("answer")) {
      // console.log(item.textContent);
      arr.push(+result - 2, +result + 2, +result - 1);
      item.textContent = arr[ansCount];
      ansCount++;

      item.addEventListener("click", () => {
        item.style.backgroundColor = "red";
        testElm.children[idx].classList.add("winner");

        for (let elm of testElm.children) {
          elm.style.pointerEvents = "none";
        }
        setTimeout(() => {
          document.body.style.backgroundColor = "#fff";
          container.style.display = "none";
          section.style.display = "none";

          const score = document.createElement("div");
          bestScore.textContent = counter - 1;
          score.classList.add("score");
          score.textContent = `Your Best Score: ${counter - 1}`;

          name.style.display = "none";
          navbar.style.display = "none";
          lostGame = document.createElement("div");
          lostGame.classList.add("lose-game");

          const loseElm = document.createElement("h1");
          loseElm.classList.add("lose");
          loseElm.textContent = "You Lost 😔";

          const resetBtn = document.createElement("button");
          resetBtn.textContent = "Restart Game";
          resetBtn.classList.add("event");
          resetBtn.addEventListener("click", handleResetGame);

          lostGame.append(score, loseElm, resetBtn);
          document.body.appendChild(lostGame);
        }, 1000);
      });
    }
  }

  container.appendChild(testElm);
}

// HANDLE FUNCTIONS

function handleResetGame() {
  lostGame.style.display = "none";
  reloadFunctions();
  document.body.style.backgroundColor = "rgb(97, 97, 240)";
  section.style.display = "grid";
  name.style.display = "block";
  navbar.style.display = "flex";

  counter = 1;
  level.textContent = counter;
}

function handleNextLevel() {
  reloadFunctions();
  nextLevelElm.remove();
  counter++;
  level.textContent = counter;
}

function handleStart(e) {
  document.body.style.backgroundColor = "rgb(97, 97, 240)";
  e.target.remove();
  reloadFunctions();
  name.style.display = "block";
  navbar.style.display = "flex";
}
