import { Popup } from "./Popup.js"; 
export class Card {
  constructor({handleCardClick}, data, classSelector) {
    this._name = data.name;
    this._link = data.link;
    this._classSelector = classSelector;
    this._handleCardClick = handleCardClick;
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
      .addEventListener("click", () => this._handleCardClick(caption,imageUrl));
    return card;
  }

  cardAdd() {
    const filalCard = this._eventCreate(this._cardCreate());
    return filalCard
  }

}