//popup and buttons' variables//
const popupElement = document.querySelector('.popup');
const popupOpenEditButtonElement = document.querySelector('.profile__edit-btn');
const popupOpenAddButtonElement = document.querySelector('.profile__add-btn');
const popupEditElement = document.querySelector('.popup_function_edit');
const popupAddElement = document.querySelector('.popup_function_add');
const popupCloseButtonElement = document.querySelector('.popup__close-btn');
const popupCloseAddButtonElement = popupAddElement.querySelector('.popup__close-btn');

//edit profile variables//
const userName = document.querySelector('.profile__user-name');
const userBio = document.querySelector('.profile__user-description');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_place_name');
const jobInput = formElement.querySelector('.form__input_place_bio');

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

//image popup variables//
const imagePreviewPopup = document.querySelector('.popup_theme_darken');
const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector('.popup__close-btn_size_small');
const poppedUpPhoto = imagePreviewPopup.querySelector('.popup__image');
const imagePreviewCaption = imagePreviewPopup.querySelector('.popup__caption');

//add place variables//
const addPlaceForm = document.forms.addingplaceform;
const formAddElement = document.querySelector('.form_place_add');
const placeTitleInput = formAddElement.querySelector('.form__input_place_new-place-name');
const placeImageInput = formAddElement.querySelector('.form__input_place_link');

//popup opening and closing functions//

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//profile edit popup opening, closing and submitting functions//
function editProfilePopupHanlder() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
  openPopup(popupEditElement);
}

popupCloseButtonElement.addEventListener('click', function () {
  closePopup(popupEditElement);
});

function submitForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = jobInput.value;
  closePopup(popupEditElement);
}

//functions for adding and submiting cards//
function addPlacePopupHandler() {
  openPopup(popupAddElement);
}

//function for image preview popup opening//
function imagePreviewClickHandler(card) {
  //finding cards photo to preview and its caption//
  const photo = card.querySelector('.card__image');
  const caption = card.querySelector('.card__title');
  photo.addEventListener('click', function () {
    openPopup(imagePreviewPopup); //.classList.add('popup_opened');
    imagePreviewCaption.textContent = caption.textContent;
    poppedUpPhoto.src = photo.src;
    poppedUpPhoto.alt = caption.textContent;
  });
}

//function for image expansion popup closing//
function closeImagePreviewPopup() {
  closePopup(imagePreviewPopup); //.classList.remove('popup_opened')
}

//function for giving a like//
function likeHandler(card) {
  const likeButton = card.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-btn_status_active')
  });
}

//function for deleting cards//
function deleteCard(card) {
  const deleteButton = card.querySelector('.card__delete-btn');
  deleteButton.addEventListener('click', () => { deleteButton.closest('.card').remove() });
}

//event listener//
function setEventListeners(cardElement) {
  cardElement.querySelector('.card__delete-btn').addEventListener('click', deleteCard);
}


//function for creating a card and setting its title and image + delete, preview and like handlers//
function setCardTitleAndImage(title, image) {
  const cardContent = document.getElementById('card').content;
  const card = cardContent.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = title;
  card.querySelector('.card__image').src = image;
  card.querySelector('.card__image').alt = title;
  deleteCard(card);
  likeHandler(card);
  imagePreviewClickHandler(card);
  return card;
}

//function for creating and prepending a card//
function cardPrependHandler(title, image) {
  const card = setCardTitleAndImage(title, image);
  cardsSection.prepend(card);
}
//function for card submission + reseting previous inputs//
function submitAddForm(evt) {
  evt.preventDefault();
  const title = placeTitleInput.value;
  const image = placeImageInput.value;
  cardPrependHandler(title, image)
  closePopup(popupAddElement);
  addPlaceForm.reset();
}

//function for initial cards//
initialCards.forEach(function (element) {
  const cardContent = document.getElementById('card').content;
  const cardElement = cardContent.cloneNode(true);
  cardPrependHandler(element.name, element.link);
  /*cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  likeHandler(cardElement);
  imagePreviewClickHandler(cardElement);
  deleteCard(cardElement);
  setEventListeners(cardElement);
  cardsSection.prepend(cardElement);*/
});

//event listeners//
popupOpenAddButtonElement.addEventListener('click', addPlacePopupHandler);
popupCloseAddButtonElement.addEventListener('click', function () {
  closePopup(popupAddElement);
});
popupOpenEditButtonElement.addEventListener('click', editProfilePopupHanlder);
formElement.addEventListener('submit', submitForm);
formAddElement.addEventListener('submit', submitAddForm);
imagePreviewPopupCloseButton.addEventListener('click', closeImagePreviewPopup);