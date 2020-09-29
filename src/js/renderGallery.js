import TemplatePhotoCard from '../template/photo-card.hbs';
const basicLightbox = require('basiclightbox');
import 'basiclightbox/src/styles/main.scss';

const buttonLoadMore = document.querySelector('[data-button-load="load-next"]');

const renderGallery = {
  render(arrayElem, outputListRefs, isClear) {
    if (isClear) {
      this.clearGaleryList(outputListRefs);
    }
    const template = TemplatePhotoCard(arrayElem);
    outputListRefs.insertAdjacentHTML('beforeend', template);
    this.showButtonLoad();
  },

  clearGaleryList(outputListRefs) {
    outputListRefs.innerHTML = '';
    this.hiddenButtonLoad();
  },

  showFullImage(urlImage, tagsStr) {
    basicLightbox.create(`<img src="${urlImage}" alt="${tagsStr}" />`).show();
  },

  showButtonLoad() {
    buttonLoadMore.classList.remove('visuality-hiden');
  },
  hiddenButtonLoad() {
    buttonLoadMore.classList.add('visuality-hiden');
  },
};

export default renderGallery;
