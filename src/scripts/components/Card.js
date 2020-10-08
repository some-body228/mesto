export class Card {
  constructor(handleCardClick, data, classSelector) {
    this._place = data.place;
    this._link = data.link;
    this._classSelector = classSelector;
    this._handleCardClick = handleCardClick;
    this._userCard = document.querySelector(this._classSelector);
  }

  _createCard() {
    const clone = this._userCard.content
      .querySelector(".elements__card")
      .cloneNode(true);
    const cloneTitle = clone.querySelector(".elements__title");
    const cloneImage = clone.querySelector(".elements__image");
    cloneTitle.textContent = this._place;
    cloneImage.src = this._link;
    cloneImage.alt = this._place
    return clone;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("elements__like-button_liked");
  }

  _handleTrashButton(event) {
    event.target.closest(".elements__card").remove();
  }


  _createEvent(card) {
    const caption = card.querySelector(".elements__title").textContent
    const imageUrl = card.querySelector(".elements__image").src
    card
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => { this._handleLikeButton(evt) });
    card
      .querySelector(".elements__trash-button")
      .addEventListener("click", (evt) => { this._handleTrashButton(evt) });
    card
      .querySelector(".elements__image")
      .addEventListener("click", () => this._handleCardClick(caption, imageUrl));
    return card;
  }

  addCard() {
    const filalCard = this._createEvent(this._createCard());
    return filalCard
  }

}