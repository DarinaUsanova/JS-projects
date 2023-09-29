// API
const API_KEY = "ycNYwED-TEPDyZ1i0Qo5ifozz934xyeOvhIEDeHDr9I";
const BASE_URL = 'https://api.unsplash.com/';
const SEARCH_URL = 'search/photos';
const LIST_URL = 'photos';

// Variables
const textInput = document.getElementById("input");
const clearButton = document.getElementById("clear");
const searchResults = document.querySelector(".images");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

// Function to handle Enter key press
function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    page = 1;
    searchImages();
  }
}

async function getListPhotos() {
  const images = await fetchImages(`${BASE_URL}${LIST_URL}?page=${page}&client_id=${API_KEY}`);

  renderImages(images);
}

getListPhotos();

async function fetchImages(url) {
  const response = await fetch(url);
  const results = await response.json();
  return results;
}

function renderImages(images) {
  if (images.length > 0) {
    images.forEach((image) => {
      const imgWrapper = document.createElement("li");
      imgWrapper.classList.add("card");
      const img = document.createElement("img");
      img.style.backgroundColor = image.color;
      img.src = image.urls.small;

      img.loading = "lazy";

      imgWrapper.appendChild(img);
      searchResults.appendChild(imgWrapper);// Append imageWrapper to searchResults, not to itself
    });

      showMore.style.display = 'block'; 
    // показать кнопку load more
    // скрыть текст что ничего не найдено
  } else {
    // скрыть кнопку load more
    // показать текст что ничего не найдено
    showMore.style.display = 'none';
    searchResults.innerHTML = '<p class="no-results">Nothing found, enter you request!)</p>';
  }
}

// Code

async function searchImages() {
  inputData = textInput.value;
  const images = await fetchImages(`${BASE_URL}${SEARCH_URL}?page=${page}&query=${inputData}&client_id=${API_KEY}`);

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  renderImages(images.results);
}

textInput.addEventListener("input", (event) => {
  // event.preventDefault();
  page = 1;
  // searchImages();
  debounce();
});

let timerId;
function debounce() {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    searchImages();
  }, 800);
}

textInput.addEventListener("keydown", handleKeyPress);

showMore.addEventListener("click", () => {
  page++;
  searchImages();
});

clearButton.addEventListener("click", function () {
  textInput.value = "";
  page = 1;
});