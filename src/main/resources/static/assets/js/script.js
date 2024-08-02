const characterData = [];

// Wrap your code in DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
	// Check if the backButton element exists before adding event listener
	$('#cartpopup-placeholder').load('cartpopup.html');

	const $backButton = $('#backButton');
	if ($backButton.length) {
		$backButton.on('click', function() {
			window.history.back();
		});
	}
	$('#navbar-placeholder').load('navbar.html', function() {
		//fetchProfile(function() {
			if ($('#profile-link').length) {
				profileButton();
			}
			if ($('#index-page').length) {
				loadIndex();
			}

			//if ($('#profile-page').length) {
			//	loadProfile();
			//}
		//});
	});
});

function saveProfileData(profile) {
	localStorage.setItem('selectedProfile', JSON.stringify(profile));
}
function profileButton() {
	$(document).on('click', '#profile-link', function(e) {
		e.preventDefault();
		
		if (Cookies.get('profile')) {
			console.log("sending to profile page");
			window.location.href = 'profilepage.html';
		} else {
			window.location.href = 'login.html';
		}
	});
}

function initializeCart() {
	let username = null;
	if(Cookies.get('profile')) {
		username = JSON.parse(Cookies.get('profile')).username;
	}
	const cartData = Cookies.get('cart_' + username);
	if (cartData) {
		return JSON.parse(cartData);
	} else {
		return [];
	}
}

function saveCart(cart) {
	let username = null;
	if(Cookies.get('profile')) {
		username = JSON.parse(Cookies.get('profile')).username;
	}
	Cookies.set('cart_' + username, JSON.stringify(cart), { path: '/' });
}
function fetchCart() {
	let username = null;
	if(Cookies.get('profile')) {
		username = JSON.parse(Cookies.get('profile')).username;
	}
	const cartData = Cookies.get('cart_' + username);
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
