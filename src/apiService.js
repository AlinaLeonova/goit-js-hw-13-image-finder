import cardTemplate from "./templates/cardTemplate.hbs";
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const API_KEY = '18970346-3d451e610c9741be437dec23e';
const cardGallery = document.querySelector('.gallery')
const loadBtn = document.querySelector('.loadBtn')
const searchRes = document.querySelector('input');
const searchForm = document.querySelector('form');

let page = 1;

const renderPic = function () {

    loadBtn.classList.add('is-hiiden')
    fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchRes.value}&page=${page}&per_page=12&key=${API_KEY}
`)
        .then(data => data.json())
        .then(({ hits }) => {
            const card = cardTemplate(hits);
            cardGallery.insertAdjacentHTML('beforeend', card);
        })
    page += 1
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cardGallery.innerHTML = "";
    page = 1;
    renderPic();
    loadBtn.classList.remove('is-hidden')
})


cardGallery.addEventListener('click', (e) => {
    e.path.forEach(el => {
        if (el.className === 'gallery-item') {
            const instance = basicLightbox.create(`
   <img src="${el.dataset.path}">
`)
            instance.show()
        }

    })

})
loadBtn.addEventListener('click', renderPic)

cardGallery.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth'
});


