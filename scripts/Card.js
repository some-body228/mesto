const popupImage = document.querySelector("#image");  
export class Card {
  constructor(data, classSelector){
    this._name = data.name;
    this._link = data.link;
    this._classSelector = classSelector
  }
  _cardCreate() {
    const userCard = document.querySelector(this._classSelector);
    userCard.content.querySelector(".elements__title").textContent = this._name;
    userCard.content.querySelector(".elements__image").src = this._link;
    const clone = userCard.content
      .querySelector(".elements__card")
      .cloneNode(true);
    return clone;
  }
  _like(event) {
    event.target.classList.toggle("elements__like-button_liked");
  }
  _trash(event) {
    event.target.closest(".elements__card").remove();
  }
  _openPop(event) {
    popupImage.classList.toggle("popup_opened");
    if (Array.from(popupImage.classList).includes("popup_opened")) {
      document.addEventListener("keydown", (evt) => {
      if (evt.keyCode === 27) {
        Array.from(document.querySelectorAll(".popup")).forEach((pop) =>
          pop.classList.remove("popup_opened")
        );
      }
    });
    } else {
      popupImage.removeEventListener("keydown", (evt) => {
        if (evt.keyCode === 27) {
          Array.from(document.querySelectorAll(".popup")).forEach((pop) =>
            pop.classList.remove("popup_opened")
          );
        }
      });
    }
    popupImage.querySelector(".popup__image").src = event.target.src;
    popupImage.querySelector(".popup__caption").textContent =
      event.target.nextElementSibling.textContent;
  }
  _eventCreate(card) {
    card
      .querySelector(".elements__like-button")
      .addEventListener("click", (evt) => {this._like(evt)});
    card
      .querySelector(".elements__trash-button")
      .addEventListener("click",(evt) => {this._trash(evt)});
    card
      .querySelector(".elements__image")
      .addEventListener("click", (evt) => {this._openPop(evt)});
    return card;
  }
  cardAdd() {
    const filalCard = this._eventCreate(this._cardCreate());
    return filalCard
  }
  
}