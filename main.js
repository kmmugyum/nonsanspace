document.addEventListener('DOMContentLoaded', function() {
    const bookingButton = document.getElementById('booking-button');
    const bookingButtonSection = document.getElementById('booking-button-section');
    let originalBookingButtonOffsetTop = bookingButtonSection.offsetTop;

    function updateOffset() {
        originalBookingButtonOffsetTop = bookingButtonSection.offsetTop;
    }

    updateOffset();
    window.addEventListener('resize', updateOffset);

    window.addEventListener('scroll', function() {
        if (window.scrollY > originalBookingButtonOffsetTop) {
            bookingButton.classList.add('fixed-button');
        } else {
            bookingButton.classList.remove('fixed-button');
        }
    });

    const images = document.querySelectorAll('#carousel-images img');
    const container = document.getElementById('carousel-images');
    const indicator = document.getElementById('carousel-indicator');
    let current = 0;
    const total = images.length;

    function showSlide(index) {
        container.style.transform = `translateX(-${index * 100}%)`;
        indicator.textContent = `${index + 1} / ${total}`;
    }

    function nextSlide() {
        current = (current + 1) % total;
        showSlide(current);
    }

    setInterval(nextSlide, 1500);
});