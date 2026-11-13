export function SaveFavorites(favorites) {
    localStorage.setItem('favorites',JSON.stringify(favorites))
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || []
}

let favorites =getFavorites()
const favList = document.querySelector('#fav-list')

export function showFavourite(showMovie) {
    favList.innerHTML = ""
    favorites.forEach(movie => {
        const item = document.createElement('div')
        item.classList.add('bg-black','rounded-xl')
        item.innerHTML = `
        <div class="w-full items-center justify-between flex gap-4">
        <img src="${movie.image}" class="w-12 rounded-xl">
        <p class="text-l font-bold">${movie.title}(${movie.releaseYear})</p>
        <div>
        <button class="remove-fav text-white p-4">X</button>
        </div>
        </div>`
        favList.append(item)
        const removeBtn = item.querySelector('.remove-fav')
        removeBtn.addEventListener('click',() => {
            favorites = favorites.filter(m => m.id !== movie.id)
            showFavourite(showMovie)
            SaveFavorites(favorites)
            showMovie()
        })
    })
}

export function isFav(id) {
    return favorites.some(f => f.id === id)
}

export function togFavorite(movie) {
    if(isFav(movie.id)){
        favorites = favorites.filter(m => m.id !== movie.id)
    } else {
        favorites.push(movie)
    }
    SaveFavorites(favorites)
}
