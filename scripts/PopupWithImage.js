import {Popup} from "./Popup.js"

export class PopupWithImage extends Popup {
    constructor(popupSelector, popup){
        super(popupSelector, popup)
        this.popup = document.querySelector(popupSelector);
        this._popupUrl = this.popup.querySelector(".popup__image");
        this._popupCaption = this.popup.querySelector(".popup__caption")
    }
    open(caption, imageUrl){
        console.log(caption)
        console.log(this.popup)
        this._popupUrl.src = imageUrl;
        this._popupUrl.alt = "Картинка пользователя"
        this._popupCaption.textContent = caption;
        super.open()
    }
}