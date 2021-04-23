const time = document.getElementById("time");
const easyStartButton = document.getElementById("easy-start");
const mediumStartButton = document.getElementById("medium-start");
const difficultStartButton = document.getElementById("difficult-start");
const targetColor = document.getElementById("target-color");
let answerColor,
  createdRow,
  answerJ,
  answerI,
  score = 0;

const randomizeColor = function () {
  let color = "";
  Math.floor(Math.random() * 256).toString(16);
  for (let t = 0; t < 3; t++) {
    let sub = Math.floor(Math.random() * 256).toString(16);
    color += sub.length == 1 ? "0" + sub : sub;
  }

  return "#" + color;
};

const preparation = function (difficulty) {
  answerJ = Math.trunc(Math.random() * difficulty);
  answerI = Math.trunc(Math.random() * difficulty);

  answerColor = randomizeColor();
  targetColor.style.backgroundColor = answerColor;
};

easyStartButton.addEventListener("click", function () {
  GameCreation(3);
});

mediumStartButton.addEventListener("click", function () {
  GameCreation(4);
});

difficultStartButton.addEventListener("click", function () {
  GameCreation(5);
});

const GameCreation = function (size) {
  let rowName = 1;
  easyStartButton.classList.add("hidden");
  mediumStartButton.classList.add("hidden");
  difficultStartButton.classList.add("hidden");
  gameStart();
  let difficultyName;
  switch (size) {
    case 3:
      difficultyName = "easy";
      break;
    case 4:
      difficultyName = "medium";
      break;
    case 5:
      difficultyName = "difficult";
      break;
  }

  for (let j = 0; j < size * size; j++) {
    let count = 0;
    rowName = "row-" + String(j + 1);

    switch (size) {
      case 3:
        createdRow = document.createElement("div");
        createdRow.classList.add("row");
        document.getElementById("easy-modal").appendChild(createdRow);
        createdRow.setAttribute("id", rowName);
        break;
      default:
        for (let y = 0; y < size; y++) {
          createdRow = document.createElement("div");
          createdRow.classList.add("row");
          document
            .getElementById(difficultyName + "-modal-" + String(y + 1))
            .appendChild(createdRow);
          createdRow.setAttribute("id", rowName + "-" + String(y + 1));
        }
        rowName = rowName + "-";
        break;
    }

    for (let i = 0; i < size * size; i++) {
      let createdDiv = document.createElement("div");

      createdDiv.classList.add("answer-color");
      switch (size) {
        case 3:
          createdDiv.classList.add("col-1");
          break;
        case 4:
          createdDiv.classList.add("col-3");
          break;
        case 5:
          createdDiv.classList.add("col-2");
          break;
      }
      createdDiv.setAttribute(
        "id",
        "col-" + String(j + 1) + "-" + String(i + 1)
      );

      createdDiv.addEventListener("click", function () {
        if (
          document.getElementById("col-" + String(j + 1) + "-" + String(i + 1))
            .style.backgroundColor === targetColor.style.backgroundColor
        )
          victory(difficultyName);
      });
      switch (size) {
        case 3:
          document.getElementById(rowName).appendChild(createdDiv);
          break;
        default:
          if (i % size === 0) count++;
          document
            .getElementById(rowName + String(count))
            .appendChild(createdDiv);
          break;
      }
    }
  }
  if (size != 3)
    for (let i = 0; i < size; i++) {
      document.getElementById(
        "row-" + String(size * size) + "-" + String(i + 1)
      ).style.marginBottom = "50px";
    }
  GameRandomizer(size * size);
};

const GameRandomizer = function (difficulty) {
  preparation(difficulty);
  for (let j = 0; j < difficulty; j++) {
    for (let i = 0; i < difficulty; i++) {
      let randomColor = randomizeColor();

      if (i === answerI && j === answerJ) {
        document.getElementById(
          "col-" + String(j + 1) + "-" + String(i + 1)
        ).style.backgroundColor = answerColor;
      } else {
        document.getElementById(
          "col-" + String(j + 1) + "-" + String(i + 1)
        ).style.backgroundColor = randomColor;
      }
    }
  }
};

const gameStart = function () {
  score = 0;
  document.getElementById("time-container").classList.remove("hidden");
  let displayTime = setInterval(function () {
    time.textContent = time.textContent - 1;
    if (parseInt(time.textContent) === 0) clearInterval(displayTime);
  }, 1000);

  let countDown = setTimeout(function () {
    clearInterval(displayTime);
    document.getElementById("time-container").classList.add("hidden");
    document.getElementById("game-score").textContent = String(score);
    document.getElementById("finish").classList.remove("hidden");
    document.getElementById("game-screen").classList.add("hidden");
  }, 60000);
};

const victory = function (difficulty) {
  score++;
  switch (difficulty) {
    case "easy":
      GameRandomizer(9);
      break;
    case "medium":
      GameRandomizer(16);
      break;
    case "difficult":
      GameRandomizer(25);
      break;
  }
};
