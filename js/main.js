import { fetchData } from "./api.js";

const data = await fetchData('https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json')
console.log(data);


const test = document.querySelector('#test')
// data.forEach(movie => {
//     const section = document.createElement('section')
//     const card = document.createElement('div')
//     const img = movie.image
//     test.append(section)
//     section.append(card)
//     card.append(image)
// });

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
        card.classList = "bg-[#00001B] p-4 rounded-lg hover:-translate-y-2 cursor-pointer"
        test.append(card)
        card.innerHTML = `
        <div>
        <div>
        <img class="rounded-lg" src="${image}">
        </div>
        <div>
        <p class="text-white font-bold text-lg">${title}</p>
        <p class="text-white">${releaseYear}</p>
        <p class="text-white flex justify-end">${type}</p>
        </div>
        </div>
        `
    })

    // const carte = document.querySelectorAll('.carte')
}

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
