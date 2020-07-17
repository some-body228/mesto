let  name = document.querySelector(".profile__user-name");
let cap = document.querySelector(".profile__user-caption");
let openBtn = document.querySelector(".profile__redaction-button")
let popup = document.querySelector(".popup")
let exitBtn = document.querySelector(".popup__exit-button")
let saveBtn = document.querySelector(".popup__save-button")
let form = document.querySelector(".popup__form")
function popupOpen(){
    popup.classList.add("popup_opened");
    let popup_input = popup.querySelectorAll(".popup__input");
    popup_input[0].value = name.textContent;
    popup_input[1].value = cap.textContent;
}
function popupClose(){
    popup.classList.remove("popup_opened");
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    
    let popupName = document.querySelector(".popup__input[name='user-name']");
    let popupCap = document.querySelector(".popup__input[name='user-caption']");
    name.textContent=popupName.value
    cap.textContent=popupCap.value
    popupClose()

}
openBtn.addEventListener("click", popupOpen);
exitBtn.addEventListener("click", popupClose);
form.addEventListener("submit", formSubmitHandler);



