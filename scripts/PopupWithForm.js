import {Popup} from "./Popup.js"



const popupName = document.querySelector(".popup__input[name='user-name']");
const popupCap = document.querySelector(".popup__input[name='user-caption']");


const popupPlace = document.querySelector(".popup__input[name='place']");
const popupLink = document.querySelector(".popup__input[name='link']");

export class PopupWithForm extends Popup {
    constructor( {submitPopup, getInfo}, popupSelector, popup){
        super(popupSelector, popup)
        this._submitPopup = submitPopup
        this._getInfo = getInfo
        this._form = this.popup.querySelector(".popup__form")
    }
    _getInputValues() {
        popupName.value = this._getInfo().name;
        popupCap.value = this._getInfo().caption;
    }
    setEventListeners(){
        super.setEventListeners()
        this._form.addEventListener("submit", this._submitPopup.bind(this))
    }
    close(){
        super.close()
        popupPlace.value = null;
        popupLink.value = null;
    }
    open(){
        super.open()
        this._getInputValues()
    }
}