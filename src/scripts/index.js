import '../pages/index.css';
import { initialCards } from './cards.js';




const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (card, deleteCardCallback) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `На фотке ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardCallback);
  return cardElement;
}

function deleteCard(event) {
  const cardItem = event.target.closest('.card');
  cardItem.remove();
}


initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
})