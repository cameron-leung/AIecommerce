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

//Purchase page cart logic
function purchaseItemHtml(item) {
	return `
        <!--  Cart item -->
        <div class="d-flex flex-column w-100 overflow-hidden mb-3">
            <div class="d-flex flex-row align-items-flex-start justify-content-start">
                <img class="chatter-image object-fit-cover rounded-3 w-50" src="images/${item.name.replace(/\s+/g, '')}Rectangle.png" style="height: 20vh;">
                <div class="flex-column w-50 pl-1">
                    <h3 class="chatter-name m-0 p-0">${item.name}</h3>
                    <h5 class="chatter-username mt-0 mb-5">${item.username}</h5>
                    <div class="d-flex flex-row justify-content-between">
                        <h5 class="m-0 w-auto">Price</h5>
                        <h5 class="chatter-price w-auto mr-0 text-end">$${item.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function purchaseItemHtml(item) {
	return `
                        <div class="d-flex flex-column w-100 overflow-hidden mb-3">
                            <div class="d-flex flex-row align-items-center justify-content-end">
                                <img class="chatter-image object-fit-cover rounded-3 w-50" src="images/${item.name.replace(/\s+/g, '')}Rectangle.png" style="height: 20vh;">
                                <div class="flex-column w-30 p-2">
                                    <h3 class="chatter-name m-0 p-0">${item.name}</h3>
                                    <h5 class="chatter-username mt-0 mb-5">${item.username}</h5>
                                    <h5 class="chatter-price mb-0">$${item.price}</h5>
                                </div>
                                <div class="d-flex flex-column h-100 align-items-end justify-content-end flex-grow-1">
                                    <a href="#"><img class="m-0 p-0" style="width: 25px;" src="images/AIchatlogopink.png" alt="Logo"></a>
                                    <i id="${item.name}" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-solid fa-trash"></i>
                                    <i id="check-icon" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-regular fa-square-check"></i>
                                </div>
                            </div>
                        </div>
                    `;
}
function cartItemHtml(item) {
	return `
                        <div class="d-flex flex-column w-100 overflow-hidden mb-3">
                            <div class="d-flex flex-row align-items-center justify-content-end">
                                <img class="chatter-image object-fit-cover rounded-3 w-50" src="images/${item.name.replace(/\s+/g, '')}Rectangle.png" style="height: 20vh;">
                                <div class="flex-column w-30 p-2">
                                    <h3 class="chatter-name m-0 p-0">${item.name}</h3>
                                    <h5 class="chatter-username mt-0 mb-5">${item.username}</h5>
                                    <h5 class="chatter-price mb-0">$${item.price}</h5>
                                </div>
                                <div class="d-flex flex-column h-100 align-items-end justify-content-end flex-grow-1">
                                    <a href="#"><img class="m-0 p-0" style="width: 25px;" src="images/AIchatlogopink.png" alt="Logo"></a>
                                    <i id="${item.name}" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-solid fa-trash"></i>
                                    <i id="check-icon" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-regular fa-square-check"></i>
                                </div>
                            </div>
                        </div>
                    `;
}
function fetchCartItems() {
	$.getJSON('/contents', function(cartItems) {
		$('#cartItemsContainer').empty(); // Clear existing items

		console.log(cartItems);
		if (cartItems.length > 0) {
			cartItems.forEach(function(item) {
				var itemHtml = purchaseItemHtml(item);
				$('#purchaseItemsContainer').append(itemHtml);
				itemHtml = cartItemHtml(item);
				$('#cartItemsContainer').append(itemHtml);
			});

			// Calculate subtotal and tax
			var subtotal = cartItems.reduce((total, item) => total + item.price, 0);
			var tax = subtotal * 0.1;
			var total = subtotal + tax;
			$('#cart-subtotal').text('$' + subtotal.toFixed(2));
			$('#cart-tax').text('$' + tax.toFixed(2));
			$('#cart-total').text('$' + total.toFixed(2));
		}
	})
}

