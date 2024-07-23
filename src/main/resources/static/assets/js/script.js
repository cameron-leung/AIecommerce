const characterData = [];
let profile = null;

// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
	// Check if the backButton element exists before adding event listener
	const backButton = document.getElementById('backButton');
	if (backButton) {
		backButton.addEventListener('click', function() {
			window.history.back();
		});
	}
	fetchProfile(function() {
		// Now you can call functions that need the profile
		if (document.getElementById('profile-link')) {
			profileButton();
		}
		if (document.getElementById('index-page')) {
			loadIndex();
		}
		if (document.getElementById('profile-page')) {
			loadProfile();
		}
	});
});
// Function to fetch the profile and store it in the global variable
function fetchProfile(callback) {
	$.getJSON('/getProfile', function(data) {
		profile = data;
		if (callback) {
			callback();
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		// Handle the failure
		profile = null; // Set profile to null if there's an error
		if (callback) {
			callback();
		}
	});
}
function profileButton() {
	$('#profile-link').on('click', function(e) {
		e.preventDefault();
		if (profile) {
			window.location.href = 'profilepage.html';

		} else {
			window.location.href = 'login.html';
		}
	});
}

function loadProfile() {
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
			// Your event handler code here
		});
	} else {
		window.location.href = 'login.html';
	}
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
	})
}

// Shop page cards filtering

// Function to filter character data based on categories and price


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


function loadQuery() {
	var urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('query');
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
				$('#no-data-message').text('No Chatters found');
			}
			filteredData.forEach(character => {
				const populatedCard = populateCard(template, character);
				container.append(populatedCard);
			});
		}).fail(function() {
			$('#no-data-message').text('No Chatters found');
		});
	}).fail(function() {
		$('#no-data-message').text('No Chatters found');
	});
}