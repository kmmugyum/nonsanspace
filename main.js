document.addEventListener('DOMContentLoaded', function() {
    const directBookingButton = document.querySelector('a[href="#direct-booking"]');
    const popupModal = document.getElementById('popup-modal');
    const closeReservationButton = document.getElementById('close-reservation');
    const bookingButtonSection = document.getElementById('booking-button-section');
    const bookingButton = document.getElementById('booking-button');

    if (directBookingButton && popupModal && closeReservationButton) {
        directBookingButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            popupModal.classList.remove('hidden'); // Show the modal
        });

        closeReservationButton.addEventListener('click', function() {
            popupModal.classList.add('hidden'); // Hide the modal
        });

        // Optional: Hide modal when clicking outside of it
        popupModal.addEventListener('click', function(event) {
            if (event.target === popupModal) {
                popupModal.classList.add('hidden');
            }
        });
    }

    // Carousel functionality
    const carouselImages = document.getElementById('carousel-images');
    const carouselIndicator = document.getElementById('carousel-indicator');
    const images = carouselImages ? carouselImages.querySelectorAll('img') : [];
    let currentIndex = 0;

    if (carouselImages && carouselIndicator && images.length > 0) {
        function updateCarousel() {
            carouselImages.style.transform = `translateX(${-currentIndex * 100}%`;
            carouselIndicator.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }, 2700); // Change image every 3 seconds
    }


    // Fixed booking button on scroll
    if (bookingButtonSection || bookingButton) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // bookingButtonSection이 화면에 보일 때: 원래 버튼 스타일로 복원
                    bookingButton.classList.remove('fixed-button');
                    // Airbnb 버튼의 원래 Tailwind 클래스들을 추가합니다.
                    bookingButton.classList.add('inline-block');
                } else {
                    // bookingButtonSection이 화면에서 사라질 때: 고정된 버튼 스타일 적용
                    bookingButton.classList.add('fixed-button');
                    // 원래 버튼 스타일 클래스들을 제거합니다. (mb-4는 고정 시 필요 없음)
                    bookingButton.classList.remove('inline-block');
                }
            });
        }, { threshold: 0 }); // bookingButtonSection이 완전히 화면 밖으로 나갔을 때 고정

        observer.observe(bookingButtonSection);
    }
});