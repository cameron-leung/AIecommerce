var followsPopupOpen = false;
	// Open the cart popup
	function openFollowsPopup() {
		if (!followsPopupOpen) {
			$('#followsPopupOverlay').removeClass('d-none').fadeIn();
			//fetchFollowsPopup();
			followsPopupOpen = true;
		}
	}
	// Close the cart popup
	function closeFollowsPopup() {
		$('#followsPopupOverlay').addClass('d-none').fadeOut();
		followsPopupOpen = false;
	}
	// Event listener for the icon click to open the popup and add to cart
	$('#openFollowsPopupIcon').on('click', function (event) {
		openFollowsPopup();
		event.stopPropagation(); // Prevent event propagation
	});
	// Close the cart popup when clicking outside
	$(document).on('click', function (event) {
		if (followsPopupOpen && !$(event.target).closest('#followsPopupContent').length) {
			closefollowsPopup();
		}
	});