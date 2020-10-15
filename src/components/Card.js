import { api } from "../pages/index.js";
export class Card {
  constructor(handleCardClick, data, classSelector, handleTrash) {
    this._place = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._classSelector = classSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrash = handleTrash;
    this._userCard = document.querySelector(this._classSelector);
  }

  _getTemplate() {
    return this._userCard.content
      .querySelector(".elements__card")
      .cloneNode(true);
  }
  getView() {
    const clone = this._getTemplate();
    const cloneTitle = clone.querySelector(".elements__title");
    const cloneImage = clone.querySelector(".elements__image");
    this._likeNumber = clone.querySelector(".elements__like-number");
    this._likeNumber.textContent = this._likes.length;
    cloneTitle.textContent = this._place;
    cloneImage.src = this._link;
    cloneImage.alt = this._place;
    return clone;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("elements__like-button_liked");
    if (event.target.classList.contains("elements__like-button_liked")) {
      api
        .likeCard(this._id)
        .then((res) => {
          this._likeNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .dislikeCard(this._id)
        .then((res) => {
          this._likeNumber.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  removeCard(evt) {
    evt.target.closest(".elements__card").remove();
  }

  _createEvent(card) {
    const caption = card.querySelector(".elements__title").textContent;
    const imageUrl = card.querySelector(".elements__image").src;
    card
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeButton(evt);
      });
    card
      .querySelector(".elements__trash-button")
      .addEventListener("click", (evt) => {
        this._handleTrash(evt, this._id);
      });
    card
      .querySelector(".elements__image")
      .addEventListener("click", () =>
        this._handleCardClick(caption, imageUrl)
      );
    return card;
  }

  addCard() {
    const filalCard = this._createEvent(this.getView());
    return filalCard;
  }
}
