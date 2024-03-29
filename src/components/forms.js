import {closePopupBySubmit} from "./modal";
import {renderCard} from "./card";
import {
  jobInput, linkAvatarInput,
  linkInput,
  nameInput,
  placeNameInput,
} from "../index";
import {
  logError,
  patchProfileDataApi,
  postCardDataApi,
  profileObject,
  putAvatarDataApi,
  setProfileData
} from "./api";

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt)
  patchProfileDataApi(nameInput.value, jobInput.value)
    .then(response => {
      profileObject.setProfileData(response)
      closePopupBySubmit(evt)
      evt.target.reset()
    })
    .catch(logError)
    .finally( ()=> {
        renderLoading(false, evt)
      }
    )
}


export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt)
  putAvatarDataApi(linkAvatarInput.value)
    .then(response => {
      setProfileData(response)
      closePopupBySubmit(evt)
      evt.target.reset()
    })
    .catch(logError)
    .finally( ()=> {
        renderLoading(false, evt)
      }
    )

}


export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value
  const link = linkInput.value

  postCardDataApi(name, link)
    .then(response => {
      renderCard(response)
      closePopupBySubmit(evt)
      evt.target.reset()
    })
    .catch(logError)
    .finally( ()=> {
        renderLoading(false, evt)
      }
    )

}

function renderLoading(isLoading, event) {
  const buttonElement = event.target.querySelector('.popup__button')
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...'
  }
  else {
    buttonElement.textContent = 'Сохранить'
  }
}
