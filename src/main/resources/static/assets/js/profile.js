
$(document).ready(function() {
	// Load chatter circles & cards
	//$('.chattercircles-placeholder').load('chattercircles.html');
	$('#editprofilepopup-placeholder').load('editprofilepopup.html');
	$('#followspopup-placeholder').load('followspopup.html');
	if (!window.cartItemsLoaded) {
		window.cartItemsLoaded = true;
	}
	//loadProfile();
	$('#followersPlaceholder').on('click', function() {
        openFollowsPopup(JSON.parse(Cookies.get('profile')), "Followers");
        event.stopPropagation();
    });

    $('#followingPlaceholder').on('click', function() {
        openFollowsPopup(JSON.parse(Cookies.get('profile')), "Following");
        event.stopPropagation();
    });
});
function loadProfile() {
		const profile = JSON.parse(Cookies.get('profile'));
		$('#profileName').text(profile.name || 'Unknown Name');
		$('#profileUsername').text('@' + (profile.username || 'UnknownUsername'));
		$('#followersPlaceholder').text((profile.followers && profile.followers.length) || 0);
		$('#followingPlaceholder').text((profile.following && profile.following.length) || 0);
		$('#chattersPlaceholder').text((profile.myChatters && profile.myChatters.length) || 0);

		// Populate the chatters using myChatters from the profile
		if (profile.myChatters && profile.myChatters.length > 0) {
			populateChatterCircles(profile.myChatters);
		}
		fetchCartCards();
}


// Function to update the profile
function loadUpdateProfile() {
	$('#submitButton').on('click', function(e) {
		e.preventDefault();

		var nameInput = $('#nameInput').val().trim();
		var usernameInput = $('#usernameInput').val().trim();
		const username = (JSON.parse(Cookies.get('profile'))).username;

		if (nameInput === '' && usernameInput === '') {
			$('#error-message').text('Please fill out at least one field.');
			return;
		}

		const formData = {
			name: nameInput,
			username: usernameInput,
			currentUsername: username
		};

		$.ajax({
			type: 'POST',
			url: '/updateProfile',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				Cookies.set('profile', JSON.stringify(profileData), { path: '/' }); 
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

// Fetch data for cart items
function fetchCartCards() {
	let cart = initializeCart();
	if (cart) {
		const cartCardsHeader = $('.cart-cards-header');
		const cartCardsContainer = $('.cart-cards-container');
		cartCardsHeader.empty();
		cartCardsContainer.empty();
		if (cart.length > 0) {
			cartCardsContainer.empty(); // Clear existing items
			cartCardsHeader.append('<h1 class="mt-3 display-4">Cart</h1>');
			$.get('chattercard.html', function(template) {
				cart.forEach(function(chatter) {
					const populatedCard = populateCard(template, chatter);
					cartCardsContainer.append(populatedCard);
				});
			})
		}
	}
}
