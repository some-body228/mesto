const  name = document.querySelector(".profile__user-name");
const cap = document.querySelector(".profile__user-caption");

const openBtn = document.querySelector(".profile__redaction-button");

const popupRedct = document.querySelector("#redaction");
const popupAddCard = document.querySelector("#add-card");
const popupImage = document.querySelector("#image");

const list = document.querySelector(".elements__list");

const exitBtn = popupRedct.querySelector(".popup__exit-button");

const saveBtnAddCard = popupAddCard.querySelector(".popup__save-button");

const exitBtnAddCard = popupAddCard.querySelector(".popup__exit-button");

const exitBtnImage = document.querySelector(".popup__exit-button_type_image");

const formRedct = popupRedct.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");

const popupName = document.querySelector(".popup__input[name='user-name']");
const popupCap = document.querySelector(".popup__input[name='user-caption']");

const popupPlace = document.querySelector(".popup__input[name='place']");
const popupLink = document.querySelector(".popup__input[name='link']");

const addCardBtn = document.querySelector(".profile__button")
const userCard = document.querySelector("#user-card")


popupName.value = name.textContent;
popupCap.value = cap.textContent;

function cardAdd(card){
        const filalCard = eventCreate(cardCreate(card))
        list.prepend(filalCard);
}

function cardCreate(elem){
    userCard.content.querySelector(".elements__title").textContent=elem.name
    userCard.content.querySelector(".elements__image").src = elem.link
    const clone = userCard.content.querySelector(".elements__card").cloneNode(true)
    return clone  
}
function eventCreate(card){
    card.querySelector(".elements__like-button").addEventListener("click", function like(event){
        event.target.classList.toggle("elements__like-button_liked")
    })
    card.querySelector(".elements__trash-button").addEventListener("click", function trash(event){
        event.target.closest(".elements__card").outerHTML = null
    })
    card.querySelector(".elements__image").addEventListener("click", function trash(event){
        popupToggle(popupImage)
        popupImage.firstElementChild.firstElementChild.src = event.target.src;
        popupImage.firstElementChild.firstElementChild.nextElementSibling.textContent = event.target.nextElementSibling.textContent
    })
    return card
}
function renderCards(cards) {
    cards.forEach((el) => {
        cardAdd(el)
    })
}

renderCards(initialCards);

function popupToggle(pop){
    pop.classList.toggle("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent=popupName.value;
    cap.textContent=popupCap.value;
    popupToggle(popupRedct);

}
function formSubmitAddCard(evt) {
    evt.preventDefault();
    const card = {name: popupPlace.value, link: popupLink.value}
    cardAdd(card)
    popupToggle(popupAddCard);
    popupPlace.value = null;
    popupLink.value = null;
}
exitBtnAddCard.addEventListener("click", function (){
    popupToggle(popupAddCard)
});
exitBtnImage.addEventListener("click", function (){
    popupToggle(popupImage)

})

addCardBtn.addEventListener("click", function (){
    popupToggle(popupAddCard)
});
openBtn.addEventListener("click", function (){
    popupToggle(popupRedct)
});
exitBtn.addEventListener("click", function (){
    popupToggle(popupRedct)
});
formRedct.addEventListener("submit", formSubmitHandler);
formAddCard.addEventListener("submit", formSubmitAddCard);


