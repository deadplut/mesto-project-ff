import {initialCards} from "./cards";


const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '810f9d35-1a2c-4cd0-b653-75ff9d8a0b16',
    'Content-Type': 'application/json'
  }
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
  // profileObject.imageElement.style.backgroundImage = `url('${data['avatar']}')`
  profileObject.titleElement.textContent = data['name']
  profileObject.descriptionElement.textContent = data['about']
  profileObject._id = data['_id']
}

const getProfileDataApi = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
  })
    .then(response => {
      profileObject.setProfileData(response)
    })
}

const patchProfileDataApi = (name, about) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Что-то пошло не так: ${response.status}`);
    })
    .then(response => {
      profileObject.setProfileData(response)
    })
}


///////////////////
//Cards
///////////////////

function getCardsDataApi() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Что-то пошло не так: ${response.status}`);
    })
    .then(cards => {
      cards.forEach(card => {
        initialCards.push(card)
      })
    })
}


function postCardDataApi(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Что-то пошло не так: ${response.status}`);
    })
}

function deleteCardDataApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Что-то пошло не так: ${response.status}`);
    })
}

let promises = [getProfileDataApi(),getCardsDataApi(),]


///////////////////
//Cards
///////////////////






export {promises, profileObject, patchProfileDataApi, postCardDataApi, deleteCardDataApi}

