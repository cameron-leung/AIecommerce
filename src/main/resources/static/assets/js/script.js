
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
