let characterData = [];

// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
	// Check if the backButton element exists before adding event listener
	const backButton = document.getElementById('backButton');
	if (backButton) {
		backButton.addEventListener('click', function() {
			window.history.back();
		});
	}
});

function getChatterData() {
	return $.getJSON('/chatters')
		.then(function(data) {
			characterData = data;
			console.log(data);
			return data;
		})
		.fail(function() {
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

// Function to fill in circle data
function populateCircle(template, character) {
	const imageName = character.name.replace(/\s+/g, '');
	return template
		.replace('CIRC_IMAGE_URL', 'images/' + imageName + 'Circle.png')
		.replace('NAME', character.name)
}
// Use circles in scrollable widget
function populateChatterCircles() {
	const container = $('.character-circ-container');

	$.get('chattercircle.html', function(template) {
		characterData.forEach(character => {
			const populatedCircle = populateCircle(template, character);
			container.append(populatedCircle);
		});
	}).fail(function() {
		console.error('Failed to load chattercircle.html');
	});
}

// B cards filtering
function loadBChatters() {
	const Bcards = $('.B-character-card-container');
	// Fetch character data from the backend

	// Filter by username for Browse by Creator section
	const userBFilteredData = characterData.filter(character => character.username === '@B');

	// Fetch chattercard template
	$.get('chattercard.html', function(template) {
		userBFilteredData.forEach(character => {
			const populatedCard = populateCard(template, character);
			Bcards.append(populatedCard);
		});

	}).fail(function() {
		console.error('Failed to load chattercard.html');
	});
}

// Index page cards filtering
function populateIndexChatters() {
	populateChatterCircles();
	loadBChatters();
	const Friendscards = $('.Friends-character-card-container');
	const Metacards = $('.Meta-character-card-container');

	// Filter by username for Browse by Creator section
	const userMetaFilteredData = characterData.filter(character => character.username === '@Meta');

	// Fetch chattercard template
	$.get('chattercard.html', function(template) {
		userMetaFilteredData.forEach(character => {
			const populatedCard = populateCard(template, character);
			Metacards.append(populatedCard);
		});

		characterData.forEach(character => {
			const populatedCard = populateCard(template, character);
			Friendscards.append(populatedCard);
		});
	}).fail(function() {
		console.error('Failed to load chattercard.html');
	});
}
// Shop page cards filtering
var shopContainer = $('.shop-character-card-container');
// Function to filter character data based on categories and price
function filterShopCharacterData(selectedCategories = [], selectedPrice = 100) {

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
	return new Promise(function(resolve, reject) {
        var filterPopupOpen = false;	// Initial data load based on URL category
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
	resolve(); // Resolve the promise once logic is complete
    });
}

// Frontend for purchase page cart
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

// Frontend for cart popup
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
// Fetch data for cart items
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
// Fetch data for cart items
function fetchCartCards() {
	const cartCardsContainer = $('.cart-cards-container');
	$.getJSON('/contents', function(cartItems) {
		cartCardsContainer.empty(); // Clear existing items
		$.get('chattercard.html', function(template) {
			if (cartItems.length > 0) {
				cartItems.forEach(function(chatter) {
					console.log(chatter);
					const populatedCard = populateCard(template, chatter);
					cartCardsContainer.append(populatedCard);
				});
			}
		}).fail(function() {
			console.error('Failed to load cart cards.html');
		})
	})
}
// Cart functionalities
function addToCart(character) {
	$.ajax({
		type: 'POST',
		url: '/addToCart',
		contentType: 'application/json',
		data: JSON.stringify(character),
		success: function(response) {
			console.log(response); // Log success message
			fetchCartItems();
			populateDetails(character); // Update character details on the page
		},
		error: function() {
			console.error('Failed to add chatter to cart');
		}
	});
}
function removeFromCart(name) {
	$.ajax({
		url: '/removeFromCart',
		type: 'POST',
		contentType: 'text/plain', // Specify the content type
		data: name, // Convert the Chatter object to JSON
		success: function(response) {
			console.log(response); // Handle success response as needed
			fetchCartItems(); // Refresh cart items after removal
			fetchCartCards();
		},
		error: function(xhr, status, error) {
			console.error('Failed to remove item from cart', error);
		}
	});
}

// Chatter Preview logic
// Populate details on chatter preview
function populateDetails(character) {
	const imageName = character.name.replace(/\s+/g, '');
	$('.chatter-image').attr('src', 'images/' + imageName + 'Rectangle.png');
	$('.chatter-name').text(character.name);
	$('.chatter-username').text(character.username);
	$('.chatter-price').text('$' + character.price.toFixed(2));
	$('.chatter-description').text(character.description);
}
// Find chatter for chatter preview
function loadCharacterDetails(characterName) {
	if (characterName) {
		// Fetch character details from the backend

		const character = characterData.find(c => c.name === characterName);
		if (!character) {
			console.error(`Character with name ${characterName} not found.`);
			return;
		}

		// Update with character details
		populateVerticalScroll();
		populateDetails(character);

		// Attach event handler to the cart icon
		$('.fa-cart-plus').off('click').on('click', function() {
			addToCart(character);
		});

	}
}
function populateVerticalScroll() {
	// Vertical scroll images
	var imageContainer = document.getElementById('image-container');
	var numberOfImages = 5; // Number of times to repeat the image

	for (var i = 0; i < numberOfImages; i++) {
		var img = document.createElement('img');
		img.classList.add('chatter-image'); // Add chatter-image class
		img.alt = 'Chatter Card ' + (i + 1);
		imageContainer.appendChild(img);
	}
}

var urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('query');
function loadQuery() {
	urlParams = new URLSearchParams(window.location.search);
	query = urlParams.get('query');
	var query = urlParams.get('query');
	if (query) {
		queryCharacterData(query);
	}

	document.getElementById('searchInput').addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			const query = event.target.value.trim();
			console.log(query);
			if (query) {
				window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
			}
		}
	});
}


function queryCharacterData(query) {

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

}



