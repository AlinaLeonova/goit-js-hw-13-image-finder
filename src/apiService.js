import cardTemplate from "./templates/cardTemplate.hbs";
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const API_KEY = '18970346-3d451e610c9741be437dec23e';
const cardGallery = document.querySelector('.gallery')
const loadBtn = document.querySelector('.loadBtn')
const searchRes = document.querySelector('input');
const searchForm = document.querySelector('form');

let page = 1;

const renderPic = async function () {


    await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchRes.value}&page=${page}&per_page=12&key=${API_KEY}
`)
        .then(data => data.json())
        .then(({ hits }) => {
            const card = cardTemplate(hits);
            cardGallery.insertAdjacentHTML('beforeend', card);

        })
    page > 1 ? window.scrollTo({
        top: window.pageYOffset + window.innerHeight + 1000,
        behavior: 'smooth'
    }) : '';


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

window.addEventListener('scroll', () => {
    (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 200) ? loadBtn.classList.remove('is-hidden') : loadBtn.classList.add('is-hidden');

})

