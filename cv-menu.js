const cvMenu = document.querySelector(".cv-list-entry-title");
const cvParagraph = document.querySelector(".cv-list-entry-paragraph");

cvMenu.addEventListener("click", function () {
  if (cvParagraph.style.display === "none") {
    document.querySelector(".cv-list-entry-paragraph").style.display = "block";
  } else {
    document.querySelector(".cv-list-entry-paragraph").style.display = "none";
  }
});
