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
    if (bookingButtonSection && bookingButton) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bookingButton.classList.remove('fixed-button');
                    bookingButton.classList.add('original-button');
                } else {
                    bookingButton.classList.add('fixed-button');
                    bookingButton.classList.remove('original-button');
                }
            });
        }, { threshold: 0 }); // Observe when the section is not visible at all

        observer.observe(bookingButtonSection);
    }
});