// submitForm.js
import { db } from "./firebaseConfig.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { initCalendar } from "./initCalender.js";

const disabledDates = [];

onValue(ref(db, 'reservations'), (snapshot) => {
  const reservations = snapshot.val();
  if (reservations) {
    Object.values(reservations).forEach(reservation => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);

      for (
        let date = new Date(checkIn);
        date <= checkOut;
        date.setDate(date.getDate() + 1)
      ) {
        disabledDates.push(new Date(date));
      }
    });
  }
  initCalendar(disabledDates);
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input[name='name']").value;
    const phone = form.querySelector("input[name='phone']").value;
    const message = form.querySelector("textarea[name='message']").value;
    const dateRange = document.getElementById("selected-range").value;

    const [checkIn, checkOut] = dateRange.split("~ ");
    const nights = Math.round(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );

    push(ref(db, "reservations"), {
      name,
      phone,
      checkIn,
      checkOut,
      nights,
      message,
      status: "pending",
      timestamp: Date.now()
    }).then(() => {
      alert("예약이 완료되었습니다!");
      form.reset();
      document.getElementById("selected-range").value = "";
      document.getElementById("nights-info").textContent = "";
      document.getElementById("result-box").innerHTML = `
        <div class="mt-4 bg-white p-4 rounded shadow text-center text-[#5C4430]">
          <p class="font-bold text-lg">예약 요청이 완료되었습니다!</p>
          <p class="mt-2 text-sm">
            예약 확정을 위해 아래 계좌로 입금해주세요.<br/>
            💸 <b>토스뱅크</b> 김무겸 1000-1234-5678<br/>
            💸 <b>카카오뱅크</b> 김무겸 3333-12-3456789<br/>
            입금 확인 후 예약이 확정됩니다.
          </p>
        </div>
      `;
    }).catch((err) => {
      console.error("저장 오류", err);
      alert("예약 중 문제가 발생했습니다.");
    });
  });
});
