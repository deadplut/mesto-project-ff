const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMesage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add(validationConfig['inputErrorClass'])
  errorElement.textContent = errorMesage
  errorElement.classList.add(validationConfig['errorClass'])
}

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove(validationConfig['inputErrorClass'])
  errorElement.textContent = ''
  errorElement.classList.remove(validationConfig['errorClass'])
}


const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
    validationConfig
    )
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector']))

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
    })
  })
}

const enableValidation = validationConfig => {
  const formList = Array.from(document.querySelectorAll(validationConfig['formSelector']))
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig)
  })
}

const clearValidation = (elementForm, validationConfig) => {

}


export {enableValidation, clearValidation}