var editPopupOpen = false;
	// Open the cart popup
	function openEditPopup() {
		if (!editPopupOpen) {
			$('#editPopupOverlay').removeClass('d-none').fadeIn();
			//fetchEditPopup();
			editPopupOpen = true;
		}
	}
	// Close the cart popup
	function closeEditPopup() {
		$('#editPopupOverlay').addClass('d-none').fadeOut();
		editPopupOpen = false;
	}
	// Event listener for the icon click to open the popup and add to cart
	$('#openEditPopupIcon').on('click', function (event) {
		openEditPopup();
		event.stopPropagation(); // Prevent event propagation
	});
	// Close the cart popup when clicking outside
	$(document).on('click', function (event) {
		if (editPopupOpen && !$(event.target).closest('#editPopupContent').length) {
			closeEditPopup();
		}
	});
	loadUpdateProfile();