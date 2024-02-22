let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});


// To do


let taskInput = document.getElementById("taskInput");
let pomodoroInput = document.getElementById("pomodoroInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");
let totalPomodoroCountDisplay = document.getElementById("totalPomodoroCount");
let totalTimeDisplay = document.getElementById("totalTime");

let totalPomodoroCount = 0;
let totalTime = 0;

// Function to update total time
const updateTotalTime = () => {
  totalTime = 0;
  document.querySelectorAll("#taskList li").forEach((task) => {
    totalTime += 25 * parseInt(task.dataset.pomodoroCount);
  });
  totalTimeDisplay.textContent = `${totalTime} minutes`;
};

// Function to update total Pomodoro count
const updateTotalPomodoroCount = () => {
  totalPomodoroCount = 0;
  document.querySelectorAll("#taskList li").forEach((task) => {
    totalPomodoroCount += parseInt(task.dataset.pomodoroCount);
  });
  totalPomodoroCountDisplay.textContent = totalPomodoroCount;
};

// Function to mark a task as completed
const markTaskCompleted = (checkbox, li) => {
  if (checkbox.checked) {
    li.classList.add("completed");
    // Decrease total time
    totalTime -= 25 * parseInt(li.dataset.pomodoroCount);
  } else {
    li.classList.remove("completed");
    // Increase total time
    totalTime += 25 * parseInt(li.dataset.pomodoroCount);
  }
  // Update total time display
  totalTimeDisplay.textContent = `${totalTime} minutes`;
};


// Function to add a new task to the list
const addTask = () => {
  let taskText = taskInput.value.trim();
  let pomodoroCount = parseInt(pomodoroInput.value) || 1; // Default to 1 if not provided

  if (taskText !== "" && pomodoroCount > 0) {
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => markTaskCompleted(checkbox, li));
    li.appendChild(checkbox);

    // Create span for task text with Pomodoro count
    let span = document.createElement("span");
    span.textContent = `${taskText} (${pomodoroCount} Pomodoro${pomodoroCount > 1 ? 's' : ''})`;
    li.appendChild(span);

    li.dataset.pomodoroCount = pomodoroCount; // Store Pomodoro count as a data attribute
    taskList.appendChild(li);
    taskInput.value = "";
    pomodoroInput.value = ""; // Clear input after adding task
    updateTotalPomodoroCount();
    updateTotalTime();
  } else {
    alert("Please enter a valid task and Pomodoro count!");
  }
};



// Event listener for the "Add Task" button
addTaskBtn.addEventListener("click", addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initial update of total Pomodoro count and total time
updateTotalPomodoroCount();
updateTotalTime();              


// Full screeen
const sideNav = document.querySelector(".side-nav");
const detailsSection = document.querySelector(".details");
const fullscreenImg = document.getElementById("fullscreen-img");

// Function to toggle fullscreen mode
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

fullscreenImg.addEventListener("click", toggleFullScreen);

// JavaScript code to control sidebar visibility and transition
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const scrollDirection = currentScroll > lastScrollTop ? "down" : "up";

  // Hide/show fullscreen icon based on scroll direction
  if (scrollDirection === "down") {
    fullscreenImg.classList.add("hidden");
  } else {
    fullscreenImg.classList.remove("hidden");
  }

  // Hide/show sidebar based on scroll position relative to the details section
  const detailsSectionRect = detailsSection.getBoundingClientRect();
  if (detailsSectionRect.top <= window.innerHeight && detailsSectionRect.bottom >= 0) {
    sideNav.classList.add("hidden");
  } else {
    sideNav.classList.remove("hidden");
  }

  lastScrollTop = currentScroll;
});

// --------DARK THEME ENABLE------------

    let icon = document.getElementById("icon");

    icon.onclick = function () {
      document.body.classList.toggle("dark-theme");
      if (document.body.classList.contains("dark-theme")) {
        icon.src = "images/sun.png";
      } else {
        icon.src = "images/moon.png"
      }
}



// -----------Paly Sound------------
    
// Function to play sound
function playSound(soundFile) {
  let audio = new Audio(soundFile);
  audio.play();
}

// Bind functions to button clicks
document.getElementById("focus").onclick = function() {
  playSound('Sound/sound-11.mp3');
};

document.getElementById("shortbreak").onclick = function() {
  playSound('Sound/sound-11.mp3');
};

document.getElementById("longbreak").onclick = function() {
  playSound('Sound/sound-11.mp3');
};

document.getElementById("longbreak").onclick = function() {
  playSound('Sound/sound-11.mp3');
};

// ---------SIGN IN GOGGLE--------

   function onSignIn(googleUser) {
      // get user profile information
     console.log(googleUser.getBasicProfile().getName());
}
   

function signOut() {
  gapi.auth2.getAuthInstance().signOut().then(function() {
    console.log('user signed out')
  })
}


    $(window).on("load", function () {
      $(".loader-wrapper").fadeOut("slow");
      $("document").ready($(".loader-wrapper").fadeOut("slow"));

    });