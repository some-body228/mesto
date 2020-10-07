
import { Card } from "./Card.js"
import { initialCards } from "../vendor/cards.js"
import { FormValidator } from "./FormValidator.js"
import { Section } from "./Section.js"
import { Popup } from "./Popup.js"
import { PopupWithForm } from "./PopupWithForm.js"
import { UserInfo } from "./UserInfo.js"
import { PopupWithImage } from "./PopupWithImage.js"
import '../pages/index.css';
const userInfo = new UserInfo (".profile__user-name", ".profile__user-caption")

console.log(userInfo)
const popupRedct = new PopupWithForm({submitPopup: function (evt) {
  evt.preventDefault();
  userInfo.setUserInfo({name:popupName.value, caption: popupCap.value})
  popupRedct.close();},
  getInfo: userInfo.getUserInfo.bind(userInfo)
},"#redaction")
const popupAddCard = new PopupWithForm({submitPopup: function (evt) {
  evt.preventDefault();
  const card = new Card({handleCardClick: popupImage.open.bind(popupImage)}, { name: popupPlace.value, link: popupLink.value }, "#user-card");
  list.prepend(card.cardAdd());
  popupAddCard.close();
},
getInfo: userInfo.getUserInfo.bind(userInfo)
},"#add-card")

const popupImage = new PopupWithImage("#image")
popupImage.setEventListeners()
popupRedct.setEventListeners()
popupAddCard.setEventListeners()


const popupName = document.querySelector(".popup__input[name='user-name']");
const popupCap = document.querySelector(".popup__input[name='user-caption']");


const popupPlace = document.querySelector(".popup__input[name='place']");
const popupLink = document.querySelector(".popup__input[name='link']");


const openBtn = document.querySelector(".profile__redaction-button");


const list = document.querySelector(".elements__list");







const addCardBtn = document.querySelector(".profile__button");








const cards = new Section({
  data: initialCards, 
  render: (el) => {
    const newCard = new Card({handleCardClick: popupImage.open.bind(popupImage)}, el, "#user-card")
    return newCard.cardAdd()
  }
  
},
".elements__list"
)
cards.renderer()




addCardBtn.addEventListener("click", function () {
popupAddCard.open();
});
openBtn.addEventListener("click", function () {
  popupRedct.open();
});

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