const searchBtn = document.getElementById("search-btn");
const searchTab = document.getElementById("search-tab");
const formId = document.getElementById("form-id");
// let  movieName = '';
let movieId = [];
// let urlid = '';
let myWatchlist = [];
let movieList = [];
// let storedData = JSON.parse(localStorage.getItem("myWatchlist"))


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log(searchTab.value, "movie name")
    getMovieList()
})
document.addEventListener("click",function(e){
   if(e.target.dataset.id){
    getWatchlist(e.target.dataset.id);
   }
})



function getMovieList(){
    fetch(`http://www.omdbapi.com/?t=${searchTab.value}&apikey=ed3e63ef&s=${searchTab.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("movie-list").innerHTML = " ";
        for(let x of data.Search){
             movieId.push(x.Title);
             console.log("movieId",movieId)
            fetch(`https://www.omdbapi.com/?apikey=ed3e63ef&s&i=${x.imdbID}`)
            .then(response  => response.json())
            .then(data =>{console.log("movieiddata", data)
            document.getElementById("movie-list").innerHTML += `
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
            </div>`} )  

        }
       
    })
}

function getWatchlist(imdbID){
   myWatchlist.push(imdbID);
   console.log("checking",myWatchlist);
   localStorage.setItem("myWatchlist",JSON.stringify(myWatchlist))
   if ("geolocation" in navigator) {
      console.log("yes navigator")
    } else {
     console.log("no navigation")
    }

}

