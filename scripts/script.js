let  name = document.querySelector(".profile__user-name");
let cap = document.querySelector(".profile__user-caption");

const openBtn = document.querySelector(".profile__redaction-button");

let popupRedct = document.querySelector("#redaction");
let popupAddCard = document.querySelector("#add-card");
let popupImage = document.querySelector(".popup-image");

const exitBtn = document.querySelector(".popup__exit-button");
const saveBtn = document.querySelector(".popup__save-button");

const saveBtnAddCard = document.querySelectorAll(".popup__save-button")[1];

const exitBtnAddCard = document.querySelectorAll(".popup__exit-button")[1];

const exitBtnImage = document.querySelector(".popup__exit-button_type_image");

let formRedct = document.querySelectorAll(".popup__form")[0];
let formAddCard = document.querySelectorAll(".popup__form")[1];

let popupName = document.querySelector(".popup__input[name='user-name']");
let popupCap = document.querySelector(".popup__input[name='user-caption']");

let popupPlace = document.querySelector(".popup__input[name='place']");
let popupLink = document.querySelector(".popup__input[name='link']");

const AddCardBtn = document.querySelector(".profile__button")
let userCard = document.querySelector("#user-card")

let initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
initialCards.forEach((element,index) => cardAdd(element,index))

function cardAdd(elem){
    userCard.content.querySelector(".elements__title").textContent=elem.name
    userCard.content.querySelector(".elements__image").src = elem.link
    let clone = userCard.content.querySelector(".elements__card").cloneNode(true)
    document.querySelector(".elements__list").append(clone)
    clone.querySelector(".elements__like-button").addEventListener("click", function like(event){
        event.target.classList.toggle("elements__like-button_liked")
    })
    clone.querySelector(".elements__trash-button").addEventListener("click", function trash(event){
        event.target.parentElement.outerHTML = null
        for (let index = 0; index < initialCards.length; index++) {
            if (initialCards[index].name === event.target.parentElement.querySelector(".elements__title").textContent){
                initialCards.splice(index,1)
                break
            }

        }
    })
    clone.querySelector(".elements__image").addEventListener("click", function trash(event){
        popupToggle(popupImage)
        popupImage.firstElementChild.firstElementChild.src = event.target.src;
        popupImage.firstElementChild.firstElementChild.nextElementSibling.textContent = event.target.nextElementSibling.textContent
    })
    
    
}

function popupToggle(pop){
    pop.classList.toggle("popup_opened");
    popupPlace.value = null;
    popupLink.value = null;
    popupName.value = name.textContent;
    popupCap.value = cap.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent=popupName.value;
    cap.textContent=popupCap.value;
    popupToggle(popupRedct);

}
function formSubmitAddCard(evt) {
    evt.preventDefault();
    let card = {name: popupPlace.value, link: popupLink.value}
    initialCards.unshift(card);
    document.querySelector(".elements__list").innerHTML=""
    initialCards.forEach((element, index) => cardAdd(element, index))
    popupToggle(popupAddCard);

}
saveBtnAddCard.addEventListener("click", formSubmitAddCard);
exitBtnAddCard.addEventListener("click", function (){
    popupToggle(popupAddCard)
});
exitBtnImage.addEventListener("click", function (){
    popupToggle(popupImage)

})

AddCardBtn.addEventListener("click", function (){
    popupToggle(popupAddCard)
});
openBtn.addEventListener("click", function (){
    popupToggle(popupRedct)
});
exitBtn.addEventListener("click", function (){
    popupToggle(popupRedct)
});
formRedct.addEventListener("submit", formSubmitHandler);
formAddCard.addEventListener("submit", formSubmitHandler);


