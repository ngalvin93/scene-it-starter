document.addEventListener ('DOMContentLoaded', function () {
    console.log(localStorage.getItem('watchlist'))
    // let listOfMoviesInWatchlist = localStorage.getItem('watchlist');
    // function renderMovies (movieArray) {
    //     var movieHTML = movieArray.map(function (currentMovie) {
    //         return `
    //         <div class="movie card my-3 mx-3 py-3 px-3" style="width: 18rem;">
    //         <img class="movie-poster card-img-top" src="${currentMovie.Poster}">
    //         <div class="body">
    //         <p class="card-title">${currentMovie.Title}</p>
    //         <p class="card-text">${currentMovie.Year}</p>
    //         <button href="#" class="btn btn-primary add-movie" data-movieid="${currentMovie.imdbID}">Add Movie</button>
    //         </div>
    //         </div>
    //         `
    //     })
    // }
    // return movieHTML.join('')
})
