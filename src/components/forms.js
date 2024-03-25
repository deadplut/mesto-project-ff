import {closePopupBySubmit} from "./modal";
import {renderCard, renderCards} from "./card";
import {
  jobInput,
  linkInput,
  nameInput,
  placeNameInput,
} from "../index";
import {patchProfileDataApi, postCardDataApi} from "./api";

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  patchProfileDataApi(nameInput.value, jobInput.value)
  closePopupBySubmit(evt)
  evt.target.reset()
}


export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value
  const link = linkInput.value

  postCardDataApi(name, link)
    .then(response => {
      const newCard = {
        name: response['name'],
        link: response['link'],
        likes: response['likes']
      }
      renderCard(newCard)
    })
  closePopupBySubmit(evt)
  evt.target.reset()
}