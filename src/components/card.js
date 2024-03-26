import {cardTemplate, openCardImagePopup, placesList} from "../index";
import {deleteCardDataApi, deleteLikeDataApi, logError, profileObject, putLikeDataApi} from "./api";


function createCard(card, deleteCardCallback, toggleLikeCallback, openPopupCallBack){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const likeCountElement = cardElement.querySelector('.card__like__count')
  const deleteButtonElement = cardElement.querySelector('.card__delete-button')
  const likeButtonElement = cardElement.querySelector('.card__like-button')


  cardElement.querySelector('.card__image').src = card.link
  cardElement.querySelector('.card__image').alt = `На фотке ${card.name}`
  cardElement.querySelector('.card__title').textContent = card.name

  likeCountElement.textContent = card.likes.length

  if (card.owner._id !== profileObject._id) {
    deleteButtonElement.remove()
  }

  setCardLike(likeButtonElement, card)

  cardElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('card__delete-button')) {
      deleteCardCallback(evt, card._id)
    }

    if (evt.target.classList.contains('card__like-button')) {
      toggleLikeCallback(evt, card, likeCountElement)
    }
    if (evt.target.classList.contains('card__image')) {
      openPopupCallBack(evt, card)
    }
  })
  return cardElement;
}

function deleteCard(event, cardId) {
  const cardItem = event.target.closest('.card');
  deleteCardDataApi(cardId)
    .then(() => {cardItem.remove()})
    .catch(logError)
}

function toggleCardLike(event, card, likeCountElement) {
  updateCardLikeData(event, card)
    .then(response => {
      event.target.classList.toggle('card__like-button_is-active')
      likeCountElement.textContent = response.likes.length;
  })
    .catch(logError)
}

function setCardLike(likeButtonElement, card) {
      const isCardLiked =  card.likes.some( like => like._id === profileObject._id)
      if (isCardLiked)
         likeButtonElement.classList.add('card__like-button_is-active')
}

function updateCardLikeData(event, card) {
  if (event.target.classList.contains('card__like-button_is-active')){
    return deleteLikeDataApi(card._id)
  }
  return putLikeDataApi(card._id)
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