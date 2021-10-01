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
    this._config = config;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  //methods for hiding and showing error messages
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  //has at least one invalid element
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //method for toggling button state
  /*blockSubmit = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }*/

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

    this._toggleButtonState();
  }

  /*_toggleButtonState () {
    if (this._formElement.checkValidity()) {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }*/

  //method for validity check
  _checkInputValidity = (inputElement) => {
    const isInputInvalid = !inputElement.validity.valid;
    if (isInputInvalid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //event listeners setting method
  _setEventListeners = (formElement) => {
    this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = formElement.querySelector(this._config.submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = (event) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      };
      inputElement.addEventListener('input', handleInput);
    };

    this._inputList.forEach(inputListIterator);
    this._toggleButtonState(this._inputList, this._buttonElement)
  }

  //validation enabling method
  enableValidation = () => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    this._formElement.addEventListener('submit', handleFormSubmit);
    const formElements = document.querySelectorAll(this._config.formSelector);
    const formList = Array.from(formElements);
    formList.forEach((formElement) => {
      this._setEventListeners(formElement)
    });
  }
}

//-------------------------

export { FormValidator, validationConfig };
