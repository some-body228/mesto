import { Popup } from "./Popup.js"


export class PopupWithForm extends Popup {
    constructor(submitPopup, popupSelector) {
        super(popupSelector)
        this._submitPopup = submitPopup
        this._form = this._popup.querySelector(".popup__form")
    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitPopup(this._getInputValues())
        })
    }
    close() {
        super.close()
        this._form.reset()
    }
}