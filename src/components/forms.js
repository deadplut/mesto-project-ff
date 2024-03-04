import {closePopupByClick} from "./modal";
import {createCard, deleteCard, toggleCardLike} from "./cards";
import {
  jobInput,
  linkInput,
  nameInput,
  placeNameInput,
  placesList,
  profileDescElement,
  profileTitleElement,
  openCardImagePopup,
} from "../index";

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInput.value
  profileDescElement.textContent = jobInput.value
  evt.target.reset()


}


export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value
  }
  placesList.prepend(createCard(
    newCard,
    deleteCard,
    toggleCardLike,
    openCardImagePopup
  ));
  closePopupByClick(evt)
  evt.target.reset()
}