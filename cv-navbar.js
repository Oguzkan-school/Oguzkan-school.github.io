window.scrollTo(0, 0);

const basNav = document.querySelector(".bas-nav");
const hakkimdaNav = document.querySelector(".hakkimda-nav");
const egitimNav = document.querySelector(".egitim-nav");
const programNav = document.querySelector(".program-nav");
const projeNav = document.querySelector(".proje-nav");
const hobiNav = document.querySelector(".hobi-nav");
const dilNav = document.querySelector(".dil-nav");
const iletisimNav = document.querySelector(".iletisim-nav");

const hakkimdaPosition = document
  .getElementById("hakkimda-id")
  .getBoundingClientRect();
const egitimPosition = document
  .getElementById("egitim-id")
  .getBoundingClientRect();
const programPosition = document
  .getElementById("program-id")
  .getBoundingClientRect();
const projePosition = document
  .getElementById("proje-id")
  .getBoundingClientRect();
const iletisimPosition = document
  .getElementById("iletisim-id")
  .getBoundingClientRect();
const hobiPosition = document.getElementById("hobi-id").getBoundingClientRect();
const dilPosition = document.getElementById("dil-id").getBoundingClientRect();

window.onscroll = function () {
  scrollFunction();
};

const scrollFunction = function () {};

basNav.addEventListener("click", function () {
  document.documentElement.scrollTop = 0;
});

hakkimdaNav.addEventListener("click", function () {
  window.scrollTo(0, hakkimdaPosition.y - 110);
});

egitimNav.addEventListener("click", function () {
  window.scrollTo(0, egitimPosition.y - 110);
});

programNav.addEventListener("click", function () {
  window.scrollTo(0, programPosition.y - 110);
});

projeNav.addEventListener("click", function () {
  window.scrollTo(0, projePosition.y - 110);
});

iletisimNav.addEventListener("click", function () {
  window.scrollTo(0, iletisimPosition.y - 110);
});

hobiNav.addEventListener("click", function () {
  window.scrollTo(0, hobiPosition.y - 110);
});

dilNav.addEventListener("click", function () {
  window.scrollTo(0, dilPosition.y - 110);
});
