const startOfTime = document.querySelector("#start-of-time");
const endOfTime = document.querySelector("#end-of-time");
const startBtn = document.querySelector(".start-time");
const endBtn = document.querySelector(".end-time");
const clearBtn = document.querySelector(".clear");

// Local Store
class LocalStore {
  constructor() {
    this.key = "times";
  }

  getTimes () {
    let times;

    if (localStorage.getItem(this.key) !== null) {
      times = JSON.parse(localStorage.getItem(this.key));
    }else {
      times = {};
    }
    return times
  }

  addTimes (key) {
    let times = this.getTimes();
    const now = new Date();
    let hour = now.getHours() > 9 ? now.getHours() : '0'+now.getHours();
    let min = now.getMinutes() > 9 ? now.getMinutes() : '0'+now.getMinutes();

    if (key === "start") {
      times.start = `${hour}:${min}`;
    }else {
      times.end = `${hour}:${min}`;
    }
    localStorage.setItem(this.key, JSON.stringify(times));
  }

  displayTimes () {
    let obj = this.getTimes();

     if (obj.start) {
     startOfTime.value = obj.start;
   }
 
   if (obj.end) {
     endOfTime.value = obj.end;
   }
   }
}


const store = new LocalStore();

// If Disabled mode
function toBtnDisable () {
  if (startOfTime.value !== "") {
   startBtn.removeEventListener("click", startTime);
  startBtn.setAttribute("disabled", "true");
  startBtn.classList.add("invisible");
 }

  if (endOfTime.value !== "" || startOfTime.value === "") {
  endBtn.removeEventListener("click", endTime);
  endBtn.setAttribute("disabled", "true");
  endBtn.classList.add("invisible");
 }
}

// Start time
startBtn.addEventListener("click", startTime);
function startTime (event) {
  store.addTimes("start");
  store.displayTimes();
  toBtnDisable();
  endBtn.removeAttribute("disabled");
  endBtn.classList.remove("invisible");
 }

 // End time
 endBtn.addEventListener("click", endTime);
function endTime (event) {
  store.addTimes("end");
  store.displayTimes();
  toBtnDisable();
 }

 // Display times
store.displayTimes();
toBtnDisable();

// clear storage
clearBtn.addEventListener("click", () => {
  localStorage.clear();
})