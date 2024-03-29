import {initialCards} from "./cards";


const CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '810f9d35-1a2c-4cd0-b653-75ff9d8a0b16',
    'Content-Type': 'application/json'
  }
}

const handleResponse = response => {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(`Что-то пошло не так: ${response.status}`)
}

const logError = error => {
  console.log(error)
}

///////////////////
//Profile
///////////////////

const profileElement = document.querySelector('.profile.page__section')
const profileObject = {
  imageElement: profileElement.querySelector('.profile__image'),
  titleElement: profileElement.querySelector('.profile__title'),
  descriptionElement: profileElement.querySelector('.profile__description'),
  _id: undefined,
  setProfileData: setProfileData
}

function setProfileData(data){
  profileObject.imageElement.style.backgroundImage = `url('${data['avatar']}')`
  profileObject.titleElement.textContent = data['name']
  profileObject.descriptionElement.textContent = data['about']
  profileObject._id = data['_id']
}


const getProfileDataApi = () => {
    return fetch(`${CONFIG.baseUrl}/users/me`, {
      method: 'GET',
      headers: CONFIG.headers
    })
  .then(handleResponse)
}

const patchProfileDataApi = (name, about) => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
    .then(handleResponse)
}


///////////////////
//Profile-avatar
///////////////////


function putAvatarDataApi(link) {
  return fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: CONFIG.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
    .then(handleResponse)
}


///////////////////
//Cards
///////////////////

function getCardsDataApi() {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    method: 'GET',
    headers: CONFIG.headers
  })
    .then(handleResponse)
    .then(cards => {
      cards.forEach(card => {
        initialCards.push(card)
      })
    })
}


function postCardDataApi(name, link) {
  return fetch(`${CONFIG.baseUrl}/cards`, {
    method: 'POST',
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(handleResponse)
}

function deleteCardDataApi(cardId) {
  return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: CONFIG.headers
  })
    .then(handleResponse)
}


///////////////////
//Likes
///////////////////

function putLikeDataApi(cardId) {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: CONFIG.headers
  })
    .then(handleResponse)
}


function deleteLikeDataApi(cardId) {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: CONFIG.headers
  })
    .then(handleResponse)
}






export {getProfileDataApi,getCardsDataApi,profileObject, patchProfileDataApi, postCardDataApi, deleteCardDataApi, putLikeDataApi, deleteLikeDataApi, putAvatarDataApi, setProfileData, logError}

