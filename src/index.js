import axios from 'axios'
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { hideLoader } from './showHideEl';
import { showLoader } from './showHideEl';
import { hidecatInfo } from './showHideEl';
import { showcatInfo } from './showHideEl';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error')
loader.style.display = 'none';
error.style.display = 'none';
try {

  fetchBreeds()
  .then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);

}

breedSelect.addEventListener('change', async (e) => {
  try {
    const breedId = breedSelect.value;

    showLoader();
    hidecatInfo();

    const data = await fetchCatByBreed(breedId);

    if (data.length === 0) {
      error.style.display = 'block'
      hideLoader();
      return Notiflix.Notify.warning('Sorry, nothing was found for the breed.');
      
    }
    error.style.display = 'none'
    hideLoader();
    showcatInfo();
    renderCat(data[0]);
  } catch (error) {
    console.error(error);
  }
});


function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];

  catInfo.innerHTML = '';
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <h2>${name}</h2>
        <img src="${url}" alt="${name}" />
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`
  );
}