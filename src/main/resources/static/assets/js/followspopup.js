var followsPopupOpen = false;
function followProfileHtml(name) {
	return `
        <div class="d-flex flex-row">
        	<i class="fa-solid fa-circle-user responsive-icon w-25 pr-1 pt-1" style="color: #535355;"></i>
        	<h3 ">${name}</h3>
        </div>
    `;
}
	// Open the cart popup
	function openFollowsPopup(followString) {
		if (!followsPopupOpen) {
			$('#followsPopupOverlay').removeClass('d-none').fadeIn();
			$('#follows-header').text(followString);
			followsPopupOpen = true;
			const profile = JSON.parse(Cookies.get('profile'));
			const profilesContainer = $('#profiles-container');
			profilesContainer.empty();
			if(profile.followers.length) {
				profile.followers.forEach(function(profileId) {
					
					var profileHtml = followProfileHtml(profile);
						container.append(profileHtml);
				})
			} else {
				$('#no-follows-message').show();
        		$('#no-follows-message').text('no followers');
			}
}
	}
	// Close the cart popup
	function closeFollowsPopup() {
		$('#followsPopupOverlay').addClass('d-none').fadeOut();
		followsPopupOpen = false;
	}

	// 
	//$(document).on('click', function (event) {
	//	if (followsPopupOpen && !$(event.target).closest('#followsPopupContent').length) {
	//		closeFollowsPopup();
	//	}
	////});