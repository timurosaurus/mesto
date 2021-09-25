import { initialCards } from "./initialcards.js";
import { Card } from "./Card.js";

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
const placeSubmitButton = formAddElement.querySelector('.form__save-btn');
//popup opening and closing functions//
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupByOverlay);
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByEsc);
  document.removeEventListener('keydown', closePopupByOverlay);
};
// **by esc key
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};
//**by clicking on overlay
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(document.querySelector('.popup_opened'));
  }
};
//_____________________________________________________________________________________________________________
//profile edit popup opening, closing and submitting functions//
function editProfilePopupHanlder() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;
  openPopup(popupEditElement);
};

function submitForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = jobInput.value;
  closePopup(popupEditElement);
};
//functions for adding and submiting cards//
function addPlacePopupHandler() {
  openPopup(popupAddElement);
};

//function for image preview popup opening//
/*function imagePreviewClickHandler(card) {
  //finding cards photo to preview and its caption//
  const photo = card.querySelector('.card__image');
  const caption = card.querySelector('.card__title');
  photo.addEventListener('click', function () {
    openPopup(imagePreviewPopup); //.classList.add('popup_opened');
    imagePreviewCaption.textContent = caption.textContent;
    poppedUpPhoto.src = photo.src;
    poppedUpPhoto.alt = caption.textContent;
  });
};*/

//function for image preview popup closing//
function closeImagePreviewPopup() {
  closePopup(imagePreviewPopup); //.classList.remove('popup_opened')
};
//function for giving a like//
/*function likeHandler(card) {
  const likeButton = card.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-btn_status_active')
  });
};
//function for deleting cards//
function deleteCard(card) {
  const deleteButton = card.querySelector('.card__delete-btn');
  deleteButton.addEventListener('click', () => { deleteButton.closest('.card').remove() });
};
//function for creating a card and setting its title and image //
function createCard(title, image) {
  const cardContent = document.getElementById('card').content;
  const card = cardContent.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = title;
  card.querySelector('.card__image').src = image;
  card.querySelector('.card__image').alt = title;
  deleteCard(card);
  likeHandler(card);
  imagePreviewClickHandler(card);
  return card;
};*/

//function prepending a card //
function prependCard(data) {
  const card = new Card (data, '.card-template');
  const cardsSection = document.querySelector('.cards');

  const cardElement = card.generateCard();
  cardsSection.prepend(cardElement);
};
//function for card submission + reseting previous inputs//
function submitAddForm(evt) {
  evt.preventDefault();
  const title = placeTitleInput.value;
  const image = placeImageInput.value;
  prependCard(title, image);
  closePopup(popupAddElement);
  addPlaceForm.reset();
  blockSubmit(placeSubmitButton, config);
};

//event listeners//
popupOpenAddButtonElement.addEventListener('click', addPlacePopupHandler);
popupCloseAddButtonElement.addEventListener('click', function () {
  closePopup(popupAddElement);
});
popupCloseButtonElement.addEventListener('click', function () {
  closePopup(popupEditElement);
});
popupOpenEditButtonElement.addEventListener('click', editProfilePopupHanlder);
formElement.addEventListener('submit', submitForm);
formAddElement.addEventListener('submit', submitAddForm);
imagePreviewPopupCloseButton.addEventListener('click', closeImagePreviewPopup);

//cycle for initial cards//
initialCards.forEach((element) => {
  prependCard(element.name, element.link);
});
