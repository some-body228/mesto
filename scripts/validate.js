const showInputError = function(form, input, errorMesage){
    const errorEl = form.querySelector(`#${input.id}-error`)
    errorEl.classList.add(set.errorClass)
    input.classList.add(set.inputErrorClass)
    errorEl.textContent = errorMesage
}
const hideInputError = function(form, input){
    const errorEl = form.querySelector(`#${input.id}-error`)
    errorEl.classList.remove(set.errorClass)
    input.classList.remove(set.inputErrorClass)
    errorEl.textContent = ''
}
const checkInputValidity = function(form,input){
    if(input.validity.valid){
        hideInputError(form, input)
    } else {
        showInputError(form, input, input.validationMessage)
    }
}
const hasInvalidInput = function (inputList) {
    return inputList.some((input) =>  !input.validity.valid)
}
const toggleButtonState = function(inputList,formButton){
    if (hasInvalidInput(inputList)){
        formButton.setAttribute("disabled",true)
        formButton.classList.add(set.inactiveButtonClass)
    }else{
        formButton.removeAttribute("disabled")
        formButton.classList.remove(set.inactiveButtonClass)
    }
}
const setEventListeners = function(form){
    const inputList= Array.from(form.querySelectorAll(set.inputSelector))
    const formButton = form.querySelector(set.submitButtonSelector)
    inputList.forEach((input) =>{
        checkInputValidity(form, input)
        input.addEventListener("input", function(){
            checkInputValidity(form, input)
            toggleButtonState(inputList, formButton)
        })
    checkInputValidity(form, input)
    toggleButtonState(inputList, formButton)
    })
}
const enableValidation = function(obj) {
    set = obj 
    const formList = Array.from(document.querySelectorAll(set.formSelector))
    formList.forEach(form => {
        setEventListeners(form)
        addEventListener("submit", function(evt){
            evt.preventDefault();
        })
    })
}
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_active'
  })
