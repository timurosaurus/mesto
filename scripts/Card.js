import { openPopup, imagePreviewPopup } from './index.js';
class Card {
  constructor (data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .firstElementChild
      .cloneNode(true);

    return cardTemplate;
  }

  _likeHandler(_element) {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_status_active');
  }

  _deleteCardHandler() {
    this._element.querySelector('.card__delete-btn').closest('.card').remove();
  }


  _imagePreviewClickHandler() {
    //finding cards photo to preview and its caption//
    const imagePreview = imagePreviewPopup.querySelector('.popup__image');
    const imagePreviewCaption = imagePreviewPopup.querySelector('.popup__caption');

    openPopup(imagePreviewPopup);
    imagePreviewCaption.textContent = this._element.querySelector('.card__title').textContent;
    imagePreview.src = this._element.querySelector('.card__image').src;
    imagePreview.alt = this._element.querySelector('.card__title').textContent;
  }

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

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }
};

export { Card };
