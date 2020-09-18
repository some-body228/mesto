
import { initialCards } from "../vendor/cards.js"
import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
export const e = 1;
const name = document.querySelector(".profile__user-name");
const caption = document.querySelector(".profile__user-caption");

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
popupCap.value = caption.textContent;

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

function handleEscClick(evt) {
  if (evt.keyCode === 27) {
    togglePopup(document.querySelector(".popup.popup_opened"));
  }
}
function toggleListener(pop) {
  if (pop.classList.contains("popup_opened")) {
    document.addEventListener("keydown", handleEscClick);
  } else {
    pop.removeEventListener("keydown", handleEscClick);
  }
}
export function togglePopup(pop) {
  pop.classList.toggle("popup_opened");
  toggleListener(pop);
}
exitBtnAddCard.addEventListener("click", function () {
  togglePopup(popupAddCard);
});
exitBtnImage.addEventListener("click", function () {
  togglePopup(popupImage);
});

addCardBtn.addEventListener("click", function () {
  togglePopup(popupAddCard);
});
openBtn.addEventListener("click", function () {
  togglePopup(popupRedct);
});
exitBtn.addEventListener("click", function () {
  togglePopup(popupRedct);
});
formRedct.addEventListener("submit", formSubmitHandler);
formAddCard.addEventListener("submit", formSubmitAddCard);

function handleOverClickClose(pop) {
  pop.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      togglePopup(pop);
    }
  });
}
Array.from(document.querySelectorAll(".popup")).forEach((popup) =>
  handleOverClickClose(popup)
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
  caption.textContent = popupCap.value;
  togglePopup(popupRedct);
}
function formSubmitAddCard(evt) {
  evt.preventDefault();
  const card = new Card({ name: popupPlace.value, link: popupLink.value }, "#user-card");
  list.prepend(card.cardAdd());
  togglePopup(popupAddCard);
  popupPlace.value = null;
  popupLink.value = null;
}
