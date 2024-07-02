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
    
// Search query logic
	const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('query');

            if (query) {
                queryCharacterData(query);
            }
function queryCharacterData(query) {
                $.getJSON('/chatters', function(characterData) {
                    const filteredData = characterData.filter(character => 
                        character.name.toLowerCase().includes(query.toLowerCase()) ||
                        character.username.toLowerCase().includes(query.toLowerCase()) ||
                        character.blurb.toLowerCase().includes(query.toLowerCase()) ||
                        character.description.toLowerCase().includes(query.toLowerCase()) || 
                        character.category.some(c => c.toLowerCase().includes(query))
                    );

                    const container = $('.character-card-container');
                    container.empty();
                    
                 // Display filtered data
                    container.empty();
                    $.get('chattercard.html', function(template) {
                        if (filteredData.length === 0) {
                            console.error('No data found for query');
                        }
                        filteredData.forEach(character => {
                            const populatedCard = populateCard(template, character);
                            container.append(populatedCard);
                        });
                    }).fail(function() {
                        console.error('Failed to load chattercard.html');
                    });
                }).fail(function() {
                    console.error('Failed to fetch chatters from API');
                });

            }
// Filter logic
    var filterPopupOpen = false;
    // Initial data load based on URL category
    const category = urlParams.get('category') || 'All';
    const initialCategories = category === 'All' ? [] : [category];
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
    filterShopCharacterData(initialCategories);
// Event listener for the apply button
    $('#applyButton').on('click', function() {
         // Get selected categories
         const selectedCategories = [];
         $('input[type=checkbox]:checked').each(function() {
               selectedCategories.push($(this).val());
         });
		// Get selected price
        const selectedPrice = parseFloat($('#priceRange').val());
		// Apply filters
         filterShopCharacterData(selectedCategories, selectedPrice);
        closeFilterPopup();
     })  
	      
    
			            

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
    	    
// Shop page cards filtering
    	    const shopContainer = $('.shop-character-card-container');
            // Function to filter character data based on categories and price
            function filterShopCharacterData(selectedCategories = [], selectedPrice = 100) {
            	$.getJSON('/chatters', function(characterData) {
                    const filteredData = characterData.filter(character => {
                        const matchesCategory = selectedCategories.length === 0 || character.category.some(cat => selectedCategories.includes(cat));
                        const matchesPrice = character.price <= selectedPrice;
                        return matchesCategory && matchesPrice;
                    });

                // Display filtered data
                    shopContainer.empty();
                    $.get('chattercard.html', function(template) {
                        if (filteredData.length === 0) {
                            console.error('No data found for selected filters');
                        }
                        filteredData.forEach(character => {
                            const populatedCard = populateCard(template, character);
                            shopContainer.append(populatedCard);
                        });
                    }).fail(function() {
                        console.error('Failed to load chattercard.html');
                    });
                }).fail(function() {
                    console.error('Failed to fetch chatters from API');
                });
            }
