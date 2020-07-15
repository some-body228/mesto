let  name = document.querySelector(".profile__user-name");
let cap = document.querySelector(".profile__user-caption");
let open_btn = document.querySelector(".profile__redaction-button")
let popup = document.querySelector(".popup")
let exit_btn = document.querySelector(".popup__exit-button")
let save_btn = document.querySelector(".popup__save-button")
let form = document.querySelector(".popup__form")
function popup_open(){
    if(popup.classList.length > 1){
        return
    }
    console.log(popup.className);
    popup.className=popup.className + " popup_opened";
    console.log(popup.className);
    let popup_input = popup.querySelectorAll(".popup__input");
    popup_input[0].value = name.textContent;
    popup_input[1].value = cap.textContent;
}
function popup_close(){
    popup.className="popup";
    console.log(popup.className);
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    let popup_input = popup.querySelectorAll(".popup__input");
    name.textContent=popup_input[0].value
    cap.textContent=popup_input[1].value
    popup_close()

}
open_btn.addEventListener("click", popup_open);
exit_btn.addEventListener("click", popup_close);
form.addEventListener("submit", formSubmitHandler);



