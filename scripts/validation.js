const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => {
  const isInputInvalid = !inputElement.validity.valid;
  if (isInputInvalid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
};

//event listeners setting function
const setEventListeners = (formElement) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(formElement, inputElement);
    });
  });
};

//validation enabling fuction
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(setEventListeners);
};

enableValidation();
