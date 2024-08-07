$(document).ready(function() {
	// Load navbar activate discover icon
	$('#navbar-placeholder').load('navbar.html', function() {
		$('.discover-icon').addClass('active');
	});
	// Load chatter cards widget
	$('.chattercardscroll-placeholder').load('chattercardscroll.html');
	// Add scrolling functionality to image
	$('a[href^="#"]').on('click', function(event) {
		var target = $(this.getAttribute('href'));
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 250);
		}
	});


});
function loadIndex() {
	$.getJSON('/chatters', function(characters) {
		characterData.push(...characters);
		populateIndexChatters();
		var profile = Cookies.get('profile');
		if (profile && JSON.parse(profile)) {
			profile = JSON.parse(profile);
			// Populate the chatters using myChatters from the profile
			if (Array.isArray(profile.myChatters) && profile.myChatters.length > 0) {
				populateChatterCircles(profile.myChatters);
			}
			if (Array.isArray(profile.following) && profile.following.length > 0) {
				populateFriendsCards(profile.following);
			}
		}
	});
}
// Index page cards filtering
function populateIndexChatters() {
	const Bcards = $('.B-character-card-container');
	const Metacards = $('.Meta-character-card-container');

	// Fetch character data from the backend
	const userBFilteredData = characterData.filter(character => character.username === '@B');
	const userMetaFilteredData = characterData.filter(character => character.username === '@Meta');
	// Fetch chattercard template
	$.get('chattercard.html', function(template) {
		userMetaFilteredData.forEach(character => {
			const populatedCard = populateCard(template, character);
			Metacards.append(populatedCard);
		});
		userBFilteredData.forEach(character => {
			const populatedCard = populateCard(template, character);
			Bcards.append(populatedCard);
		});

	});
}
function populateFriendsCards(following) {
	if (following) {
		const Friendscards = $('.Friends-character-card-container');
		$.ajax({
			type: 'GET',
			url: '/findByIds',
			data: { ids: following },
			success: function(profiles) {
				if (profiles.length > 0) {
					profiles.forEach(function(profile) {
						var chatters = profile.myChatters;
						if (chatters && chatters.length) {
							$('.friends-chatters-header').text("Friend's Chatters");
							$.get('chattercard.html', function(template) {
								chatters.forEach(character => {
									const populatedCard = populateCard(template, character);
									Friendscards.append(populatedCard);
								});
							})
						}

					});
				}
			}
		});

	}
}