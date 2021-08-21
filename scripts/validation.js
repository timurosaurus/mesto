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
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
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
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__save-btn');
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
};

//validation enabling fuction
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(setEventListeners);
};

enableValidation();
