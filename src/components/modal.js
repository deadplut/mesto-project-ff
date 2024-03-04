function openPopup(element){
  setOpenedPopup(element)
  element.addEventListener('click', closePopupByClick)
  document.addEventListener('keydown', closePopupByEscape)
}


function closePopupByClick(evt) {
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup__button')
  ){
    evt.currentTarget.classList.remove('popup_is-opened')
  }
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
  }
}

function setOpenedPopup(element) {
  element.classList.add('popup_is-opened');
}

export {openPopup, closePopupByClick, closePopupByEscape, setOpenedPopup}