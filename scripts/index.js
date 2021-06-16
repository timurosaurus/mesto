//popup and buttons' variables//
const popupOpenButtonElement = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
let userName = document.querySelector('.profile__user-name');
let userBio = document.querySelector('.profile__user-description');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_place_name');
let jobInput = formElement.querySelector('.form__input_place_bio');

//function for opening the popup//
function openPopup() {
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




