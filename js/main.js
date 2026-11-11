import { fetchData } from "./api.js";

const data = await fetchData('https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json')
console.log(data);


const test = document.querySelector('#test')
data.forEach(movie => {
    const section = document.createElement('section')
    const card = document.createElement('div')
    const img = movie.image
    const image = document.createElement('img')
    image.setAttribute('src',img)
    test.append(section)
    section.append(card)
    card.append(image)
});

let showsPerPage = 8 ;
let currentPage = 1 ;
let currentdata = data

function showMovies(data) {
    test.innerHTML = ""

    let startIndex = (currentPage - 1) * showsPerPage
    let endIndex = startIndex + showsPerPage

    const Movies = data.slice(startIndex, endIndex);

    if(Movies.length === 0){
        test.innerHTML = "<div style='grid-column: 1 / -1' class='bg-white rounded-xl shadow-xl p-8 text-center text-3xl font-bold text-gray-500'>Trajet introuvable</div>"
        return
    }
}

// showMovies(data)