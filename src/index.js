import './scss/main.scss';
const debounce = require('lodash.debounce');
import { ApiServer } from './js/apiService.js'
import renderGallery from './js/renderGallery.js'
import './js/button-show.js'


const refs = {
    outputList: document.querySelector('[data-galleru-output]'),
    inputSearch: document.querySelector('[data-input-search]'),
    buttonLoadMore: document.querySelector('[data-button-load="load-next"]')
}

const apiServer = new ApiServer();

renderGallery.hiddenButtonLoad();

const handlerInputUser = (event) => {
    if (event.target.value !== "") {
        apiServer.search(event.target.value)
            .then(hits => {
                renderGallery.render(hits, refs.outputList, true);

            })
            .catch(eror => console.log(eror));
    }
}

const handlerLoadNextPage = () => {
    apiServer.nextPage()
        .then(hits => {
            renderGallery.render(hits, refs.outputList, false)
            console.log(hits)
            window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: "smooth"
            });
        })
        .catch(eror => console.log(eror));
}

const handlerImageView = (event) => {
    if (event.target.nodeName !== 'IMG') {
        return
    }
    renderGallery.showFullImage(event.target.dataset.largeimg, event.target.alt)

}



refs.buttonLoadMore.addEventListener('click', handlerLoadNextPage)
refs.inputSearch.addEventListener('input', debounce(handlerInputUser, 500))
refs.outputList.addEventListener('click', handlerImageView)
