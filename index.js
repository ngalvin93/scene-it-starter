// document.addEventListener('DOMContentLoaded', function () {
//     let renderMovies = function (movieArray) {
//         movieArray.map(function (currentMovie) {
//             $('.movie-poster').attr('src',`${currentMovie.Poster}`);
//             $('.card-title').html(`${currentMovie.Title}`);
//             $('.card-text').html(`${currentMovie.Year}`);
//         });
//         return renderMovies.join('')
//     }
// });

// document.addEventListener('DOMContentLoaded', function () {
//         function renderMovies (movieData) {
//         $(movieData).map(function (currentMovie) {
//             console.log(`
//             <div class="movie card my-3 mx-3 py-3 px-3" style="width: 18rem;">
//                 <img class="movie-poster card-img-top" src="${currentMovie.Poster}">
//                 <div class="body">
//                     <p class="card-title">${currentMovie.Title}</p>
//                     <p class="card-text">${currentMovie.Year}</p>
//                     <a href="#" class="btn btn-primary">Add Movie</a>
//                 </div>
//             </div>
//             `)
//         })
// }

document.addEventListener('DOMContentLoaded', function () {
    function renderMovies (movieArray) {
        var movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="movie card my-3 mx-3 py-3 px-3" style="width: 18rem;">
            <img class="movie-poster card-img-top" src="${currentMovie.Poster}">
            <div class="body">
            <h5 class="card-title">${currentMovie.Title}</h5>
            <p class="card-text">${currentMovie.Year}</p>
            <button href="#" class="btn btn-primary add-movie" data-movieid="${currentMovie.imdbID}">Add Movie</button>
            </div>
            </div>
            `
        })
        return movieHTML.join('')
    }
    // RENDERS MOVIES BELOW
    // var movieContainer = document.querySelector('.movies-container')
    // movieContainer.innerHTML = renderMovies(movieData)
    document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const searchString = document.getElementById('search-bar').value
        const urlEncodedSearchString = encodeURIComponent(searchString)
        console.log(urlEncodedSearchString)
        axios.get("http://www.omdbapi.com/?apikey=3430a78&s="+urlEncodedSearchString)
            .then(function(response){
                movieContainer.innerHTML = renderMovies(response.data.Search)
            })
        var movieContainer = document.querySelector('.movies-container')
        //movieContainer.innerHTML = renderMovies(movieData)
    })
    document.querySelector('.movies-container').addEventListener('click', saveToWatchlist)
    document.querySelector('#clear-watchlist-button').addEventListener('click', clearWatchlist)
})

function saveToWatchlist (event) {
    const buttonTarget = event.target
    const movieId = buttonTarget.dataset.movieid
    if(buttonTarget.classList.contains('add-movie')) {
        //console.log(movieId)
        axios.get(`http://www.omdbapi.com/?apikey=3430a78&i=${movieId}`)
        .then(function(movieObject){
            console.log(movieObject)// save the selected movie object to local storage
        })
        .then(function(movieObject2){
            let watchlistJSON = localStorage.getItem('watchlist');
            let watchlist = JSON.parse(watchlistJSON);
            if (watchlist === null) {
                watchlist = [];
                watchlist.push(movieObject2);
            } else {
                watchlist.push(movieObject2);
            }
            watchlistJSON = JSON.stringify(watchlist);
            localStorage.setItem('watchlist', watchlistJSON);
        })
    } 
    
}

function clearWatchlist () {
    localStorage.clear('watchlist');
    console.log('Watchlist was cleared!')
}




// function saveToWatchlist (imdbID) {
//     var movie = movieData.find((currentMovie) => {
//         return currentMovie.imdbID == imdbID
//     });
//     var watchlistJSON = localStorage.getItem(‘watchlist’);
//     var watchlist = JSON.parse(watchlistJSON);
// }