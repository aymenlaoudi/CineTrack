import { fetchData } from "./api.js";

const data = await fetchData('https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json')
console.log(data);


const test = document.querySelector('#test')
data.forEach(movie => {
    const img = movie.image
    const image = document.createElement('img')
    image.setAttribute('src',img)
    test.append(image)
    const section = document.createElement('section')
    const card = document.createElement('div')
});


