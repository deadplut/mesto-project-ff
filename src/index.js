import './pages/index.css';
import {initialCards} from './components/cards.js';

import { createCard, deleteCard, toggleCardLike} from './components/card.js';
import {closePopupByClick, closePopupByEscape, openPopup, setOpenedPopup} from "./components/modal";
import {handleCardFormSubmit, handleProfileFormSubmit} from "./components/forms";




const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');


initialCards.forEach((card) => {
  placesList.append(createCard(
    card,
    deleteCard,
    toggleCardLike,
    openCardImagePopup
  ));

})


const contentElement = document.querySelector('.content');
const formElementProfile = document.forms['edit-profile'];
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.description;
const profileTitleElement = document.querySelector('.profile__title');
const profileDescElement = document.querySelector('.profile__description');

const formElementCard = document.forms['new-place'];
const placeNameInput = formElementCard.elements['place-name'];
const linkInput = formElementCard.elements.link;

contentElement.addEventListener('click', evt =>{

  if (evt.target.classList.contains('profile__edit-button')) {
    const element = document.querySelector('.popup_type_edit');
    nameInput.value = profileTitleElement.textContent
    jobInput.value =  profileDescElement.textContent
    openPopup(element)
  }
  else if (evt.target.classList.contains('profile__add-button')) {
    const element = document.querySelector('.popup_type_new-card');
    openPopup(element)
  }
})


formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementCard.addEventListener('submit', handleCardFormSubmit);


function openCardImagePopup(evt, card) {
  const element = document.querySelector('.popup_type_image');
  openPopup(element);
  element.querySelector('.popup__image').src = card.link;
  element.querySelector('.popup__image').alt =`На фотке ${card.name}`;
  element.querySelector('.popup__caption').textContent = card.name;
  element.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByEscape);

}



export {
  cardTemplate,
  profileTitleElement,
  profileDescElement,
  nameInput,
  jobInput,
  placeNameInput,
  linkInput,
  placesList,
  openCardImagePopup
}

