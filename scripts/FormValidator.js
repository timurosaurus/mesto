//object
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input_error-status_active',
  errorClass: 'form__input-error_active'
};

class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  //method for hiding and showing error messages
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //has at least one invalid element
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //method for toggling button state
  blockSubmit = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      blockSubmit(buttonElement);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //method for validity check
  _checkInputValidity = (inputElement) => {
    const isInputInvalid = !inputElement.validity.valid;
    if (isInputInvalid) {
      const errorMessage = this._inputElement.validationMessage;
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //event listeners setting method
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = (event) => {
        this._checkInputValidity(this._formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      };
      inputElement.addEventListener('input', handleInput);
    };

    inputList.forEach(inputListIterator);
    //toggleButtonState(inputList, buttonElement);
  }

  //validation enabling method
  enableValidation = () => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    this._formElement.addEventListener('submit', handleFormSubmit);
    const formElements = document.querySelectorAll(this._formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
      this._setEventListeners(formElement)
    });
  }
  //enableValidation(config)
}

export { FormValidator, validationConfig };
