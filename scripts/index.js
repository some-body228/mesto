import {initialCards} from "../vendor/cards.js"   
import {Card} from "./Card.js" 
import {FormValidator} from "./FormValidator.js" 
  
const name = document.querySelector(".profile__user-name");
const cap = document.querySelector(".profile__user-caption");

const openBtn = document.querySelector(".profile__redaction-button");

const popupRedct = document.querySelector("#redaction");
const popupAddCard = document.querySelector("#add-card");
const popupImage = document.querySelector("#image");

const list = document.querySelector(".elements__list");

const exitBtn = popupRedct.querySelector(".popup__exit-button");

const exitBtnAddCard = popupAddCard.querySelector(".popup__exit-button");

const exitBtnImage = document.querySelector(".popup__exit-button_type_image");

const formRedct = popupRedct.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");

const popupName = document.querySelector(".popup__input[name='user-name']");
const popupCap = document.querySelector(".popup__input[name='user-caption']");

const popupPlace = document.querySelector(".popup__input[name='place']");
const popupLink = document.querySelector(".popup__input[name='link']");

const addCardBtn = document.querySelector(".profile__button");
const userCard = document.querySelector("#user-card");

popupName.value = name.textContent;
popupCap.value = cap.textContent;

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formEl) => {
    const form = new FormValidator({
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__save-button",
      inactiveButtonClass: "popup__save-button_disabled",
      inputErrorClass: "popup__input_invalid",
      errorClass: "popup__error_active",
    }, formEl)
    form.enableValidation()
  })

function setListeners(pop) {
  if (pop.includes("popup_opened")) {
  }
}
function clickClose(evt) {
  if (evt.keyCode === 27) {
    popupToggle(document.querySelector(".popup.popup_opened"));
  }
}
function listenerToggle(pop) {
  if (pop.classList.contains("popup_opened")) {
    document.addEventListener("keydown", clickClose);
  } else {
    pop.removeEventListener("keydown", clickClose);
  }
}
function popupToggle(pop) {
  pop.classList.toggle("popup_opened");
  listenerToggle(pop);
}
exitBtnAddCard.addEventListener("click", function () {
  popupToggle(popupAddCard);
});
exitBtnImage.addEventListener("click", function () {
  popupToggle(popupImage);
});

addCardBtn.addEventListener("click", function () {
  popupToggle(popupAddCard);
});
openBtn.addEventListener("click", function () {
  popupToggle(popupRedct);
});
exitBtn.addEventListener("click", function () {
  popupToggle(popupRedct);
});
formRedct.addEventListener("submit", formSubmitHandler);
formAddCard.addEventListener("submit", formSubmitAddCard);

function overClose(pop) {
  pop.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      popupToggle(pop);
    }
  });
}
Array.from(document.querySelectorAll(".popup")).forEach((popup) =>
  overClose(popup)
);

function renderCards(cards) {
  cards.forEach((el) => {
    const newCard = new Card(el, "#user-card")
    list.prepend(newCard.cardAdd());
  });
}
renderCards(initialCards);

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = popupName.value;
  cap.textContent = popupCap.value;
  popupToggle(popupRedct);
}
function formSubmitAddCard(evt) {
  evt.preventDefault();
  const card = new Card({ name: popupPlace.value, link: popupLink.value }, "#user-card");
  list.prepend(card.cardAdd());
  popupToggle(popupAddCard);
  popupPlace.value = null;
  popupLink.value = null;
}
