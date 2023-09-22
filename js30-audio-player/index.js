let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

const songs = [
  {
    title: "Beyonce",
    name: "Lemonade",
    source: "./assets/beyonce.mp3",
    cover: "./assets/lemonade.png"
  },
  {
    title: "Dua Lipa",
    name: "Dont start now",
    source: "./assets/dontstartnow.mp3",
    cover: "./assets/dontstartnow.png"
  }
];

let currentSongIndex = 0;

song.onloadedmetadata = function(){
  progress.max = song.duration;
  progress.value = song.currentTime;
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

setInterval(() => {
  progress.value = song.currentTime;
}, 500);

progress.onchange = function(){
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

function updateSongInfo() {
  song.src = songs[currentSongIndex].source;
  document.querySelector(".cover").src = songs[currentSongIndex].cover;
  document.querySelector(".title").textContent = songs[currentSongIndex].title;
  document.querySelector(".name").textContent = songs[currentSongIndex].name;
}
updateSongInfo();
