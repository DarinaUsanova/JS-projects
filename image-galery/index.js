// API key
const apiKey = "ycNYwED-TEPDyZ1i0Qo5ifozz934xyeOvhIEDeHDr9I";
// Variables
const textInput = document.getElementById("input");
const clearInput = document.getElementById("clear");
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

clearInput.addEventListener("click", function () {
  textInput.value = "";
});












/* Функция для загрузки изображений из API Flickr
async function getImages(searchQuery) {
  try {
    // Формируем URL запроса к API Flickr
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&extras=url_h&format=json&nojsoncallback=1&per_page=11&text=${searchQuery || 'all'}`;

    // Отправляем GET-запрос к API
    const response = await fetch(url);
    const data = await response.json();

    // Проверяем, есть ли изображения
    if (data.photos && data.photos.photo.length > 0) {
      // Обновляем изображения на странице с помощью URL-адресов, полученных из API
      for (let i = 0; i < data.photos.photo.length; i++) {
        arrImage[i].src = data.photos.photo[i].url_h;
        arrImage[i].alt = `Image ${i + 1}`;
      }
    } else {
      // Если изображения не найдены, выводим сообщение об ошибке
      alert('Изображения не найдены.');
    }
  } catch (error) {
    // В случае ошибки выводим сообщение об ошибке
    console.error('Ошибка:', error);
  }
}
// Обработчик события нажатия Enter в поле ввода
textInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchImages();
  }
}); */
