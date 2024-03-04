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

function createCard(card, deleteCardCallback, toggleLikeCallabck, openPopupCallBack){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `На фотке ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('card__delete-button')) {
      deleteCardCallback(evt);
    }

    if (evt.target.classList.contains('card__like-button')) {
      toggleLikeCallabck(evt);
    }
    if (evt.target.classList.contains('card__image')) {
      openPopupCallBack(evt, card);
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



export {initialCards, createCard, deleteCard, toggleCardLike};