import './pages/index.css'


import { openPopup } from "./components/modal"
import {handleAvatarFormSubmit, handleCardFormSubmit, handleProfileFormSubmit} from "./components/forms"
import {clearValidation, enableValidation} from "./components/validation"
import {logError, promises} from "./components/api"
import {initialCards} from "./components/cards"
import {renderCards} from "./components/card"



const cardTemplate = document.querySelector('#card-template').content
const placesList = document.querySelector('.places__list')


await Promise.all(promises)
  .then(() => {
    renderCards(initialCards)
})
  .catch(logError)




const contentElement = document.querySelector('.content')
const formElementProfile = document.forms['edit-profile']
const nameInput = formElementProfile.elements.name
const jobInput = formElementProfile.elements.description
const profileTitleElement = document.querySelector('.profile__title')
const profileDescElement = document.querySelector('.profile__description')

const formElementCard = document.forms['new-place']
const placeNameInput = formElementCard.elements['place-name']
const linkInput = formElementCard.elements.link


const formElementAvatar = document.forms['edit-avatar']
const linkAvatarInput = formElementAvatar.elements.link

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
    clearValidation(formElementCard, validationConfig)
    openPopup(element)
  }
  else if (evt.target.classList.contains('profile__image')) {
    const element = document.querySelector('.popup_type_avatar_edit');
    clearValidation(formElementAvatar, validationConfig)
    openPopup(element)
  }
})


formElementProfile.addEventListener('submit', handleProfileFormSubmit)
formElementCard.addEventListener('submit', handleCardFormSubmit)
formElementAvatar.addEventListener('submit', handleAvatarFormSubmit)


function openCardImagePopup(evt, card) {
  const element = document.querySelector('.popup_type_image')
  openPopup(element)
  element.querySelector('.popup__image').src = card.link
  element.querySelector('.popup__image').alt =`На фотке ${card.name}`
  element.querySelector('.popup__caption').textContent = card.name
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
  validationConfig,
  linkAvatarInput
}

