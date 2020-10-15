import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }
  open(caption, imageUrl) {
    this._popupImage.src = imageUrl;
    this._popupImage.alt = caption;
    this._popupCaption.textContent = caption;
    super.open();
  }
}
