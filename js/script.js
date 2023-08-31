const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ["iNspo Sound", "Jazz", "ukulele"];
let songIndex = 0;

const loadSong = song => {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
};

const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  audio.pause();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = e => {
  const { duration, currentTime } = e.srcElement;
  const progressPerCent = (currentTime / duration) * 100;
  progress.style.width = `${progressPerCent}%`;
};

const setProgress = e => {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
};

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

// Initially load the first song
loadSong(songs[songIndex]);
