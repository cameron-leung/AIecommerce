$(document).ready(function() {
	// Load navbar & activate discover icon
	$('#navbar-placeholder').load('navbar.html', function() {
		$('.discover-icon').addClass('active');
	});
	// Load details
	const urlParams = new URLSearchParams(window.location.search);
	const characterName = urlParams.get('name');
	loadCharacterDetails(characterName);
	populateVerticalScroll();
});
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
				window.location.href = 'index.html';
				return;
			}
			// Update with character details
			populateDetails(character);
			// Attach event handler to the cart icon
			$('.fa-cart-plus').off('click').on('click', function() {
				addToCart(character);
			});
		});
	}
}

function populateVerticalScroll() {
	// Vertical scroll images
	var $imageContainer = $('#image-container');
	var numberOfImages = 5; // Number of times to repeat the image
	for (var i = 0; i < numberOfImages; i++) {
		var $img = $('<img>', {
            class: 'chatter-image', // Add chatter-image class
            alt: 'Chatter Card ' + (i + 1)
        });
        $imageContainer.append($img);
	}
}