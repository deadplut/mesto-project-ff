import {initialCards} from "./cards";

const cohort = 'cohort-magistr-2/'
const url = 'https://nomoreparties.co/v1/' + cohort
const token = '810f9d35-1a2c-4cd0-b653-75ff9d8a0b16'




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
    return fetch(url + 'users/me', {
    headers: {
      method: 'GET',
      authorization: token
    }
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
  fetch(url + 'users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
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



function getCardsDataApi() {
  return fetch(url + 'cards', {
    method: 'GET',
    headers: {
      authorization: token
    }
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
  return fetch(url + 'cards', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
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

let promises = [getProfileDataApi(),getCardsDataApi(),]


///////////////////
//Cards
///////////////////






export {promises, profileObject, patchProfileDataApi, postCardDataApi}

