import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_x42u5N0cgcL4UZg72eWHho5oi3Nx1Tw",
  authDomain: "healing-space-22fcc.firebaseapp.com",
  databaseURL: "https://healing-space-22fcc-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

const ADMIN_EMAIL = "small51710753@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("google-login");

  loginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        if (user.email === ADMIN_EMAIL) {
          document.getElementById("admin-login").classList.add("hidden");
          document.getElementById("admin-panel").classList.remove("hidden");

          // ✅ 예약 데이터 불러오기
          const listContainer = document.getElementById("reservation-list");
          const reservationsRef = ref(db, "reservations");

          onValue(reservationsRef, (snapshot) => {
            const reservations = snapshot.val();
            listContainer.innerHTML = "";

            if (reservations) {
              Object.entries(reservations).forEach(([id, data]) => {
                const card = document.createElement("div");
                card.className = "p-4 mb-3 bg-white rounded shadow";

                card.innerHTML = `
                  <div class="border border-gray-300 rounded-xl p-5 bg-white shadow-md">
                    <div class="flex justify-between items-center mb-2">
                      <div class="text-lg font-bold text-[#5C4430]">${data.name}</div>
                      <div class="text-sm text-gray-500">${data.phone}</div>
                    </div>
                    <div class="text-sm text-gray-700 mb-1">
                      <b>📅 일정:</b> ${data.checkIn} ~ ${data.checkOut} (${data.nights}박 ${data.nights+1}일)
                    </div>
                    <div class="text-sm text-gray-700 mb-1">
                      <b>📝 요청사항:</b> ${data.message || "없음"}
                    </div>
                    <div class="flex items-center justify-between mt-4">
                      <div class="text-sm text-gray-700">
                        <b>상태:</b>
                        <span class="status-text font-medium ${
                          data.status === "confirmed" ? "text-green-600" : "text-yellow-600"
                        }">${data.status || "pending"}</span>
                      </div>

                      <!-- 토글 스위치 -->
                      <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only toggle-checkbox" ${
                          data.status === "confirmed" ? "checked" : ""
                        }>
                        <div class="w-11 h-6 bg-gray-300 rounded-full toggle-bg relative">
                          <div class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                `;

                // 상태 전환 버튼 이벤트
                card.querySelector(".toggle-checkbox").addEventListener("change", (e) => {
                  const newStatus = e.target.checked ? "confirmed" : "pending";
                  update(ref(db, `reservations/${id}`), { status: newStatus });
                });

            const toggleCheckbox = card.querySelector(".toggle-checkbox");
const dot = card.querySelector(".dot");
const bg = card.querySelector(".toggle-bg");

// ✅ 초기 상태 반영
if (toggleCheckbox.checked) {
  dot.classList.add("translate-x-5");
  bg.classList.remove("bg-gray-300", "bg-red-500");
  bg.classList.add("bg-green-500");
} else {
  bg.classList.remove("bg-gray-300", "bg-green-500");
  bg.classList.add("bg-red-500");
}

toggleCheckbox.addEventListener("change", (e) => {
  const newStatus = e.target.checked ? "confirmed" : "pending";

  // Firebase 업데이트
  update(ref(db, `reservations/${id}`), { status: newStatus });

  // ✅ UI 변경
  dot.classList.toggle("translate-x-5");

  // ✅ 토글 배경 색상 전환
  if (e.target.checked) {
    bg.classList.remove("bg-gray-300", "bg-red-500");
    bg.classList.add("bg-green-500");
  } else {
    bg.classList.remove("bg-gray-300", "bg-green-500");
    bg.classList.add("bg-red-500");
  }
});

                listContainer.appendChild(card);
              });
            } else {
              listContainer.innerHTML = "<p>예약 정보가 없습니다.</p>";
            }
          });
        } else {
          alert("접근 권한이 없습니다.");
          auth.signOut();
        }
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        alert("로그인에 실패했습니다.");
      });
  });
});
