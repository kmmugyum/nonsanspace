// initCalendar.js
export function initCalendar(disabledDates) {
  flatpickr("#range-calendar", {
    locale: "ko",
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    inline: false,
    altInput: true,
    disable: disabledDates,
    onChange: function (selectedDates, dateStr, instance) {
      const checkIn = selectedDates[0];
      const checkOut = selectedDates[1];
      const nightsInfo = document.getElementById("nights-info");

      if (checkIn && checkOut && checkIn.getTime() === checkOut.getTime()) {
        alert("체크인과 체크아웃 날짜는 같을 수 없습니다.");
        instance.clear();
        document.getElementById("selected-range").value = "";
        return;
      }

      document.getElementById("selected-range").value = dateStr;

      if (checkIn && checkOut) {
        const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        nightsInfo.textContent = `${nights}박 ${nights + 1}일`;
      } else {
        nightsInfo.textContent = "";
      }
    }
  });
}
