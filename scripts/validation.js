

//functions for hiding and showing error messages
const showInputError = (formElement, inputElement, validationClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //closest('.popup__box').querySelector('.form__input-error');
  /*errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');*/
  inputElement.classList.add(validationClasses.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationClasses.errorClass);
};

const hideInputError = (formElement, inputElement, validationClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //closest('.popup__box').querySelector('.form__input-error');
  /*errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');*/
  inputElement.classList.remove(validationClasses.inputErrorClass);
  errorElement.classList.remove(validationClasses.errorClass);
  errorElement.textContent = '';
};
//________________________________________________________________________________________________________________

//function for toggling button state

const toggleButtonState = (inputList, buttonElement, validationClasses) => {
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationClasses.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationClasses.inactiveButtonClass);
  }
};

//fuction for validity check
const checkInputValidity = (formElement, inputElement, validationClasses) => {
  const isInputInvalid = !inputElement.validity.valid;
  if (isInputInvalid) {
    //const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, validationClasses);
  } else {
    hideInputError(formElement, inputElement, validationClasses);
  }
};

//event listeners setting function
const setEventListeners = (formElement, validationClasses) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formElement.addEventListener('submit', handleFormSubmit);

  const inputList = Array.from(formElement.querySelectorAll(validationClasses.inputSelector));
  const buttonElement = formElement.querySelector(validationClasses.submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkInputValidity(formElement, inputElement, validationClasses);
      toggleButtonState(inputList, buttonElement, validationClasses);
    };
    inputElement.addEventListener('input', handleInput);
  };

  inputList.forEach(inputListIterator);
  toggleButtonState(inputList, buttonElement, validationClasses);
};

//validation enabling fuction
const enableValidation = (validationClasses) => {
  const formElement = document.querySelectorAll(validationClasses.formSelector);
  const formList = Array.from(formElement);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationClasses)
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
});
