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
    const clone = this._userCard.content
      .querySelector(".elements__card")
      .cloneNode(true);
    const cloneTitle = clone.querySelector(".elements__title");
    const cloneImage = clone.querySelector(".elements__image");
    cloneTitle.textContent = this._name;
    cloneImage.src = this._link;
    cloneImage.alt = "картинка пользователя"
    return clone;
  }

  _like(event) {
    event.target.classList.toggle("elements__like-button_liked");
  }

  _trash(event) {
    event.target.closest(".elements__card").remove();
  }
  _openPopup(imageUrl, caption) {
    togglePopup(popupImage);
    console.log(caption)
    popupUrl.src = imageUrl;
    popupUrl.alt = "Картинка пользователя"
    popupCaption.textContent = caption;
  }


  _eventCreate(card) {
    const caption = card.querySelector(".elements__title").textContent
    const imageUrl = card.querySelector(".elements__image").src
    card
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => { this._like(evt) });
    card
      .querySelector(".elements__trash-button")
      .addEventListener("click", (evt) => { this._trash(evt) });
    card
      .querySelector(".elements__image")
      .addEventListener("click", () => this._openPopup(imageUrl, caption));
    return card;
  }

  cardAdd() {
    const filalCard = this._eventCreate(this._cardCreate());
    return filalCard
  }

}