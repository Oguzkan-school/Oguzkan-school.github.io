// const test = document.getElementById("submit"); Make JSON

// test.addEventListener("click", function () {
//   let id = parseInt(document.getElementById("id").value);
//   let name = document.getElementById("name").value;
//   let score = parseInt(document.getElementById("score").value);
//   let entryList = [];

//   for (let i = 0; i < 3; i++) {
//     let jsonData = {};
//     let jsonEntry = {};
//     jsonData["id"] = id;
//     jsonData["name"] = name;
//     jsonData["score"] = score;
//     jsonEntry["drawing"] = jsonData;
//     entryList.push(jsonEntry);
//     id++;
//     score = score + 500;
//     name = name + " again";
//   }
//   console.log(entryList);
// });

const getFromDatabase = function () {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonArray = JSON.parse(this.responseText);
      for (let i = 0; i < jsonArray.length; i++) {
        console.log(jsonArray[i].drawing);
      }
    }
  };
  let getLink =
    window.location.href.substr(0, 22) === "http://localhost:5500/"
      ? "http://localhost:8080/test"
      : "http://localhost:8080/GET";
  xhttp.open("GET", getLink, true);
  xhttp.send();
};

const postToDatabase = function () {
  // POST request
  let link =
    "https://github.com/Oguzkan-school/Oguzkan-school.github.io/blob/main/images/screen.png?raw=true";
  let xhttp = new XMLHttpRequest();
  let order = {
    idInsert: "7",
    nameInsert: "Solidus",
    scoreInsert: "1627",
    linkInsert: link,
  };
  let urlOrder = `?idInsert=${order.idInsert}&nameInsert=${order.nameInsert}&scoreInsert=${order.scoreInsert}&linkInsert=${order.linkInsert}`;
  let postLink =
    window.location.href.substr(0, 22) === "http://localhost:5500/"
      ? "http://localhost:8080/insert"
      : "http://localhost:8080/POST";
  xhttp.open("POST", postLink + urlOrder, true);

  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send();
};

getFromDatabase();
