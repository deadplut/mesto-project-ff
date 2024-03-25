import {cardTemplate, openCardImagePopup, placesList} from "../index";
import {deleteCardDataApi, profileObject} from "./api";


function createCard(card, deleteCardCallback, toggleLikeCallback, openPopupCallBack){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `На фотке ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like__count').textContent = card.likes.length;
  const deleteButtonElement = cardElement.querySelector('.card__delete-button')

  if (card.owner._id !== profileObject._id) {
    deleteButtonElement.remove()
  }

  cardElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('card__delete-button')) {
      deleteCardCallback(evt, card._id);
    }

    if (evt.target.classList.contains('card__like-button')) {
      toggleLikeCallback(evt);
    }
    if (evt.target.classList.contains('card__image')) {
      openPopupCallBack(evt, card);
    }
  })
  return cardElement;
}

function deleteCard(event, cardId) {
  const cardItem = event.target.closest('.card');
  deleteCardDataApi(cardId).then(() => {cardItem.remove()})

}

function toggleCardLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

function renderCards(cards) {
  cards.forEach(card => {
    placesList.append(createCard(
      card,
      deleteCard,
      toggleCardLike,
      openCardImagePopup
    ));
  })
}

function renderCard(card) {
    placesList.prepend(createCard(
      card,
      deleteCard,
      toggleCardLike,
      openCardImagePopup
    ));
}



export {createCard, deleteCard, toggleCardLike, renderCards, renderCard};