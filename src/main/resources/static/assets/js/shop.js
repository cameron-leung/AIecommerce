$(document).ready(function () {
			$('#navbar-placeholder').load('navbar.html', function () {
				$('.discover-icon').addClass('active');
			});
			loadFilterLogic();
		});
function filterShopCharacterData(selectedCategories = [], selectedPrice = 100) {
	$.getJSON('/chatters', function(characterData) {
		const filteredData = characterData.filter(character => {
			const matchesCategory = selectedCategories.length === 0 || character.category.some(cat => selectedCategories.includes(cat));
			const matchesPrice = character.price <= selectedPrice;
			return matchesCategory && matchesPrice;
		});
		const shopContainer = $('.shop-character-card-container');
		// Clear previous content before appending new data
		shopContainer.empty();

		// Display filtered data
		if (filteredData.length === 0) {
			$('#no-data-message').text('No Chatters found');
		} else {
			$.get('chattercard.html', function(template) {
				filteredData.forEach(character => {
					const populatedCard = populateCard(template, character);
					shopContainer.append(populatedCard);
				});
			}).fail(function() {
				$('#no-data-message').text('No Chatters found');
			});
		}
	}).fail(function() {
		$('#no-data-message').text('No Chatters found');
	});
}
function openFilterPopup() {
	$('#filterPopupOverlay').fadeIn();
	filterPopupOpen = true;
}
function closeFilterPopup() {
	$('#filterPopupOverlay').fadeOut();
	filterPopupOpen = false;
}
// Update the displayed price value dynamically and adjust the slider's appearance
function updateSliderBackground(slider) {
	const value = slider.value;
	slider.style.setProperty('--thumb-position', `${value}%`);
}
// Filter logic
function loadFilterLogic() {
	var filterPopupOpen = false;
	// Initial data load based on URL category
	const urlParams = new URLSearchParams(window.location.search);
	const category = urlParams.get('category') || 'All';
	const initialCategories = category === 'All' ? [] : [category];
	// Open and close filter

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
}