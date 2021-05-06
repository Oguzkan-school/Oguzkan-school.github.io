const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const uploadBtn = document.getElementById("uploadBtn");
const strokeWeight = document.getElementById("stroke-weight");
const color = document.getElementById("custom-color");
const colorOption = [];

let isDrawing = false;

const loadColors = function () {
  for (let i = 0; i < 8; i++) {
    colorOption.push(document.getElementById(`color_${i + 1}`));
    colorOption[i].addEventListener("click", function () {
      color.value = colorOption[i].style.backgroundColor;
    });
  }
};

const resizeCanvas = function () {
  canvas.width = 800;
  canvas.height = 600;
};

const start = function (e) {
  isDrawing = true;
  draw(e);
};

const stop = function (e) {
  isDrawing = false;
  context.beginPath();
};

const draw = function ({ clientX: x, clientY: y }) {
  if (!isDrawing) return;

  context.lineWidth = strokeWeight.value;
  context.lineCap = "round";
  context.strokeStyle = color.value;

  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
};

const clearCanvas = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const saveCanvas = function () {
  let downloadElem = document.createElement("a");
  let drawingName = document.getElementById("drawing-name").value;
  document.body.appendChild(downloadElem);
  downloadElem.href = canvas.toDataURL();
  downloadElem.download = `${
    drawingName === "Drawing Name" ? "My Drawing.png" : drawingName
  }`;
  downloadElem.click();
  document.body.removeChild(downloadElem);
};

const uploadCanvas = function () {
  let drawingName = document.getElementById("drawing-name").value;
  let baseImg = canvas.toDataURL();
  drawingName === "Drawing Name" ? "My Drawing.png" : drawingName;
  addImageToDatabase(baseImg, drawingName);
};

const getApiLink = function () {
  if (window.location.href.substr(0, 22) === "http://localhost:5500/")
    return "http://localhost:8080/test";
  else return "http://localhost:8080/GET";
};

const addImageToDatabase = function (baseImg, imgName) {
  // POST Drawing
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonForId = JSON.parse(this.responseText);
      let imgId = jsonForId[jsonForId.length - 1].drawing.id + 1;
      let imageJson = `[{id: ${imgId}, name: "${imgName}", score: 0, data:"${baseImg}"}]`;
      let xhttpPost = new XMLHttpRequest();

      xhttpPost.open(
        "POST",
        window.location.href.substr(0, 22) === "http://localhost:5500/"
          ? "http://localhost:8080/insert"
          : "http://localhost:8080/POST",
        true
      );

      xhttpPost.setRequestHeader("Content-Type", "application/json");

      xhttpPost.send(imageJson);

      xhttpPost.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200)
          if (this.response === "duplicate") console.log("duplicate name");
          else console.log("good to go");
      };
    }
  };
  xhttpGet.open("GET", getApiLink(), true);
  xhttpGet.send();
};

const writeToJson = function (imgId, imgName, baseImg, imgScore) {
  let jsonData = {};
  jsonData["id"] = imgId;
  jsonData["name"] = imgName;
  jsonData["score"] = imgScore;
  jsonData["data"] = baseImg;
  return jsonData;
};

resizeCanvas();

window.addEventListener("onload", loadColors());
window.addEventListener("resize", resizeCanvas());
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);
clearBtn.addEventListener("click", clearCanvas);
saveBtn.addEventListener("click", saveCanvas);
uploadBtn.addEventListener("click", uploadCanvas);
