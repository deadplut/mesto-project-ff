import {closePopupByClick, closePopupByEscape} from "./modal";
import {cardTemplate} from "../index";

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard(card, deleteCardCallback){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `На фотке ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('card__delete-button')) {
      deleteCardCallback(evt);
    }

    if (evt.target.classList.contains('card__like-button')) {
      toggleCardLike(evt);
    }
    if (evt.target.classList.contains('card__image')) {
      openCardImagePopup(evt, card);
    }
  })
  return cardElement;
}

function deleteCard(event) {
  const cardItem = event.target.closest('.card');
  cardItem.remove();
}

function toggleCardLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

function openCardImagePopup(event, card) {
  const element = document.querySelector('.popup_type_image');
  element.classList.add('popup_is-opened')
  element.querySelector('.popup__image').src = card.link;
  element.querySelector('.popup__image').alt =`На фотке ${card.name}`;
  element.querySelector('.popup__caption').textContent = card.name;
  element.addEventListener('click', closePopupByClick)
  document.addEventListener('keydown', closePopupByEscape)

}


export {initialCards, createCard, deleteCard};