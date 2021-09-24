
class Card {
  constructor (data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate= () => {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card-template')
      .cloneNode(true);

    return cardElement;
  }

  _likeHandler= () => {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_status_active');
  }

  _deleteCardHandler= () => {
    this._element.querySelector('.card__delete-btn').closest('.card').remove();
  }


  _imagePreviewClickHandler= () => {
    //finding cards photo to preview and its caption//
    const imagePreview = card.querySelector('.card__image');
    const imagePreviewCaption = card.querySelector('.card__title');

    openPopup(card);
    imagePreviewCaption.textContent = this._name;
    imagePreview.src = this._link;
    imagePreview.alt = this._name;
  }

  _setEventListeners= () => {

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

  generateCard= () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
};

export { Card };
