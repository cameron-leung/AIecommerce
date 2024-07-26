const characterData = [];
let profile = null;

// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
	console.log("dom loaded");
	// Check if the backButton element exists before adding event listener
	$('#cartpopup-placeholder').load('cartpopup.html', function(response, status, xhr) {
    if (status == "success") {
        console.log("cartpopup html loaded");
        // Any additional code you want to run after loading the content
    } else if (status == "error") {
        console.log("Error loading cartpopup.html: " + xhr.status + " " + xhr.statusText);
    }
});

	const $backButton = $('#backButton');
	if ($backButton.length) {
		$backButton.on('click', function() {
			window.history.back();
		});
	}
	fetchProfile(function() {
		if ($('#profile-link').length) {
			profileButton();
		}
		if ($('#index-page').length) {
			loadIndex();
		}
		if ($('#profile-page').length) {
			loadProfile();
		}
	});
});
// Function to fetch the profile and store it in the global variable
function fetchProfile(callback) {
	const username = Cookies.get('username');

	if (username == 'someuser' || !username || username == null) {
		profile = null;
		Cookies.set('profile', null, { path: '/' });
		callback();
	} else {
		if (username) {
			$.getJSON(`/findByUsername?username=${username}`, function(data) {
				profile = data;
				Cookies.set('profile', JSON.stringify(profile), { path: '/' });
				callback();
			}).fail(function(jqXHR, textStatus, errorThrown) {
				// Handle the failure
				profile = null; // Set profile to null if there's an error
				Cookies.set('profile', null, { path: '/' });
				callback();
			});
		}
	}
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

function initializeCart() {
	const profile = JSON.parse(Cookies.get('profile') || '{}');
    const username = profile.username;
    const cartData = Cookies.get('cart_' + username);
    if (cartData) {
        return JSON.parse(cartData);
    } else {
        return [];
    }
}

function saveCart(cart) {
   const profile = JSON.parse(Cookies.get('profile') || '{}');
    const username = profile.username;
    Cookies.set('cart_' + username, JSON.stringify(cart), { path: '/' });
}
function fetchCart() {
	const cartData = Cookies.get('cart');
    let cartItems = [];
    if (cartData) {
        cartItems = JSON.parse(cartData);
    }
    return cartItems;
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
