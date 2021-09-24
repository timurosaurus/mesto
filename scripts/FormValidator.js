//object
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_inactive',
  inputErrorClass: 'form__input_error-status_active',
  errorClass: 'form__input-error_active'
};

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

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //function for toggling button state
  const blockSubmit = (buttonElement, validationClasses) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationClasses.inactiveButtonClass);
  };

  const toggleButtonState = (inputList, buttonElement, validationClasses) => {
    if (hasInvalidInput(inputList)) {
      blockSubmit(buttonElement, validationClasses);
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

  enableValidation(config);


/*  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

  class FormValidator {
    constructor(config, formElement) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._formElement = formElement;
    }

    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }

    _isValid(inputElement) {
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
      } else {
        this._showInputError(inputElement);
      }
    }

    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _toggleButtonState(inputList) {
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };

    _setEventListeners() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._toggleButtonState(inputList);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState(inputList);
        });
      });
    };

    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    };
  }

  export { FormValidator, validationConfig } */
