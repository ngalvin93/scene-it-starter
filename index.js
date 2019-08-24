var movies = null; //this is here so that you can access the api request results across all functions

document.addEventListener('DOMContentLoaded', function () {
    function renderMovies (movieArray) {
        var movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="movie card my-3 mx-3 py-3 px-3" style="width: 18rem;">
            <img class="movie-poster card-img-top" src="${currentMovie.Poster}">
            <div class="body">
            <h5 class="card-title">${currentMovie.Title}</h5>
            <p class="card-text">${currentMovie.Year}</p>
            <button href="#" class="btn btn-primary add-movie" data-movieid="${currentMovie.imdbID}" data-movieTitle="${currentMovie.Title}">Add Movie</button>
            </div>
            </div>
            `
        })
        return movieHTML.join('')
    }

    // get request from api when the user enters a search term and clicks submit
    document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const searchString = document.getElementById('search-bar').value
        const urlEncodedSearchString = encodeURIComponent(searchString)
        const movieContainer = document.querySelector('.movies-container')
        axios.get("http://www.omdbapi.com/?apikey=3430a78&s="+urlEncodedSearchString)
            .then(function(response){
                movies = response.data.Search;
                movieContainer.innerHTML = renderMovies(movies);
            })
    })
    document.querySelector('.movies-container').addEventListener('click', saveToWatchlist)
    document.querySelector('#clear-watchlist-button').addEventListener('click', clearWatchlist)
})

function saveToWatchlist (event) {
    const buttonTarget = event.target
    const movieId = buttonTarget.dataset.movieid
    // single returns checks if it satisfies the conditional and if so, continues to the next line
    if (!buttonTarget.classList.contains('add-movie')) return
    if (typeof movieId !== 'string') return
    let movie = movies.find(function(currentMovie) {
        if (currentMovie.imdbID == movieId) {
            return true;
        } else {
            return false;
        }
    })
    // this goes into the local storage to parse the saved movie data
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    // if the watchlist is empty, initialize a new array
    if (watchlist === null) {
        watchlist = []
    }
    // push the selected movie
    watchlist.push(movie)
    // stringify the movie object data to save into the local storage (local storage can only save strings)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
}

function clearWatchlist () {
    localStorage.clear('watchlist');
    console.log('Watchlist was cleared!')
}