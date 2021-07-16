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

//image popup variables//
const imagePreviewPopup = document.querySelector('.popup_theme_darken');
const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector('.popup__close-btn_size_small');
const poppedUpPhoto = imagePreviewPopup.querySelector('.popup__image');
const imagePreviewCaption = imagePreviewPopup.querySelector('.popup__caption');

//edit profile variables//
const userName = document.querySelector('.profile__user-name');
const userBio = document.querySelector('.profile__user-description');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_place_name');
const jobInput = formElement.querySelector('.form__input_place_bio');

//add place variables//
const formAddElement = document.querySelector('.form_place_add');
const placeNameInput = formAddElement.querySelector('.form__input_place_new-place-name');
const placeImageInput = formAddElement.querySelector('.form__input_place_link');

//function for image preview popup opening//
function imageClickHandler (card) {
  //finding cards photo to preview and its caption//
  const photo = card.querySelector('.card__image');
  const caption = card.querySelector('.card__title');
    photo.addEventListener('click', function() {
    imagePreviewPopup.classList.add('popup_opened');
    imagePreviewCaption.textContent = caption.textContent;
    poppedUpPhoto.src = photo.src;
    poppedUpPhoto.alt = caption.textContent;
  });
}

//function for image expansion popup closing//
function closeimagePreviewPopup() {
  imagePreviewPopup.classList.remove('popup_opened')
}
//functions for adding and submiting cards//
function openAddPopup() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;

  popupAddElement.classList.add('popup_opened')
}

function closeAddPopup() {
  popupAddElement.classList.remove('popup_opened')
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//function for giving a like//
function likeHandler (card) {
  const likeButton = card.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-btn_status_active')});
  }

//function for deleting cards//
function deleteCard(card) {
  const deleteButton = card.querySelector('.card__delete-btn');
  deleteButton.addEventListener('click', () => {deleteButton.closest('.card').remove()});
}

function submitAddForm(evt) {
  evt.preventDefault();
  const cardContent = document.getElementById('card').content;
  const card = cardContent.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = placeNameInput.value;
  card.querySelector('.card__image').src = placeImageInput.value;
  cardsSection.prepend(card);
  /*card.querySelector('.card__delete-btn').addEventListener('click', deleteCard);*/
  likeHandler(card);
  imageClickHandler(card);
  closeAddPopup();
  deleteCard(card);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

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
  cardElement.querySelector('.card__like-btn').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like-btn_status_active');
  });
  imageClickHandler(cardElement);
  deleteCard(cardElement);
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
imagePreviewPopupCloseButton.addEventListener('click', closeimagePreviewPopup);
