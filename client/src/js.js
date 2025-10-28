document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.card-slider');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // Card width + margin-right (15px left + 15px right)

    // Function to update the slider's position
    function updateSliderPosition() {
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    // Event listener for the "Next" button
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) { // Stop at the last card
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the first card
        }
        updateSliderPosition();
    });

    // Event listener for the "Previous" button
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) { // Stop at the first card
            currentIndex--;
        } else {
            currentIndex = cards.length - 1; // Loop to the last card
        }
        updateSliderPosition();
    });

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextBtn.click();
        } else if (event.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });

    // Optional: Adjust card width dynamically on resize
    window.addEventListener('resize', () => {
        // Recalculate cardWidth if your layout is responsive and card sizes change
        // For this example, if cardWidth is fixed, this might not be strictly necessary
        // but it's good practice for more complex responsive designs.
        // If your card's actual rendered width changes, you'd need to re-measure.
        // const newCardWidth = cards[0].offsetWidth + 30;
        // if (cardWidth !== newCardWidth) {
        //     cardWidth = newCardWidth;
        //     updateSliderPosition(); // Re-adjust if the width has changed
        // }
    });

    // Initial position
    updateSliderPosition();
});
