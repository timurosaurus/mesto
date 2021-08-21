//functions for hiding and showing error messages
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //closest('.popup__box').querySelector('.form__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //closest('.popup__box').querySelector('.form__input-error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
};
//________________________________________________________________________________________________________________

//function for toggling button state

const toggleButtonState = (inputList, buttonElement) => {
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('form__save-btn_inactive');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('form__save-btn_inactive');
  }
};

//fuction for validity check
const checkInputValidity = (formElement, inputElement) => {
  const isInputInvalid = !inputElement.validity.valid;
  if (isInputInvalid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//event listeners setting function
const setEventListeners = (formElement) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formElement.addEventListener('submit', handleFormSubmit);

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__save-btn');

  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    };
    inputElement.addEventListener('input', handleInput);
  };

  inputList.forEach(inputListIterator);
  toggleButtonState(inputList, buttonElement);
};

//validation enabling fuction
const enableValidation = () => {
  const formElement = document.querySelectorAll('.form');
  const formList = Array.from(formElement);
  formList.forEach(setEventListeners);
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
});
