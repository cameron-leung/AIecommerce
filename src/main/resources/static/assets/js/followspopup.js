var followsPopupOpen = false;
	// Open the cart popup
	function openFollowsPopup(followString) {
		if (!followsPopupOpen) {
			$('#followsPopupOverlay').removeClass('d-none').fadeIn();
			$('#follows-header').text(followString);
			followsPopupOpen = true;
			const profile = JSON.parse(Cookies.get('profile'));
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