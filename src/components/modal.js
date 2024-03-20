function openPopup(element){
  setOpenedPopup(element)
  element.addEventListener('click', closePopupByClick)
  document.addEventListener('keydown', closePopupByEscape)
}

function closePopup(element){
  element.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closePopupByEscape);
  element.removeEventListener('click', closePopupByClick)
}


function closePopupByClick(evt) {
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close')
  ){
    closePopup(evt.currentTarget)
  }
}

function closePopupBySubmit(evt) {
  if (
    evt.target.classList.contains('popup__form')
  ){
    const popupFormElement = document.querySelector('.popup_is-opened')
    closePopup(popupFormElement)
  }
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const elementToClose = document.querySelector('.popup_is-opened')
    closePopup(elementToClose)
  }
}


function setOpenedPopup(element) {
  element.classList.add('popup_is-opened');
}

export {openPopup, closePopup, closePopupByClick, closePopupByEscape, closePopupBySubmit, setOpenedPopup}