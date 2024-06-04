"use strict";

// Grabbing some HTML elements to be used later
const randomMovieBtn = document.getElementById("random-movie-btn");
const movieContainerOut = document.getElementById("movie-container");

// This is a JSON object that allows us to control various settings.
// This object will be used as an optional second parameter for the fetch method and is also where we insert our unique API key (Access Token Auth?)
const data = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      // My unique API key
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjRlOTczNWU5ZDgxNjhhYjRjM2QzYWEwMmRkYzIyMSIsInN1YiI6IjY2NWJmZjk3ODliYjliODIyNDViN2I4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9giC9MkcQEZbw8FQJwnzHvA1pooW5jQDvje9lt8IoEg",
  },
};

// Base URL for TMDB Posters (to be concatenated later on with unique poster URLs)
const baseImgUrl = "https://image.tmdb.org/t/p/w300";

// Adding a button event listener for the user to click and generate a random movie
randomMovieBtn.addEventListener("click", generateRandomMovie);

// Create a class for movie cards. Probably not necessary for our purposes but I think it would be helpful if we want to generate a bumch of movies on the page.
class movieCard {
  constructor(movieTitle, posterPath) {
    this.movieTitle = movieTitle;
    this.posterPath = posterPath;
    this.moviePosterUrl = baseImgUrl + this.posterPath;
  }

  generatePoster() {
    let movieCardHtml;
    movieCardHtml = `<h3>${this.movieTitle}</h3>`;
    movieCardHtml += `<img src="${this.moviePosterUrl}"/>`;
    movieContainerOut.innerHTML = movieCardHtml;
  }
}

function generateRandomMovie() {
  // The fetch method takes a single argument (the resource that we want to recieve) and a optional second argument, the JSON object that we created above: "data".
  // This method does not directly return JSON data, rather it returns a response object.
  // The response object is a representation of the entire HTTP response (it includes the JSON data as well as a bunch of other metadata that we don't need)
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    data
  )
    // We then take this response object and extract the JSON data by using the json method
    .then((response) => response.json())
    // Now we need to parse the JSON data and store the pieces into some variables so that we can easily use the data.
    .then((jsonData) => {
      // movieData is a JSON object that stores a bunch of JSON objects containing information about the individual movie
      const movieData = jsonData["results"];

      // Generating a random number between 0 and 19 to use as the index:
      const index = generateNum();

      // Store all the required keys from the object into variables
      const movieTitle = movieData[index]["title"];
      const posterPath = movieData[index]["poster_path"];
      const moviePosterUrl = baseImgUrl + posterPath;
      const releaseDate = movieData[index]["release_date"];
      const description = movieData[index]["overview"];
      const userScore = movieData[index]["vote_average"];

      const newMovieObject = new movieCard(movieTitle, posterPath);
      newMovieObject.generatePoster();
    })
    .catch((err) => console.error(err));
}

// Helper functions

function generateNum() {
  const maxIndex = 19;
  const minIndex = 0;
  const randNum = Math.ceil(Math.random() * (maxIndex - minIndex) + minIndex);
  return randNum;
}

// To Do :
// Add random movie button for Popular, Upcoming, Top Rated, etc as suggested by Gabbie
// Make display look like an actual movie poster
// Add more info button
