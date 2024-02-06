const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

/**
 * Ф-ция создает карточку
 * @param {Event} event
 */
const createCard = card => {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `На фотке ${card.name}`;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  placesList.append(cardElement);
}

/**
 * Ф-ция удаляет карточку
 * @param {Event} event
 */
function deleteCard(event) {
  const cardItem = event.target.closest('.card');
  cardItem.remove();
}

initialCards.forEach(createCard);
