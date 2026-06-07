// get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const rangeButtons = player.querySelectorAll(".player__slider");
const progress = player.querySelector(".progress");
const progressbar = player.querySelector(".progress__filled");

// function for player
function play_control() {
  let method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function play_slide() {
  console.log(this.name);
  video[this.name] = this.value;
}

function progressUpdate() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressbar.style.flexBasis = `${progressPercentage}%`;
}

function drag(e) {
  const moved = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = moved;
}
// hooking the events
video.addEventListener("click", play_control);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", progressUpdate);

toggle.addEventListener("click", play_control);
toggle.addEventListener("click", updateButton);

skipButtons.forEach((btn) => btn.addEventListener("click", skip));

rangeButtons.forEach((btn) => btn.addEventListener("change", play_slide));

let mousedown = false;
progress.addEventListener("mousemove", (e) => mousedown && drag(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
