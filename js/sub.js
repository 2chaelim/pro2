// ham
const $ham = document.querySelector(".bar");
const $menu = document.querySelector(".top-menu");

$ham.addEventListener("click", () => {
  $menu.classList.toggle("on");
});

// accordian
const btns = document.querySelectorAll(".complet-btn > input");
const titles = document.querySelectorAll(".title");
const contents = document.querySelectorAll(".con");

btns.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    contents.forEach((item) => {
      item.classList.remove("on");
    });
    if (e.target == btns[3]) {
      document.alert("예약이 완료되었습니다!");
    } else {
      contents[i + 1].classList.add("on");
    }
  });
});

// calendar
function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    dateToday: null,
    calWeekDays: ["일", "월", "화", "수", "목", "금", "토"],
    calMonthName: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setDate(1);
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setDate(1);
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentDate = calendarControl.localDate.getDate();
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setDate(currentDate);
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
      // 강사수정
      document.querySelectorAll(".number-item").forEach((day) => {
        day.classList.remove("on");
        this.parentNode.classList.add("on");
      });
      console.log(this.parentNode);
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
        <div class="calendar-year-month">
        <div class="calendar-year-label"></div>
        <div>년</div>
        <div class="calendar-month-label"></div>
        </div>
        <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
        </div>
        <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate =
        calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );

      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }

      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      this.dateToday = calendarControl.localDate.getDate();
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [this.dateToday - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}

const calendarControl = new CalendarControl();
