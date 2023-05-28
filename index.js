import { saveLocal, getFromLocal, deleteInLocal } from "./localstorage.js";
const numbers = document.querySelectorAll(".digits");
const inputScreen = document.querySelector(".displayinput");
const outputScreen = document.querySelector(".displayoutput");
const historyScreen = document.querySelector(".history");
const equals = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const historyBtn = document.querySelector(".historybtn");
const mainTab = document.querySelector(".maintab");
let string = "";
// get history from local storage and display on history
window.addEventListener("DOMContentLoaded", () => {
  const historyArray = getFromLocal();
  addHistoryBlock(historyArray);
  deleteEvent();
});

// addHistoryBlock Function
function addHistoryBlock(array) {
  for (const object of array) {
    const input = object.input;
    const output = object.output;
    const historyBlock = document.createElement("div");
    historyBlock.innerHTML = `<div class="historyBlock border-secondary m-md-2 m-1 border-1 border">
      <button class="trashbtn btn rounded-0 text-center fs-6 btn-danger"><i class="fa-solid fa-trash"></i></button>
      <div class="historyinput  bg-dark text-end text-white fs-5 p-lg-2 p-1  w-100">${input}</div>
      <div class="historyoutput bg-dark text-end text-white fs-5 p-lg-2 p-1  w-100">${output}</div>
  </div>`;
    historyScreen.appendChild(historyBlock);
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    showUserInput(number.textContent);
  });
});


function showUserInput(numberVal) {
  if (numberVal === "x") {
    numberVal = "*";
  } 
  string = string + numberVal;
  inputScreen.textContent = string;
  const res = calculate();
  outputScreen.textContent = res;
}




deleteButton.addEventListener("click", () => {
  string = string.slice(0, string.length - 1);
  inputScreen.textContent = string;
});

function calculate() {
  if (string[0] === "0") {
    string = string.substring(1);
  }
  const result = eval(string);
  return result;
}

clear.addEventListener("click", () => {
  inputScreen.textContent = "0";
  outputScreen.textContent = `0`;
  string = ``;
});

equals.addEventListener("click", () => {
  const res = calculate();
  outputScreen.textContent = res;
  saveLocal({
    input: inputScreen.textContent,
    output: outputScreen.textContent,
  });
  const historyArray = getFromLocal();
  historyScreen.textContent = "";
  addHistoryBlock(historyArray);
  deleteEvent();
});

// when client hits history button
historyBtn.addEventListener("click", () => {
  historyVisible();
});
// historyVisible
function historyVisible() {
  mainTab.classList.toggle("fit");
  historyScreen.classList.toggle("visible");
  if (historyScreen.innerHTML.trim() === "") {
    historyScreen.innerHTML = `<h2 class="text-white text-center m-auto mt-5 fs-3">No Records</h2>`;
  }
}

// event triggers when client hits trash button in history
function deleteEvent() {
  const trashButtons = document.querySelectorAll(".trashbtn");

  // when client hits trash button
  trashButtons.forEach((button) => {
    button.addEventListener(`click`, () => {
      const parentDisplay = button.parentElement;
      parentDisplay.remove();
      deleteInLocal({
        input: parentDisplay.children[1].innerHTML,
        output: parentDisplay.children[2].innerHTML,
      });
      if (historyScreen.textContent.trim() === "") {
        historyScreen.innerHTML = `<h2 class="text-white text-center m-auto mt-5 fs-3">No Records</h2>`;
      }
    });
  });
}
