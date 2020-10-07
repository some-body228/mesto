

export class Popup {
    constructor(popupSelector){
        this._popupSelector = popupSelector
        this.popup = document.querySelector(popupSelector)
        this._exitButton = this.popup.querySelector(".popup__exit-button");
    }
    open(){
        this.popup.classList.add("popup_opened")
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }
    close(){
        this.popup.classList.remove("popup_opened")
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
    }
    _handleEscClose(evt){
        if (evt.keyCode === 27) {
            this.close();
          }
    }
    _overlayClick(evt) {
        console.log(evt)
        if (evt.target === evt.currentTarget) {
          this.close();
        }

    }
    setEventListeners(){
        this._exitButton.addEventListener("click", this.close.bind(this))
        this.popup.addEventListener("click", this._overlayClick.bind(this))
}
}