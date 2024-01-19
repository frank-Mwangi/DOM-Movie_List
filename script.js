function populateLocalStorageFromDOM() {
  const listItems = document.querySelectorAll(".name");
  const listItemObjects = [];

  listItems.forEach((item) => {
    const listItemObject = {
      movieName: item.textContent.trim(),
      releaseDate: new Date().toDateString(), // Use current date for initial storage
    };
    listItemObjects.push(listItemObject);
  });
  localStorage.setItem("movies", JSON.stringify(listItemObjects));
}
// delete movies
function handleDeleteMovie(e) {
  //   list.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    const li = e.target.parentElement;
    const deleteMovie = li.querySelector(".name").textContent.trim();
    let listMovies = localStorage.getItem("movies");
    let storedMovies = JSON.parse(listMovies);
    let index = storedMovies.findIndex(
      (movie) => movie.movieName == deleteMovie
    );
    if (index !== -1) {
      storedMovies.splice(index, 1);
      const stringifiedNewList = JSON.stringify(storedMovies);
      localStorage.setItem("movies", stringifiedNewList);
    }
    li.parentNode.removeChild(li);
  }
  //   });
}
// add movies
function handleAddMovie(e) {
  e.preventDefault();
  const value = e.target.querySelector('input[type="text"]').value.trim();
  const date = new Date();
  const newMovie = {
    movieName: value,
    releaseDate: date.toDateString(),
  };
  let storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
  storedMovies.push(newMovie);
  localStorage.setItem("movies", JSON.stringify(storedMovies));
  //Append to DOM
  const li = document.createElement("li");
  const movieName = document.createElement("span");
  const releaseDate = document.createElement("span");
  const deleteBtn = document.createElement("span");
  movieName.textContent = newMovie.movieName;
  releaseDate.textContent = newMovie.releaseDate;
  deleteBtn.textContent = "delete";
  movieName.classList.add("name");
  releaseDate.classList.add("date");
  deleteBtn.classList.add("delete");
  li.appendChild(movieName);
  li.appendChild(releaseDate);
  li.appendChild(deleteBtn);
  const list = document.querySelector("#movie-list ul");
  list.appendChild(li);
  // clear input
  e.target.querySelector('input[type="text"]').value = "";
}

//Populate List from localstorage function
function populateListFromLocalStorage() {
  const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
  storedMovies.forEach((movie) => {
    const li = document.createElement("li");
    const movieName = document.createElement("span");
    const releaseDate = document.createElement("span");
    const deleteBtn = document.createElement("span");
    // add text content
    movieName.textContent = movie.movieName;
    releaseDate.textContent = movie.releaseDate;
    deleteBtn.textContent = "delete";
    // add classes
    movieName.classList.add("name");
    releaseDate.classList.add("date");
    deleteBtn.classList.add("delete");
    // append to DOM
    li.appendChild(movieName);
    li.appendChild(releaseDate);
    li.appendChild(deleteBtn);
    const list = document.querySelector("#movie-list ul");
    list.appendChild(li);
  });
}
//Init function
function init() {
  if (!localStorage.getItem("movies")) {
    populateLocalStorageFromDOM();
  }
  populateListFromLocalStorage();
  const list = document.querySelector("#movie-list ul");
  list.addEventListener("click", handleDeleteMovie);
  const forms = document.forms;
  const addForm = forms["add-movie"];
  addForm.addEventListener("submit", handleAddMovie);
  //clear input
  addForm.querySelector('input[type="text"]').value = "";
}
window.addEventListener("load", init);
