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
  renderLoading,
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
      const newCard = {
        name: response['name'],
        link: response['link'],
        likes: response['likes']
      }
      renderCard(newCard)
      closePopupBySubmit(evt)
      evt.target.reset()
    })
    .catch(logError)
    .finally( ()=> {
        renderLoading(false, evt)
      }
    )

}