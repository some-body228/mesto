import "./index.css"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Popup } from "../components/Popup.js";
import { Api } from "../components/Api.js";
const popupConfirm = new Popup("#confirm");

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "8e87a5dc-6c3c-4389-85a0-676a9403f4b5",
    "Content-Type": "application/json",
  },
});
popupConfirm.setEventListeners();
const popupConfirmBtn = document
  .querySelector("#confirm")
  .querySelector(".popup__save-button");
const popupConfirmExitBtn = document
  .querySelector("#confirm")
  .querySelector(".popup__exit-button");

const popupName = document.querySelector(".popup__input[name='name']");
const popupCap = document.querySelector(".popup__input[name='caption']");

const openBtn = document.querySelector(".profile__redaction-button");

const addCardBtn = document.querySelector(".profile__button");

const avatar = document.querySelector(".profile__avatar");

const popupLink = document.querySelector(".popup__input[name='linkAvatar']");
const userInfo = new UserInfo(
  ".profile__user-name",
  ".profile__user-caption",
  ".profile__avatar"
);
const avatarBtn = document.querySelector(".profile__avatar-redaction");

const list = document.querySelector(".elements__list");

const addCardSubmitBtn = document
  .querySelector("#add-card")
  .querySelector(".popup__save-button");
const avatarSubmitBtn = document
  .querySelector("#avatar")
  .querySelector(".popup__save-button");
const reductSubmitBtn = document
  .querySelector("#redaction")
  .querySelector(".popup__save-button");

const initCard = (el, templateSelector) => {
  const newCard = new Card(
    popupImage.open.bind(popupImage),
    el,
    templateSelector,
    (evt, id) => {
      popupConfirm.open();
      popupConfirmBtn.addEventListener("click", function closePopup() {
        api
          .deleteCard(id)
          .then(() => {
            newCard.removeCard(evt);
            popupConfirm.close();
            popupConfirmBtn.removeEventListener("click", closePopup);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
  return newCard;
};

function setLoader(button, caption) {
  button.textContent = caption;
}
Promise.all([api.getName(), api.getInitialCards()])
  .then((values) => {
    const [userData, initialCards] = values;

    userInfo.setUserInfo({ name: userData.name, caption: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    popupName.value = userInfo.getUserInfo().name;
    popupCap.value = userInfo.getUserInfo().caption;

    const cards = new Section(
      {
        data: initialCards,
        render: (el) => {
          let templateSelector = "#other-card";
          if (userData._id === el.owner._id) {
            templateSelector = "#user-card";
          }
          const newCard = initCard(el, templateSelector);
          return newCard.addCard();
        },
      },
      ".elements__list"
    );
    cards.renderer();
  })
  .catch((err) => {
    console.log(err);
  });

const popupAvatar = new PopupWithForm(function (data) {
  setLoader(avatarSubmitBtn, "Сохранение...");
  api
    .patchAvatar(data.linkAvatar)
    .then(() => {
      popupAvatar.close();
      avatar.src = data.linkAvatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader(avatarSubmitBtn, "Сохранить");
    });
}, "#avatar");

const popupRedct = new PopupWithForm(function (data) {
  popupRedct.close();
  userInfo.setUserInfo({ name: data.name, caption: data.caption });
  popupName.value = userInfo.getUserInfo().name;
  popupCap.value = userInfo.getUserInfo().caption;
  setLoader(reductSubmitBtn, "Сохранение...");
  api
    .patchName({
      name: popupName.value,
      about: popupCap.value,
    })
    .finally(() => {
      setLoader(reductSubmitBtn, "Сохранить");
    });
}, "#redaction");
const popupAddCard = new PopupWithForm(function (data) {
  setLoader(addCardSubmitBtn, "Создание...");
  api
    .postCard({
      name: data.place,
      link: data.link,
    })
    .then((res) => {
      const newCard = initCard(res, "#user-card");

      list.prepend(newCard.addCard());
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader(addCardSubmitBtn, "Создать");
    });
}, "#add-card");

const popupImage = new PopupWithImage("#image");
popupImage.setEventListeners();
popupRedct.setEventListeners();
popupAddCard.setEventListeners();
popupAvatar.setEventListeners();

avatarBtn.addEventListener("click", function () {
  popupAvatar.open();
});
addCardBtn.addEventListener("click", function () {
  popupAddCard.open();
});
openBtn.addEventListener("click", function () {
  popupRedct.open();
});

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formEl) => {
  const form = new FormValidator(
    {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__save-button",
      inactiveButtonClass: "popup__save-button_disabled",
      inputErrorClass: "popup__input_invalid",
      errorClass: "popup__error_active",
    },
    formEl
  );
  form.enableValidation();
});
