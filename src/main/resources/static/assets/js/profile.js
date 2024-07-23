$(document).ready(function () {


			// Load chatter circles & cards
			//$('.chattercircles-placeholder').load('chattercircles.html');
			$('#editprofilepopup-placeholder').load('editprofilepopup.html');
			fetchCartItems();
			//fetchCartCards();
			
		});
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