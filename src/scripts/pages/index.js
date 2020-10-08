import "../../pages/index.css"
import { Card } from "../components/Card.js"
import { initialCards } from "../../vendor/cards.js"
import { FormValidator } from "../components/FormValidator.js"
import { Section } from "../components/Section.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js"
import { PopupWithImage } from "../components/PopupWithImage.js"

const popupName = document.querySelector(".popup__input[name='name']");
const popupCap = document.querySelector(".popup__input[name='caption']");

const openBtn = document.querySelector(".profile__redaction-button");

const addCardBtn = document.querySelector(".profile__button");

const userInfo = new UserInfo(".profile__user-name", ".profile__user-caption")

popupName.value = userInfo.getUserInfo().name;
popupCap.value = userInfo.getUserInfo().caption;

const popupRedct = new PopupWithForm({
  submitPopup: function (data) {
    userInfo.setUserInfo(data)
    popupRedct.close();
  }
}, "#redaction")
const popupAddCard = new PopupWithForm({
  submitPopup: function (data) {
    const card = new Card(popupImage.open.bind(popupImage), data, "#user-card");
    cards.addItem(card.addCard());
    this._form.reset()
    popupAddCard.close();
  }
}
  , "#add-card")

const popupImage = new PopupWithImage("#image")
popupImage.setEventListeners()
popupRedct.setEventListeners()
popupAddCard.setEventListeners()


const cards = new Section({
  data: initialCards,
  render: (el) => {
    const newCard = new Card(popupImage.open.bind(popupImage), el, "#user-card")
    return newCard.addCard()
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