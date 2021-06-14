const popupOpenButtonElement = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');

function togglePopupVisibility() {
  popupElement.classList.toggle('popup_opened')
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility);

popupCloseButtonElement.addEventListener('click', togglePopupVisibility);


const userName = document.querySelector('.profile__user-name');
const userBio = document.querySelector('.profile__user-description');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_name');
let jobInput = formElement.querySelector('.form__input_bio');


function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = userName.value;
  jobInput.textContent = userBio.value;

  togglePopupVisibility();
}

formElement.addEventListener('submit', formSubmitHandler);




