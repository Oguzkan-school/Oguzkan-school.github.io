const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", function () {
  document.querySelector(".side-nav").style.width = "250px";
  document.querySelector(".close-btn").style.display = "block";
});

closeBtn.addEventListener("click", function () {
  document.querySelector(".side-nav").style.width = "0";
  document.querySelector(".close-btn").style.display = "none";
});
