import { fetchData } from "./api.js";
import { showFavourite, isFav, togFavorite} from "./favourites.js";
const data = await fetchData('https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json')
console.log(data);


const test = document.querySelector('#test')

let showsPerPage = 8 ;
let currentPage = 1 ;
let currentdata = data

function showMovies(data) {
    test.innerHTML = ""

    let startIndex = (currentPage - 1) * showsPerPage
    let endIndex = startIndex + showsPerPage

    const Movies = data.slice(startIndex, endIndex);

    if(Movies.length === 0){
        test.innerHTML = "<div style='grid-column: 1 / -1' class='bg-white rounded-xl shadow-xl p-8 text-center text-3xl font-bold text-gray-500'>Tv show Introvable</div>"
        return
    }
    Movies.forEach(movie =>{
        let id = movie.id
        let title = movie.title
        let type = movie.type
        let releaseYear = movie.releaseYear
        let duration = movie.duration
        let image = movie.image
        let genres = movie.genres
        let directors = movie.directors

        const card = document.createElement('div')
        card.classList = "bg-[#00002B] p-4 rounded-2xl hover:scale-97 transition duration-100 cursor-pointer"
        card.id = `card_${id}`
        test.append(card)
        const fav = isFav(movie.id)
        card.innerHTML = `
        <div class="flex flex-col gap-4 justify-between">
        <div class="relative">
        <img class="rounded-lg" src="${image}">
        <button class="fav-btn p-2 rounded-full bg-black/60 text-red-500 text-2xl absolute top-2 right-2" data-id="${id}">${fav ? '♥' : '♡'}</button>
        </div>
        <div>
        <p class="text-white font-bold text-lg">${title} (${releaseYear})</p>
        </div>
        </div>
        `
        const favBtn = card.querySelector('.fav-btn')
        favBtn.addEventListener('click',(e)=>{
            e.stopPropagation()
            togFavorite(movie)
            favBtn.textContent = isFav(movie.id) ? '♥' : '♡'
            showFavourite(()=>showMovies(data))
        })
    })
}

showFavourite(() => showMovies(data))
showMovies(data)

const filter = document.querySelector('#filter')

function filterShows() {
    const shows = filter.value
    if(shows == ""){return showMovies(data)}
    if(shows == 'Tout'){return showMovies(data)}
    let movieType = data.filter(movie => movie.type == "movie")
    if(shows == 'Movies'){return showMovies(movieType)}
    let seriesType = data.filter(serie => serie.type == "series")
    if(shows == 'Series'){return showMovies(seriesType)}
    currentPage = 1
}
filter.addEventListener('change',() => {
    const select =  filterShows()
    console.log(select)
})
const search = document.querySelector('#search')
function searchShows() {
    const shows = search.value.toLowerCase().trim()
    let searchShows = data.filter(show => show.title.toLowerCase().startsWith(shows))
    currentPage = 1
    showMovies(searchShows)
}
search.addEventListener('input',() => {
    const s = searchShows()
    console.log(s);
})

const btns = document.querySelectorAll('#pagination button')
btns.forEach(function (btn,index) {
    btn.addEventListener('click',function () {
        currentPage = index + 1
        filterShows(data)
    })
})

const cards = document.querySelector('#test')
const modal = document.querySelector('#modal-card')
const p = document.querySelector('modal_parent')
const content = document.querySelector('#content-modal')
cards.addEventListener('click', (e) => {
    const card = e.target.closest('[id^="card_"]')
    if(!card) return

    const id = card.id.replace('card_','')
    const movie = data.find(m => m.id == id)
    console.log(movie)
    const duration = (movie.type === "movie") ? `${movie.duration} min` : `${movie.seasons.length} seasons`;
    content.innerHTML = `
    <button class="close-modal absolute top-2 right-4 text-2xl">X</button>
    <div class="grid grid-cols-2 gap-4">
    <div>
    <img class="rounded-xl" src="${movie.image}">
    </div>
    <div class="flex flex-col justify-center gap-4">
    <h2 class="text-2xl font-bold flex">Title : ${movie.title}</h2>
    <hr>
    <span class="text-l font-semibold">Type : ${movie.type}</span>
    <span class="text-l font-semibold">Duration : ${duration}</span>
    <span class="text-l font-semibold">Description : ${movie.description}</span>
    <span class="text-l font-semibold">Genres : ${movie.genres}</span>
    </div>
    </div>
    `
    const close_modal = content.querySelector('.close-modal')
    close_modal.addEventListener('click',()=>{
        modal.classList.add('hidden')
    })
    modal.classList.remove('hidden')
    modal.classList.add('flex')
 })
    modal.addEventListener('click',(e) =>{
        if(e.target === modal){
            modal.classList.add('hidden')
        }
    })
