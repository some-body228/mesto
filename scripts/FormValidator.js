export class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
  }


  _showInputError(form, input, errorMesage) {
    const errorEl = form.querySelector(`#${input.id}-error`);
    errorEl.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
    errorEl.textContent = errorMesage;
  };
  _hideInputError(form, input) {
    const errorEl = form.querySelector(`#${input.id}-error`);
    errorEl.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
    errorEl.textContent = "";
  };
  _checkInputValidity(form, input) {
    if (input.validity.valid) {
      this._hideInputError(form, input);
    } else {
      this._showInputError(form, input, input.validationMessage);
    }
  };
  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
  };
  _toggleButtonState(inputList, formButton) {
    if (this._hasInvalidInput(inputList)) {
      formButton.setAttribute("disabled", true);
      formButton.classList.add(this._inactiveButtonClass);
    } else {
      formButton.removeAttribute("disabled");
      formButton.classList.remove(this._inactiveButtonClass);
    }
  };
  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const formButton = form.querySelector(this._submitButtonSelector);
    inputList.forEach((input) => {
      this._checkInputValidity(form, input);
      this._toggleButtonState(inputList, formButton);
      input.addEventListener("input", () => {
        this._checkInputValidity(form, input);
        this._toggleButtonState(inputList, formButton);
      });

      form.addEventListener("submit", (evt) => {
        this._checkInputValidity(form, input);
        this._toggleButtonState(inputList, formButton);
      });
    });

  };
  enableValidation() {
    this._setEventListeners(this._form);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  };
}