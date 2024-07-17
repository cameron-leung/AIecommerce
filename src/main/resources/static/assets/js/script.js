const characterData = [];

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
function profileButton() {
	$('#profile-link').on('click', function(e) {
		e.preventDefault();

		// Make AJAX request to fetch current profile
		$.ajax({
			type: 'GET',
			url: '/getProfile',
			success: function(profile) {
				if (!profile) {
					// If profile is null, redirect to login page
					window.location.href = 'login.html';
				} else {
					// If profile is not null, redirect to profile page
					window.location.href = 'profilepage.html';
				}
			},
			error: function() {
				// Redirect to login page
				window.location.href = 'login.html';
			}
		});
	});
}
function loadIndex() {
	$.getJSON('/chatters', function(characters) {
		characterData.push(...characters);
		populateIndexChatters();
	}).fail(function() {
		console.error('Failed to fetch chatters from API');
	});
	$.ajax({
		type: 'GET',
		url: '/getProfile',
		success: function(profile) {
			if (profile) {
				// Populate the chatters using myChatters from the profile
				if (profile.myChatters && profile.myChatters.length > 0) {
					populateChatterCircles(profile.myChatters);
				}
			}
		}
	})
}
function loadProfile() {
	$.ajax({
		type: 'GET',
		url: '/getProfile',
		success: function(profile) {
			if (profile) {
				$('#profileName').text(profile.name || 'Unknown Name');
				$('#profileUsername').text('@' + (profile.username || 'UnknownUsername'));
				$('#followersPlaceholder').text((profile.followers && profile.followers.length) || 0);
				$('#followingPlaceholder').text((profile.following && profile.following.length) || 0);
				$('#chattersPlaceholder').text((profile.myChatters && profile.myChatters.length) || 0);

				// Populate the chatters using myChatters from the profile
				if (profile.myChatters && profile.myChatters.length > 0) {
					populateChatterCircles(profile.myChatters);
				}
				$('.fa-cart-plus').off('click').on('click', function() {

				})
			} else {
				window.location.href = 'login.html';
			}
		},
		error: function() {
			window.location.href = 'login.html';
		}
	})
}
function loadCartPopup() {
	var cartPopupOpen = false;
	// Open the cart popup
	function openCartPopup() {
		if (!cartPopupOpen) {
			$('#cartPopupOverlay').removeClass('d-none').fadeIn();
			fetchCartPopup();
			cartPopupOpen = true;
		}
	}
	// Close the cart popup
	function closeCartPopup() {
		$('#cartPopupOverlay').addClass('d-none').fadeOut();
		cartPopupOpen = false;
	}
	// Event listener for the icon click to open the popup and add to cart
	$('.openCartPopupIcon').on('click', function(event) {
		// Fetch and display cart items
		fetchCartPopup();
		updateCheckoutButton();
		openCartPopup();
		event.stopPropagation(); // Prevent event propagation
	});
	// Close the cart popup when clicking outside
	$(document).on('click', function(event) {
		if (cartPopupOpen && !$(event.target).closest('#cartPopupContent').length) {
			closeCartPopup();
		}
	});
}
function login() {
	$('#login-form').on('submit', function(e) {
		e.preventDefault();

		const formData = {
			username: $('#username').val(),
			password: $('#password').val()
		};

		$.ajax({
			type: 'POST',
			url: '/login',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				window.location.href = 'profilepage.html';
			},
			error: function(error) {
				$('#error-message').text('Invalid username or password');
			}
		});
	});
}
function logout() {
	$.ajax({
		type: 'POST',
		url: '/logout',
		success: function() {
			// Redirect to login page after successful logout
			window.location.href = 'login.html';
		},

	});
}

function loadCreateAccount() {
	$('#create-account-form').on('submit', function(e) {
		e.preventDefault();

		const formData = {
			name: $('#name').val(),
			username: $('#username').val(),
			email: $('#email').val(),
			password: $('#password').val()
		};
		$.ajax({
			type: 'POST',
			url: '/createAccount',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				window.location.href = 'profilepage.html';
			},
			error: function(error) {
				if (error.status === 409) {
					$('#error-message').text('Username already exists!');
				} else {
					$('#error-message').text('Error occurred. Please try again.');
				}
			}
		});
	});
}
// Function to update the profile
function loadUpdateProfile() {
	$('#submitButton').on('click', function(e) {
		e.preventDefault();
		var nameInput = $('#nameInput').val().trim();
		var usernameInput = $('#usernameInput').val().trim();

		if (nameInput === '' && usernameInput === '') {
			$('#error-message').text('Please fill out at least one field.');
			return;
		}

		const formData = {
			name: nameInput,
			username: usernameInput
		};

		$.ajax({
			type: 'POST',
			url: '/updateProfile',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				window.location.href = 'profilepage.html';
			},
			error: function(error) {
				if (error.status === 409) {
					$('#error-message').text('Username already exists!');
				} else if (error.status === 401) {
					$('#error-message').text('No profile is currently logged in.');
				} else {
					$('#error-message').text('Error occurred. Please try again.');
				}
			}
		});
	})
}
// Function to fill in card data
function populateCard(template, character) {
	const imageName = character.name.replace(/\s+/g, '');
	return template
		.replace(/RECT_IMAGE_URL/g, 'assets/img/' + imageName + 'Rectangle.jpg')
		.replace(/NAME/g, character.name)
		.replace(/USER/g, character.username)
		.replace(/PRICE/g, character.price.toFixed(2))
		.replace(/BLURB/g, character.blurb);
}
// Function to fill in circle data
function populateCircle(template, character) {
	const imageName = character.name.replace(/\s+/g, '');
	return template
		.replace('CIRC_IMAGE_URL', 'assets/img/' + imageName + 'Circle.jpg')
		.replace('NAME', character.name)
}

function populateChatterCircles(myChatters) {
	const container = $('.character-circ-container');
	//container.empty(); // Clear the container before appending new content

	// Add the header to the container
	container.append('<h1 class="mt-3 display-4">Recents</h1>');
	// Fetch chattercard template
	$.get('chattercircle.html', function(template) {
		myChatters.forEach(character => {
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
	const Friendscards = $('.Friends-character-card-container');
	const Metacards = $('.Meta-character-card-container');
	loadBChatters();
	// Fetch character data from the backend

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
	$.getJSON('/chatters', function(characterData) {
		const filteredData = characterData.filter(character => {
			const matchesCategory = selectedCategories.length === 0 || character.category.some(cat => selectedCategories.includes(cat));
			const matchesPrice = character.price <= selectedPrice;
			return matchesCategory && matchesPrice;
		});

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
// Frontend for purchase page cart
function purchaseItemHtml(item) {
	return `
        <!--  Cart item -->
        <div class="d-flex flex-column w-100 overflow-hidden mb-3">
            <div class="d-flex flex-row align-items-flex-start justify-content-start">
                <img class="chatter-image object-fit-cover rounded-3 w-50" src="assets/img/${item.name.replace(/\s+/g, '')}Rectangle.jpg" style="height: 20vh;">
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
                   <img class="chatter-image object-fit-cover rounded-3 w-50" src="assets/img/${item.name.replace(/\s+/g, '')}Rectangle.jpg" style="height: 20vh;">
                   <div class="flex-column w-30 p-2">
                       <h3 class="chatter-name m-0 p-0">${item.name}</h3>
                       <h5 class="chatter-username mt-0 mb-5">${item.username}</h5>
                       <h5 class="chatter-price mb-0">$${item.price}</h5>
                   </div>
                   <div class="d-flex flex-column align-items-end justify-content-end flex-grow-1" style="margin-top: 70px;">
                   		<a href="#"><img class="m-0 p-0" style="width: 25px;" src="assets/img/AIchatlogo.jpg" alt="Logo"></a>
					    <i id="${item.name}" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-solid fa-trash m-1"></i>
					    <!-- <i id="check-icon" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-regular fa-square-check"></i> -->
					    
					</div>

              </div>
         </div>
   `;
}
function fetchCart(callback) {
	$.getJSON('/cart', function(data) {
		var cartItems = data;
		callback(cartItems);  // Pass cartItems to callback function
	});
}
// Fetch data for cart items
function fetchCartItems() {
	$.getJSON('/cart', function(data) {
		var cartItems = [];
		data.forEach(item => {
				cartItems.push(item);
			});
		// Repopulate the array with fetched data
		if (cartItems.length > 0) {
			fetchCartCards(cartItems); // Pass the cart items to the fetchCartCards function
		}

		return cartItems;
	})
}

function fetchCartPopup() {
	$.getJSON('/cart', function(cartItems) {
		$('#cartItemsContainer').empty(); // Clear existing items
		if (cartItems.length > 0) {
			cartItems.forEach(function(item) {
				itemHtml = cartItemHtml(item);
				$('#cartItemsContainer').append(itemHtml);
			});
		}
		getPrice(cartItems);
		// Calculate subtotal and tax
	})
}
// Fetch data for cart items
function fetchCartCards(cartItems) {
	const cartCardsHeader = $('.cart-cards-header');
	const cartCardsContainer = $('.cart-cards-container');
	cartCardsHeader.empty();
	cartCardsContainer.empty();
	if (cartItems.length > 0) {
		
	//cartCardsContainer.empty(); // Clear existing items
	cartCardsHeader.append('<h1 class="mt-3 display-4">Cart</h1>');
	$.get('chattercard.html', function(template) {
			cartItems.forEach(function(chatter) {
				const populatedCard = populateCard(template, chatter);
				cartCardsContainer.append(populatedCard);
			});

	}).fail(function() {
		console.error('Failed to load cart cards.html');
	})
	}
}
function fetchCartPurchase() {
	$.getJSON('/cart', function(cartItems) {
		$('#purchaseItemsContainer').empty(); // Clear existing items
		if (cartItems.length > 0) {
			cartItems.forEach(function(item) {
				var itemHtml = purchaseItemHtml(item);
				$('#purchaseItemsContainer').append(itemHtml);
			});
		}
		getPrice(cartItems);
	});
}
function updateCheckoutButton() {
	fetchCart(function(cartItems) {
		// Check if there are items in the cart
		if (cartItems.length > 0) {
			// Cart has items: Make button pink and enable click to go to purchase page
			$('#checkoutButton')
				.css({
					'color': '#FF206E',
					'border-color': '#FF206E',
					'cursor': 'pointer'
				})
				.removeAttr('disabled')
				.click(function() {
					window.location.href = 'purchasepage.html'; // Replace with your purchase page URL
				});
		} else {
			// Cart is empty: Make button grey and disable click
			$('#checkoutButton')
				.css({
					'color': 'grey',
					'border-color': 'grey',
					'cursor': 'not-allowed'
				})
				.attr('disabled', 'disabled')
				.click(function(event) {
					event.preventDefault(); // Prevent default action if clicked (though button is disabled)
				});
		}
	});
}
function getPrice(cartItems) {
	var subtotal = cartItems.reduce((total, item) => total + item.price, 0);
	var tax = subtotal * 0.1;
	var total = subtotal + tax;
	$('.cart-subtotal').text('$' + subtotal.toFixed(2));
	$('.cart-tax').text('$' + tax.toFixed(2));
	$('.cart-total').text('$' + total.toFixed(2));
}
// Cart functionalities
function addToCart(character) {
	$.ajax({
		type: 'POST',
		url: '/addToCart',
		contentType: 'application/json',
		data: JSON.stringify(character),
		success: function(response) {
			updateCheckoutButton();
			fetchCartPopup();
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
			fetchCartPopup(); // Refresh cart items after removal
			updateCheckoutButton();
			fetchCartCards();
		}
	});
}
// Chatter Preview logic
// Populate details on chatter preview
function populateDetails(character) {
	const imageName = character.name.replace(/\s+/g, '');
	$('.chatter-image').attr('src', 'assets/img/' + imageName + 'Rectangle.jpg');
	$('.chatter-name').text(character.name);
	$('.chatter-username').text(character.username);
	$('.chatter-price').text('$' + character.price.toFixed(2));
	$('.chatter-description').text(character.description);
}
// Find chatter for chatter preview
function loadCharacterDetails(characterName) {
	if (characterName) {
		// Fetch character details from the backend
		$.getJSON('/chatters', function(characterData) {
			const character = characterData.find(c => c.name === characterName);
			if (!character) {
				console.error(`Character with name ${characterName} not found.`);
				return;
			}
			// Update with character details
			populateDetails(character);
			// Attach event handler to the cart icon
			$('.fa-cart-plus').off('click').on('click', function() {
				addToCart(character);
				fetchCartItems();
			});
		}).fail(function() {
			console.error('Failed to fetch chatters from API');
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
// Search query logic
var urlParams = new URLSearchParams(window.location.search);
var query = urlParams.get('query');
function loadQuery() {
	if (query) {
		queryCharacterData(query);
	}
	document.getElementById('searchInput').addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			const query = event.target.value.trim();
			if (query) {
				window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
			}
		}
	});
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