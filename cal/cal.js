const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventBtn = document.querySelector(".add-event");
const addEventWrapper = document.querySelector(".add-event-wrapper");
const closeAddEventBtn = document.querySelector(".close");
const addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let activeDay;
let eventsArr = [];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = `${months[month]} ${year}`;
  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event = eventsArr.some(eventObj =>
      eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year
    );
    if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      activeDay = i;
      days += `<div class="day today ${event ? "event" : ""}">${i}</div>`;
    } else {
      days += `<div class="day ${event ? "event" : ""}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

gotoBtn.addEventListener("click", () => {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] <= 12 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
    }
  }
});

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach(day => {
    day.addEventListener("click", e => {
      activeDay = Number(e.target.innerHTML);
      updateEvents(activeDay);
    });
  });
}

function updateEvents(day) {
  const events = eventsArr.filter(event => event.day === day && event.month === month + 1 && event.year === year);
  eventDay.innerHTML = `${months[month]} ${day}`;
  eventDate.innerHTML = `${day} ${months[month]} ${year}`;
  let eventsHTML = "";
  if (events.length === 0) {
    eventsHTML = `<div class="no-event">No Events</div>`;
  } else {
    events.forEach(event => {
      eventsHTML += `
        <div class="event">
          <div class="title"><i class="fas fa-circle"></i><h3 class="event-title">${event.title}</h3></div>
          <div class="event-time">${event.time}</div>
        </div>
      `;
    });
  }
  eventsContainer.innerHTML = eventsHTML;
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.add("active");
});

closeAddEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

addEventSubmit.addEventListener("click", () => {
  const eventName = document.querySelector(".event-name").value;
  const timeFrom = document.querySelector(".event-time-from").value;
  const timeTo = document.querySelector(".event-time-to").value;
  if (eventName && timeFrom && timeTo) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      title: eventName,
      time: `${timeFrom} - ${timeTo}`
    });
    updateEvents(activeDay);
    document.querySelector(".event-name").value = "";
    document.querySelector(".event-time-from").value = "";
    document.querySelector(".event-time-to").value = "";
    addEventWrapper.classList.remove("active");
  }
});

initCalendar();
