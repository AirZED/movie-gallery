"use strict";

const modal = document.querySelector("#add-modal");
const popUpButton = document.querySelector(".pop-up-modal");
const btnModalActions = document.querySelector(".modal__actions");
const movieList = document.querySelector("#movie-list");
const backdrop = document.getElementById("backdrop");
const cancelDelete = document.querySelector('#delete-modal button')
let confirmDelete = cancelDelete.nextElementSibling;
const confirmDeleteModal = confirmDelete.parentElement.parentElement;
// const mainMovieView = document.querySelector('main');

const movieArray = [];

//Function to remove the backdrop
const toggleBackDrop = function () {
    backdrop.classList.toggle("visible");
};
const toogleModalWindow = function () {
    modal.classList.toggle("visible");
};

const clearUserInputs = function () {
    modal.querySelectorAll("input").forEach((each) => (each.value = ""));
};

const moviePopUpHandler = function () {
    const entryText = document.querySelector("#entry-text");

    if (movieArray.length<1) {
        entryText.style.display = "block"
    } else {
        entryText.style.display = "none"
    }

    return movieList.children.length;

};

//Function to toggle classlist on ConfirmDeleteModal
const toggleConfirmDeleteModal = () =>
{
    confirmDeleteModal.classList.toggle('visible');
}

//Function for removing from list
const removeMovieFunction = function (movieId)
{
    confirmDeleteModal.classList.remove('visible');
    backdrop.classList.remove('visible');
    // console.log(movieId)
    let movieIndex = 0;
    for (let eachMovie of movieArray) {
        if (eachMovie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movieArray.splice(movieIndex, 1)
    movieList.children[movieIndex].remove();
    moviePopUpHandler();
}
const cancelDeleteHandler = () =>
{
     confirmDeleteModal.classList.remove('visible');
     backdrop.classList.remove('visible')
}
const confirmRemoveMovieHandler = (id) =>
{
    
    toggleConfirmDeleteModal();
    toggleBackDrop();
    // backdrop.removeEventListener('click', () =>
    // {
    //     toogleModalWindow();
    //     toggleBackDrop();
    // });
    // backdrop.addEventListener('click', () =>
    // {
    //     toggleBackDrop();
    //     cancelDeleteHandler();
    // })

    //Adding an event listener to remove previous listener
    //The bind does  not work well with remove event listener
    cancelDelete.removeEventListener('click', cancelDeleteHandler)
    confirmDelete.replaceWith(confirmDelete.cloneNode(true))
    confirmDelete = cancelDelete.nextElementSibling;
    //The cloneNode(true) enables deep cloone
    confirmDelete.addEventListener('click', removeMovieFunction.bind(null, id))
   
   
    cancelDelete.addEventListener('click', cancelDeleteHandler)

    
}



//Funtion for Adding Movie to List
const RenderNewMovie = function (id, title, url, rating) {
    const newMovie = document.createElement('li');
    newMovie.className = 'movie-element';
    newMovie.id = `${id}`;


    newMovie.innerHTML =
        `
        <div class = 'movie-element__image'>
            <img src = '${url}' alt = 'image of ${title}'>
        </div>
        <div class='movie-element__info'>
            <h2 class = 'movieTitle' >${title}</h2>
            <p class = "movie__rating" > ${rating}/5 Stars </p>
        </div>
      `

    //Event Listener to remove the List
     newMovie.addEventListener(`click`, confirmRemoveMovieHandler.bind(null, id))
    // newMovie.addEventListener(`click`, removeMovieFunction.bind(null, id))
    movieList.append(newMovie)
};

//Event Listener Function to Add Movie
const addMovieFuntion = function name(event) {
    if (event.target.className === `btn btn--success`) {
        const movieTitle = document.querySelector("input").value;
        const movieImageUrl = document.querySelector("#image-url").value;
        const movieRating = document.querySelector("#rating").value;

        if (
            movieTitle.trim() === 0 ||
            movieImageUrl.trim() === 0 ||
            movieRating.trim() === 0 ||
            +movieRating < 1 ||
            +movieRating > 5
        ) {
            alert("Enter a Valid Value and rating between 1 and 5");
            return;
        }

        let newMovie = {
            id: Date.now(),
            title: movieTitle,
            url: movieImageUrl,
            rating: movieRating,
        };

        movieArray.push(newMovie);
        console.log(movieArray)
        toogleModalWindow();
        clearUserInputs();
        toggleBackDrop();
        moviePopUpHandler();
        RenderNewMovie(newMovie.id, newMovie.title, newMovie.url, newMovie.rating);
    } else if (event.target.className === `btn btn--passive`) {
        modal.classList.remove("visible");
        toggleBackDrop();
        clearUserInputs();
    }
};

//Event Listener to Pop-up the Modal
popUpButton.addEventListener("click", () => {
    toogleModalWindow();
    toggleBackDrop();
});

//Event Listener Funtion to Toggle Add Movie Modal
btnModalActions.addEventListener("click", addMovieFuntion);

//Event to remove Modal Using backdrop
backdrop.addEventListener("click", () => {
    toogleModalWindow();
    toggleBackDrop();
});