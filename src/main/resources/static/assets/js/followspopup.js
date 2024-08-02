var followsPopupOpen = false;
function followProfileHtml(profile) {
	return `
	<a href="profilesearch.html" onclick='saveProfileData(${JSON.stringify(profile)})'>
        <div class="d-flex flex-row align-items-center pt-2">
        	<i class="fa-solid fa-circle-user responsive-icon" style="color: #535355; font-size: 3em; padding-right: 0.5rem;"></i>
        	<h3>${profile.name}</h3>
        </div>
    </a>
    `;
}
	// Open the cart popup
	function openFollowsPopup(followString) {
		if (!followsPopupOpen) {
			$('#followsPopupOverlay').removeClass('d-none').fadeIn();
			$('#follows-header').text(followString);
			
			const profile = JSON.parse(Cookies.get('profile'));
			const profilesContainer = $('#profiles-container');
			profilesContainer.empty();
			$('#no-follows-message').hide();
			var follows = null;
			if(followString == "Following") {
				follows = profile.following;
			} 
			if(followString == "Followers") {
				follows = profile.followers;
			}
			if(follows.length) {
            $.ajax({
                type: 'GET',
                url: '/findByIds',
                data: { ids: follows },
                success: function(profiles) {
                    if (profiles.length > 0) {
                        profiles.forEach(function(profile) {
                            var profileHtml = followProfileHtml(profile); // Assuming you have a function to create HTML for profiles
                            profilesContainer.append(profileHtml);
                        });
                    } else {
                        $('#no-follows-message').show();
                        $('#no-follows-message').text('No followers');
                    }
                },
                error: function(error) {
                    $('#no-follows-message').show();
                    $('#no-follows-message').text('Error fetching profiles');
                }
            });
			} else {
				$('#no-follows-message').show();
        		$('#no-follows-message').text('no followers');
			}
			followsPopupOpen = true;
		}
	}
	// Close the cart popup
	function closeFollowsPopup() {
		$('#followsPopupOverlay').addClass('d-none').fadeOut();
		followsPopupOpen = false;
	}

	// 
	$(document).on('click', function (event) {
		if (followsPopupOpen && !$(event.target).closest('#followsPopupContent').length) {
			closeFollowsPopup();
		}
	});