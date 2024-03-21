import './pages/index.css';
import {initialCards} from './components/cards.js';

import { createCard, deleteCard, toggleCardLike } from './components/card.js';
import { openPopup } from "./components/modal";
import { handleCardFormSubmit, handleProfileFormSubmit } from "./components/forms";
import {clearValidation, enableValidation} from "./components/validation";


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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

contentElement.addEventListener('click', evt =>{

  if (evt.target.classList.contains('profile__edit-button')) {
    const element = document.querySelector('.popup_type_edit');
    nameInput.value = profileTitleElement.textContent
    jobInput.value =  profileDescElement.textContent
    clearValidation(formElementProfile, validationConfig)
    openPopup(element)

  }
  else if (evt.target.classList.contains('profile__add-button')) {
    const element = document.querySelector('.popup_type_new-card');
    placeNameInput.value =''
    linkInput.value = ''
    openPopup(element)
    clearValidation(formElementCard, validationConfig)
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
}

enableValidation(validationConfig)


export {
  cardTemplate,
  profileTitleElement,
  profileDescElement,
  nameInput,
  jobInput,
  placeNameInput,
  linkInput,
  placesList,
  openCardImagePopup,
  validationConfig
}

