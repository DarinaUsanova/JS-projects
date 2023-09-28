// API key
const apiKey = "ycNYwED-TEPDyZ1i0Qo5ifozz934xyeOvhIEDeHDr9I";
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

// Code

async function searchImages() {
  inputData = textInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("li");
    imageWrapper.classList.add("card");
    const image = document.createElement("img");
    image.src = result.urls.small;

    imageWrapper.appendChild(image);
    searchResults.appendChild(imageWrapper); // Append imageWrapper to searchResults, not to itself
  });
}

textInput.addEventListener("input", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

textInput.addEventListener("keydown", handleKeyPress);

showMore.addEventListener("click", () => {
  page++;
  searchImages();
});

clearButton.addEventListener("click", function () {
  textInput.value = "";
  page = 1;
});