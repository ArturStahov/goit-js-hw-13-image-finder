import './scss/main.scss';
import { ApiServer } from './js/apiService.js';
import renderGallery from './js/renderGallery.js';
import './js/button-show.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const debounce = require('lodash.debounce');
import { debounce } from 'lodash';

const erorMessage = () => {
  return error({
    text: 'Nothing found on request',
    type: 'info',
    delay: 4000,
    width: '300px',
  });
};

const refs = {
  outputList: document.querySelector('[data-galleru-output]'),
  inputSearch: document.querySelector('[data-input-search]'),
  buttonLoadMore: document.querySelector('[data-button-load="load-next"]'),
};

const apiServer = new ApiServer();
renderGallery.hiddenButtonLoad();

const handlerInputUser = event => {
  if (event.target.value !== '') {
    apiServer
      .search(event.target.value)
      .then(hits => {
        if (hits.length === 0) {
          erorMessage();
          return;
        }
        renderGallery.render(hits, refs.outputList, true);
      })
      .catch(eror => console.log(eror));
  }
  renderGallery.clearGaleryList(refs.outputList);
};

const handlerLoadNextPage = () => {
  apiServer
    .nextPage()
    .then(hits => {
      renderGallery.render(hits, refs.outputList, false);
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .catch(eror => console.log(eror));
};

const handlerImageView = event => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  renderGallery.showFullImage(event.target.dataset.largeimg, event.target.alt);
};

refs.buttonLoadMore.addEventListener('click', handlerLoadNextPage);
refs.inputSearch.addEventListener('input', debounce(handlerInputUser, 500));
refs.outputList.addEventListener('click', handlerImageView);
