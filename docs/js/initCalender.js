export function initCalendar(disabledDates) {
  flatpickr("#range-calendar", {
    locale: "ko",
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    inline: false,
    altInput: true,
    disable: disabledDates,
    disableMobile: true,

    
    onChange: function (selectedDates, dateStr, instance) {
  const nightsInfo = document.getElementById("nights-info");
  const selectedRange = document.getElementById("selected-range");

  if (!nightsInfo || !selectedRange) return;

  const checkIn = selectedDates[0];
  const checkOut = selectedDates[1];

  if (checkIn && checkOut) {
    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    if (diff === 0) {
      alert("체크인과 체크아웃 날짜는 같을 수 없습니다.");
      instance.clear();
      selectedRange.value = "";
      nightsInfo.textContent = "";
      return;
    }

    const formattedCheckIn = instance.formatDate(checkIn, "Y-m-d");
    const formattedCheckOut = instance.formatDate(checkOut, "Y-m-d");

    selectedRange.value = `${formattedCheckIn}~ ${formattedCheckOut}`;
    nightsInfo.textContent = `${diff}박 ${diff + 1}일`;
  } else {
    selectedRange.value = "";
    nightsInfo.textContent = "";
  }
}
  });
}
