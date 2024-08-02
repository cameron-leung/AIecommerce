$(document).ready(function() {
	// Load navbar
	$('#navbar-placeholder').load('navbar.html', function() {
		$('.discover-icon').addClass('active');
	});
	$('#followspopup-placeholder').load('followspopup.html');
	loadProfileSearch();
	$('#followersPlaceholder').on('click', function() {
		openFollowsPopup(JSON.parse(localStorage.getItem('selectedProfile')), "Followers");
		event.stopPropagation();
	});

	$('#followingPlaceholder').on('click', function() {
		openFollowsPopup(JSON.parse(localStorage.getItem('selectedProfile')), "Following");
		event.stopPropagation();
	});
});
function follow() {
	var currentUsername = JSON.parse(Cookies.get('profile')).username;
	var otherUsername = (JSON.parse(localStorage.getItem('selectedProfile'))).username;
	const followData = {
		currentUsername: currentUsername,
		otherUsername: otherUsername,
	};

	$.ajax({
		type: 'POST',
		url: '/follow',
		contentType: 'application/json',
		data: JSON.stringify(followData),
		success: function(response) {
			loadProfileSearch();
		},
	});
}
function unfollow() {
	var currentUsername = JSON.parse(Cookies.get('profile')).username;
	var otherUsername = (JSON.parse(localStorage.getItem('selectedProfile'))).username;
	const unfollowData = {
		currentUsername: currentUsername,
		otherUsername: otherUsername,
	};

	$.ajax({
		type: 'POST',
		url: '/unfollow',
		contentType: 'application/json',
		data: JSON.stringify(unfollowData),
		success: function(response) {
			loadProfileSearch();
		}
	});
}
function loadProfileSearch() {
	const currentProfile = JSON.parse(Cookies.get('profile'));
	if(currentProfile.username == JSON.parse(localStorage.getItem('selectedProfile')).username) {
		window.location.href = "profilepage.html";
	} else {
		let currentProfileUsername = null;
	if (JSON.parse(Cookies.get('profile'))) {
		currentProfileUsername = JSON.parse(Cookies.get('profile')).username;
		$.ajax({
			type: 'GET',
			url: `/findByUsername`,
			data: { username: currentProfileUsername },
			success: function(response) {
				Cookies.set('profile', JSON.stringify(response), { path: '/' });
			}
		})
	}
	$.ajax({
		type: 'GET',
		url: `/findByUsername`,
		data: { username: JSON.parse(localStorage.getItem('selectedProfile')).username },
		success: function(searchProfile) {
			saveProfileData(searchProfile);
			if (searchProfile) {
				$('#profileName').text(searchProfile.name);
				$('#profileUsername').text('@' + searchProfile.username);
				$('#followersPlaceholder').text((searchProfile.followers && searchProfile.followers.length) || 0);
				$('#followingPlaceholder').text((searchProfile.following && searchProfile.following.length) || 0);
			}
			const $followButton = $('.follow-button');

			if (currentProfileUsername || currentProfileUsername == searchProfile.username) {
				if (searchProfile.followers && searchProfile.followers.includes(currentProfile.id)) {
					$followButton.text('Unfollow');
					$followButton.css('background', '#535355');
					$followButton.off('click').on('click', unfollow);
				} else {
					$followButton.text('Follow');
					$followButton.css('background', '#FF206E');
					$followButton.off('click').on('click', follow);
				}
			} else {
				$followButton.off('click');
				$followButton.text('Follow');
				$followButton.css('background', '#535355');
			}

			const container = $('.character-circ-container');

			// Add the header to the container
			if (searchProfile.myChatters.length) {
				container.empty();
				container.append('<h1 class="mt-3 display-4">Recents</h1>');

				// Fetch chattercard template
				$.get('chattercircle.html', function(template) {
					searchProfile.myChatters.forEach(character => {
						const populatedCircle = populateCircle(template, character);
						container.append(populatedCircle);
					});
				})
			}

		}
	})
	}
	
}