let storedData = JSON.parse(localStorage.getItem("myWatchlist"))
// let storedData = JSON.parse(localStorage.getItem("movieList"))
console.log(storedData)

function displayWatchlist(){
    for(let i = 0; i < storedData.length; i++){
    fetch(`http://www.omdbapi.com/?i=${storedData[i]}&apikey=ed3e63ef`)
      .then ( response => response.json())
      .then ( data => {console.log(data)
    document.getElementById("watchlist-movies").innerHTML += `
           <div class="movie-details">
              <img src=${data.Poster} class="poster"/>
              <div class="content">
                 <div class="first-line">
                    <p class="title">${data.Title}</p>
                    <p><i class="fa-regular fa-star"></i></p>
                    <p class="rating">${data.Ratings[0].Value}</p>
                 </div>
                 <div class="second-line">
                    <p class="runtime">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                 </div>
                 <div class="watch">
                    <button data-Id="${data.imdbID}" class="watchlist"><i class="fa-solid fa-circle-plus"></i>  watchlist</button>
                 </div>
                 <div class="third-line">
                    <p class="plot">${data.Plot}</p>
                 </div>
              </div>
            </div>`
    })
    }
}

displayWatchlist()