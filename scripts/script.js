"use strict";

// Grabbing some HTML elements to be used later
const randomPopularBtn = document.getElementById("popular-btn");
const allButtons = document.querySelectorAll(".generate-movie-btn");
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
const baseImgUrl = "https://image.tmdb.org/t/p/w200";

// Create a class for movie cards. Probably not necessary for our purposes but I think it would be helpful if we want to generate a bumch of movies on the page.
class movieCard {
  constructor(movieTitle, posterPath, releaseDate) {
    this.movieTitle = movieTitle;
    this.posterPath = posterPath;
    this.releaseDate = releaseDate;
    this.moviePosterUrl = baseImgUrl + this.posterPath;
  }

  generatePoster() {
    let movieCardHtml;
    movieCardHtml = `<img src="${this.moviePosterUrl}"/>`;
    movieCardHtml += `<h3>${this.movieTitle}</h3>`;
    movieCardHtml += `<p>Release Date: ${this.releaseDate}</p>`;
    movieContainerOut.innerHTML = movieCardHtml;
  }
}

// Adding an event listener to determine which of the four buttons (now playing, popular, top rated, upcoming) was clicked. Another helper function will check the button and return a string so we can change the url of the fetch method

allButtons.forEach(returnPageType);

function returnPageType(button) {
  button.addEventListener("click", function () {
    const buttonId = button.getAttribute("id");
    const page = checkBtnId(buttonId);
    // Instantiates a the function that actually calls the fetch request
    generateRandomMovie(page);
  });
}

function generateRandomMovie(page) {
  // The fetch method takes a single argument (the resource that we want to recieve) and a optional second argument, the JSON object that we created above: "data".
  // This method does not directly return JSON data, rather it returns a response object.
  // The response object is a representation of the entire HTTP response (it includes the JSON data as well as a bunch of other metadata that we don't need)
  fetch(
    `https://api.themoviedb.org/3/movie/${page}?language=en-US&page=1`,
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

      const newMovieObject = new movieCard(movieTitle, posterPath, releaseDate);
      newMovieObject.generatePoster();
    })
    .catch((err) => console.error(err));
}

// Helper functions

// Function that generates a random number between 0 and 19 to be used as an index for generating a random movie.

function generateNum() {
  const maxIndex = 19;
  const minIndex = 0;
  const randNum = Math.ceil(Math.random() * (maxIndex - minIndex) + minIndex);
  return randNum;
}

// Function that checks the ID of the button that was clicked by the user. The function returns a string that will be used to change the url of the fetch method.

function checkBtnId(buttonId) {
  if (buttonId == "now-playing-btn") {
    const page = "now_playing";
    return page;
  } else if (buttonId == "popular-btn") {
    const page = "popular";
    return page;
  } else if (buttonId == "top-rated-btn") {
    const page = "top_rated";
    return page;
  } else if (buttonId == "upcoming-btn") {
    const page = "upcoming";
    return page;
  }
}

// To Do :
// Add random movie button for Popular, Upcoming, Top Rated, etc as suggested by Gabbie
// Make display look like an actual movie poster
// Add more info button

// On hover, I want to add a p tag populated with the movie description on top of the poster

// // grab the poster

// const allPosters = document.querySelectorAll("#movie-container img");

// allPosters.forEach((poster) => {
//   poster.addEventListener("click", function () {
//     console.log(poster.src);
//   });
// });
