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
      const checkIn = selectedDates[0];
      const checkOut = selectedDates[1];
      const nightsInfo = document.getElementById("nights-info");

      if (checkIn && checkOut && checkIn.getTime() === checkOut.getTime()) {
        alert("체크인과 체크아웃 날짜는 같을 수 없습니다.");
        instance.clear();
        document.getElementById("selected-range").value = "";
        nightsInfo.textContent = ""; // 경고 후 날짜 정보 초기화
        return;
      }

      if (checkIn && checkOut) {
        // 날짜 범위 설정
        const formattedCheckIn = flatpickr.formatDate(checkIn, "Y-m-d");
        const formattedCheckOut = flatpickr.formatDate(checkOut, "Y-m-d");

        document.getElementById("selected-range").value = `${formattedCheckIn}~ ${formattedCheckOut}`;

        // 박수 계산
        const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        nightsInfo.textContent = `${nights}박 ${nights + 1}일`;  // 1박 추가된 표현
      } else {
        document.getElementById("selected-range").value = "";
        nightsInfo.textContent = "";
      }
    }
  });
}
