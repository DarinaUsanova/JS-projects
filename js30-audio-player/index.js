let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let volumeInput = document.getElementById("volume");
let heartButton = document.getElementById("heartButton");
let heartIcon = document.getElementById("heartIcon");

const songs = [
  {
    title: "Tame Impala ",
    name: "The Less I Know The Better",
    source: "./assets/Tame Impala - The Less I Know The Better.mp3",
    cover: "./assets/tame-impala.jpeg"
  },
  {
    title: "Gorillaz",
    name: "Empire Ants",
    source: "./assets/Gorillaz - Empire Ants.mp3",
    cover: "./assets/gorillaz.jpeg"
  }
];

let isHeartClicked = false;

heartButton.addEventListener("click", function() {
  isHeartClicked = !isHeartClicked;
  if (isHeartClicked) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    heartIcon.style.color = "#ff0000";
  } else {
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");
    heartIcon.style.color = "";
  }
});

let currentSongIndex = 0;
song.volume = volumeInput.value;

song.onloadedmetadata = function(){
  progress.max = song.duration;
  progress.value = song.currentTime;
}

volumeInput.addEventListener("input", function() {
  song.volume = volumeInput.value;
});

function openSongList() {
  let songList = document.getElementById("songList");
  songList.style.display = "block";
}

function closeSongList() {
  let songList = document.getElementById("songList");
  songList.style.display = "none";
}

function toggleSongList() {
  let songList = document.getElementById("songList");
  if (songList.style.display === "block") {
    closeSongList();
  } else {
    openSongList();
  }
}

document.addEventListener("click", function(event) {
  let songList = document.getElementById("songList");
  let dropbtn = document.querySelector(".dropbtn");
  if (event.target !== dropbtn && !dropbtn.contains(event.target)) {
    closeSongList();
  }
});

function toggleMute() {
  if (song.valume === 0){
    song.volume = volumeInput.value || 1;
    volumeInput.value = song.volume;
  } else {
    song.volume = 0;
    volumeInput.value = 0;
  }
}

function playPause(){
  if(ctrlIcon.classList.contains("fa-pause")){
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
  else{
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  updateSongInfo();
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  updateSongInfo();
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

let isProgressClicked = false;
progress.onmousedown = () => (isProgressClicked = true);
progress.onmouseup = () => (isProgressClicked = false);

setInterval(() => {
  if (!isProgressClicked) progress.value = song.currentTime;
}, 500);

progress.onchange = function(){
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

function playSong(index) {
  if (index >= 0 && index < songs.length) {
    currentSongIndex = index;
    updateSongInfo();
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

function updateSongInfo() {
  song.src = songs[currentSongIndex].source;
  document.querySelector(".cover").src = songs[currentSongIndex].cover;
  document.querySelector(".title").textContent = songs[currentSongIndex].title;
  document.querySelector(".name").textContent = songs[currentSongIndex].name;
}
updateSongInfo();

song.addEventListener("ended", function() {
  nextSong();
});
