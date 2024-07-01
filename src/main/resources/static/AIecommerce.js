// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    
});

// Check if the backButton element exists before adding event listener
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    } else {
        console.error('Element with ID "backButton" not found.');
    }
    
    
    // Filter logic
    var filterPopupOpen = false;
	// Open and close filter
   function openFilterPopup() {
        $('#filterPopupOverlay').fadeIn();
        filterPopupOpen = true;
   }
   function closeFilterPopup() {
        $('#filterPopupOverlay').fadeOut();
        filterPopupOpen = false;
   }
	// Check conditions to open/close filter
  $(document).on('click', function(event) {
       var $target = $(event.target);
       if (filterPopupOpen && !$target.closest('#filterPopupContent').length && !$target.is('#filterPopupContent')) {
             closeFilterPopup();
       }
    });
    $('#filterPopupContent').on('click', function(event) {
          event.stopPropagation();
    });
    $(document).on('click', '#openFilterPopupIcon', function(event) {
          event.stopPropagation();
          openFilterPopup();
    });       
    // Update the displayed price value dynamically and adjust the slider's appearance
    function updateSliderBackground(slider) {
        const value = slider.value;
        slider.style.setProperty('--thumb-position', `${value}%`);
    }
            $('#priceRange').on('input', function() {
                const selectedPrice = $(this).val();
                $('#priceValue').text(`$${selectedPrice}`);
                updateSliderBackground(this);
            });
            // Check the checkboxes for the initial categories
            initialCategories.forEach(category => {
                $('input[type=checkbox][value="' + category + '"]').prop('checked', true);
            });

// Function to fill in card data
            function populateCard(template, character) {
    	         const imageName = character.name.replace(/\s+/g, '');
    	         return template
    	             .replace(/RECT_IMAGE_URL/g, 'images/' + imageName + 'Rectangle.png')
    	             .replace(/NAME/g, character.name)
    	             .replace(/USER/g, character.username)
    	             .replace(/PRICE/g, character.price.toFixed(2))
    	             .replace(/BLURB/g, character.blurb);
    	    }
