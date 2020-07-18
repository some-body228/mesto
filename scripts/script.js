let  name = document.querySelector(".profile__user-name");
let cap = document.querySelector(".profile__user-caption");
let openBtn = document.querySelector(".profile__redaction-button");
let popup = document.querySelector(".popup");
let exitBtn = document.querySelector(".popup__exit-button");
let saveBtn = document.querySelector(".popup__save-button");
let form = document.querySelector(".popup__form");
let popupName = document.querySelector(".popup__input[name='user-name']");
let popupCap = document.querySelector(".popup__input[name='user-caption']");
function popupOpenClose(){
    if (popup.classList.contains("popup_opened")){
        popup.classList.remove("popup_opened");
    } else {
        popup.classList.add("popup_opened");
        popupName.value = name.textContent;
        popupCap.value = cap.textContent;
    }
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent=popupName.value;
    cap.textContent=popupCap.value;
    popupOpenClose();

}
openBtn.addEventListener("click", popupOpenClose);
exitBtn.addEventListener("click", popupOpenClose);
form.addEventListener("submit", formSubmitHandler);



