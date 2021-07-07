//popup and buttons' variables//
const popupOpenButtonElement = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
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
let userName = document.querySelector('.profile__user-name');
let userBio = document.querySelector('.profile__user-description');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_place_name');
let jobInput = formElement.querySelector('.form__input_place_bio');


//function for adding cards//
initialCards.forEach(function (element) {
  const cardContent = document.getElementById('card').content;
  const cardElement = cardContent.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;

  cardsSection.prepend(cardElement);
});


//function for opening the popup//
function openPopup() {
  nameInput.value = userName.textContent;
  jobInput.value = userBio.textContent;

  popupElement.classList.add('popup_opened')
}

//function for closing the popup//
function closePopup() {
  popupElement.classList.remove('popup_opened')
}

//submit function//
function submitForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userBio.textContent = jobInput.value;
  //openPopup();//
  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitForm);




