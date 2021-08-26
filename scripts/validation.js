//functions for hiding and showing error messages
const showInputError = (formElement, inputElement, validationClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationClasses.inputErrorClass);
  errorElement.classList.add(validationClasses.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement, validationClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationClasses.inputErrorClass);
  errorElement.classList.remove(validationClasses.errorClass);
  errorElement.textContent = '';
};
//________________________________________________________________________________________________________________

//function for toggling button state
const blockSubmit = () => {
  button = popupAddElement.querySelector('.form__save-btn');
  button.disabled = true;
  button.classList.add('form__save-btn_inactive');
};

const toggleButtonState = (inputList, buttonElement, validationClasses) => {
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  if (hasInvalidInput(inputList)) {
    blockSubmit(buttonElement);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationClasses.inactiveButtonClass);
  }
};

//fuction for validity check
const checkInputValidity = (formElement, inputElement, validationClasses) => {
  const isInputInvalid = !inputElement.validity.valid;
  if (isInputInvalid) {
    const errorMessage = inputElement.validationMessage;
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
  const formElements = document.querySelectorAll(validationClasses.formSelector);
  const formList = Array.from(formElements);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationClasses)
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input_error-status_active',
  errorClass: 'form__input-error_active'
});
