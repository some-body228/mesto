import { togglePopup } from "./index.js";
const popupImage = document.querySelector("#image");
const popupUrl = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption")
export class Card {
  constructor(data, classSelector) {
    this._name = data.name;
    this._link = data.link;
    this._classSelector = classSelector;
    this._userCard = document.querySelector(this._classSelector);
    this._clone = this._userCard.content
      .querySelector(".elements__card")
      .cloneNode(true);
    this._cloneTitle = this._clone.querySelector(".elements__title");
    this._cloneImage = this._clone.querySelector(".elements__image");
  }

  _cardCreate() {
    this._cloneTitle.textContent = this._name;
    this._cloneImage.src = this._link;
    this._cloneImage.alt = "картинка пользователя"
    return this._clone;
  }

  _like(event) {
    event.target.classList.toggle("elements__like-button_liked");
  }

  _trash(event) {
    event.target.closest(".elements__card").remove();
  }



  _eventCreate(card) {
    card
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => { this._like(evt) });
    card
      .querySelector(".elements__trash-button")
      .addEventListener("click", (evt) => { this._trash(evt) });
    card
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        togglePopup(popupImage);
        popupUrl.src = event.target.src;
        popupUrl.alt = "Картинка пользователя"
        popupCaption.textContent =
          event.target.nextElementSibling.textContent;
      });
    return card;
  }

  cardAdd() {
    const filalCard = this._eventCreate(this._cardCreate());
    return filalCard
  }

}