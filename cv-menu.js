const hakkimdaBtn = document.querySelector(".hakkimda-btn");
const hakkimdaContent = document.querySelector(".hakkimda-content");

const egitimBtn = document.querySelector(".egitim-btn");
const egitimContent = document.querySelector(".egitim-content");

hakkimdaBtn.addEventListener("click", function () {
  console.log("clicked");
  if (hakkimdaContent.style.display === "block") {
    document.querySelector(".hakkimda-content").style.display = "none";
  } else {
    document.querySelector(".hakkimda-content").style.display = "block";
  }
});

egitimBtn.addEventListener("click", function () {
  console.log("clicked");
  if (egitimContent.style.display === "block") {
    document.querySelector(".egitim-content").style.display = "none";
  } else {
    document.querySelector(".egitim-content").style.display = "block";
  }
});
