const disableSubmitButton = (button, config) => {
  button.disabled = true
  button.classList.add(config['inactiveButtonClass'])
}


const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add(validationConfig['inputErrorClass'])
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationConfig['errorClass'])
}

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove(validationConfig['inputErrorClass'])
  errorElement.textContent = ''
  errorElement.classList.remove(validationConfig['errorClass'])
}


const isValid = (formElement, inputElement, validationConfig) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }


  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
    validationConfig
    )
  } else {
    hideInputError(formElement, inputElement, validationConfig)
  }
}


const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}


const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(validationConfig['inactiveButtonClass'])
  }
}



const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector']))
  const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector'])

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    })
  })
}

const enableValidation = validationConfig => {
  const formList = Array.from(document.querySelectorAll(validationConfig['formSelector']))
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig)
  })
}

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector']))
  const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector'])

  inputList.forEach(inputElement => {
    inputElement.setCustomValidity('')
    hideInputError(formElement, inputElement, validationConfig)
  })
  disableSubmitButton(buttonElement, validationConfig)
}

export {enableValidation, clearValidation}