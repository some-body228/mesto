const ESC_KEYCODE = 27;

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._exitButton = this._popup.querySelector(".popup__exit-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this.close();
    }
  }
  _overlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._exitButton.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", this._overlayClick.bind(this));
  }
}
