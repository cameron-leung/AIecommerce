// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Check if the backButton element exists before adding event listener
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    } else {
        console.error('Element with ID "backButton" not found.');
    }
});
