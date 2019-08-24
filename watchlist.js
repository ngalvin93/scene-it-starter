document.addEventListener('DOMContentLoaded', function () {
    let movieData = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(movieData)
    function renderMovies (watchlist) {
        var movieHTML = watchlist.map(function (movieData) {
            return `
            <div class="movie card my-3 mx-3 py-3 px-3 shadow" style="width: 18rem;">
            <img class="movie-poster card-img-top" src="${movieData.Poster}">
            <div class="body">
            <h5 class="card-title">${movieData.Title}</h5>
            <p class="card-text">${movieData.Year}</p>
            <button href="#" class="btn btn-primary add-movie" data-movieid="${movieData.imdbID}" data-movieTitle="${movieData.Title}">Add Movie</button>
            </div>
            </div>
            `
        })
        return movieHTML.join('')
    }
    const movieContainer = document.querySelector('.movies-container')
    movieContainer.innerHTML = renderMovies(watchlist);
    document.querySelector('#clear-watchlist-button').addEventListener('click', clearWatchlist)
    
    function clearWatchlist () {
        localStorage.clear('watchlist');
        console.log('Watchlist was cleared!')
    }
})
