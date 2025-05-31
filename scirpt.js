let timer;
let timeLeft = 50 * 60;
let isRunning = false;
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const focusTimeInput = document.getElementById("focusTime");
const progressCircle = document.querySelector(".progress-ring__circle");
const circumference = 2 * Math.PI * 90;

progressCircle.style.strokeDasharray = circumference;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  let progress = (timeLeft / (focusTimeInput.value * 60)) * circumference;
  progressCircle.style.strokeDashoffset = circumference - progress;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timer);
        isRunning = false;
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  timeLeft = focusTimeInput.value * 60;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
focusTimeInput.addEventListener("change", resetTimer);

updateTimer();
