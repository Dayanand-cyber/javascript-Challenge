let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const displayEnd = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");


function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  displayTimeEnd(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTime(secondsLeft);
  }, 1000);
}


function displayTime(seconds) {
  const mintues = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;

  const display = `${mintues}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  timerDisplay.textContent = display;
  document.title = display;
}


function displayTimeEnd(timeStamp) {
  const end = new Date(timeStamp);

  const hours = end.getHours();
  const mintues = end.getMinutes();

  displayEnd.textContent = `${hours > 12 ? hours - 12 : hours}:${mintues < 10 ? "0" : ""}${mintues}`;
}


function startTimer(e) {
  const seconds = this.dataset.time;
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const min = this.minutes.value;
  timer(min * 60);
  this.reset();
});
