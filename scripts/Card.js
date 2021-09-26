import { openPopup, imagePreviewPopup } from './index.js';
class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }
  //creating a template
  _getCardTemplate = () => {
    const cardTemplate = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }

  //method for giving a like
  _likeHandler = () => {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_status_active');
  }

  //method for deleting a card
  _deleteCardHandler = () => {
    this._element.querySelector('.card__delete-btn').closest('.card').remove();
  }

  //method for image preview
  _imagePreviewClickHandler = () => {
    //finding cards photo to preview and its caption//
    const imagePreview = imagePreviewPopup.querySelector('.popup__image');
    const imagePreviewCaption = imagePreviewPopup.querySelector('.popup__caption');
    openPopup(imagePreviewPopup);
    imagePreviewCaption.textContent = this._element.querySelector('.card__title').textContent;
    imagePreview.src = this._element.querySelector('.card__image').src;
    imagePreview.alt = this._element.querySelector('.card__title').textContent;
  }
  //event listeners
  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._likeHandler();
    });
    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._deleteCardHandler();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._imagePreviewClickHandler();
    });
  }

  createCard = () => {
    this._element = this._getCardTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }
};

export { Card };
