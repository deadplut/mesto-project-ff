import {closePopupByClick} from "./modal";
import {createCard, deleteCard} from "./cards";
import {
  jobInput,
  linkInput,
  nameInput,
  placeNameInput,
  placesList,
  profileDescElement,
  profileTitleElement
} from "../index";

export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value
  profileDescElement.textContent = jobInput.value
  closePopupByClick(evt)
}


export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value
  }
  placesList.prepend(createCard(newCard, deleteCard));
  closePopupByClick(evt)
}