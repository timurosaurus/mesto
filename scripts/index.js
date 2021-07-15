//popup and buttons' variables//
const popupOpenEditButtonElement = document.querySelector('.profile__edit-btn');
const popupOpenAddButtonElement = document.querySelector('.profile__add-btn');
const popupEditElement = document.querySelector('.popup_function_edit');
const popupAddElement = document.querySelector('.popup_function_add');
const popupCloseEditButtonElement = popupEditElement.querySelector('.popup__close-btn');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close-btn');

//cards variables//
const cardsSection = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//edit profile variables//
let userName = document.querySelector('.profile__user-name');
let userBio = document.querySelector('.profile__user-description');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_place_name');
let jobInput = formElement.querySelector('.form__input_place_bio');

//add place variables//
let formAddElement = document.querySelector('.form_place_add');
let placeNameInput = formAddElement.querySelector('.form__input_place_new-place-name');
let placeImageInput = formAddElement.querySelector('.form__input_place_link');

//functions for adding and submiting cards//
function openAddPopup() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;

  popupAddElement.classList.add('popup_opened')
}

function closeAddPopup() {
  popupAddElement.classList.remove('popup_opened')
}

function submitAddForm(evt) {
  evt.preventDefault();
  const cardContent = document.getElementById('card').content;
  const cards = document.querySelector('.cards');
  const card = cardContent.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = placeNameInput.value;
  card.querySelector('.card__image').src = placeImageInput.value;
  cards.prepend(card);
  card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
  card.querySelector('.card__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__button_active');
  });
  expandImage(card);
  closeAddPopup();
}

//function for deleting cards//
function deleteCard(event) {
  event.target.closest('.card').remove();
}

//event listener//
function setEventListeners(cardElement) {
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
}

//function for initial cards//
initialCards.forEach(function (element) {
  const cardContent = document.getElementById('card').content;
  const cardElement = cardContent.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__button_active');
  });
  expandImage(cardElement);
  setEventListeners(cardElement);
  cardsSection.prepend(cardElement);
});

//function for opening the edit profile popup//
function openPopup() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
  popupEditElement.classList.add('popup_opened')
}

//function for closing the edit profile popup//
function closePopup() {
  popupEditElement.classList.remove('popup_opened')
}

//submit function//
function submitForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = jobInput.value;
  //openPopup();//
  closePopup();
}

popupOpenEditButtonElement.addEventListener('click', openPopup);
popupCloseEditButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitForm);
formAddElement.addEventListener('submit', submitAddForm);
popupOpenAddButtonElement.addEventListener('click', openAddPopup);
popupCloseAddButtonElement.addEventListener('click', closeAddPopup);

//image popup variables//
const expandedImagePopup = document.querySelector('.popup_theme_darker');
const expandedImagePopupCloseButton = expandedImagePopup.querySelector('.popup__close-btn_size_small');
let expandedPhoto = expandedImagePopup.querySelector('.popup__image');
let expandedPhotoCaption = expandedImagePopup.querySelector('.popup__caption');

//function for image expansion popup opening//
function expandImage (card) {
  //finding cards photo to expand and its caption//
  const photo = card.querySelector('.card__image');
  const caption = card.querySelector('.card__title');
    photo.addEventListener('click', function() {
    expandedImagePopup.classList.add('popup_opened');
    expandedPhotoCaption.textContent = caption.textContent;
    expandedPhoto.src = photo.src;
    expandedPhoto.alt = caption.textContent;
  });
}

//function for image expansion popup closing//
function closeExpandedImagePopup() {
  expandedImagePopup.classList.remove('popup_opened')
}

expandedImagePopupCloseButton.addEventListener('click', closeExpandedImagePopup);


