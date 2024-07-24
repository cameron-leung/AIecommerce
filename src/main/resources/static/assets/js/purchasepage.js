$(document).ready(function() {
	// Load navbar
	$('#navbar-placeholder').load('navbar.html', function() {
		$('.cart-icon').addClass('active');
	});

	fetchCartPurchase();

	$('#complete-purchase-btn').click(function(e) {
		e.preventDefault();

		// Collect form data and fetch cart items asynchronously
		const orderData = {
			name: $('#name').val(),
			username: $('#username').val(),
			cardholderName: $('#cardholder-name').val()
		};

		fetchCart(function(cartItems) {
			orderData.orderItems = cartItems;

			// Send data to server
			$.ajax({
				type: 'POST',
				url: '/addOrder',
				contentType: 'application/json',
				data: JSON.stringify(orderData),
				success: function(response) {
					window.location.href = 'profilepage.html';
				},
				error: function(xhr, status, error) {
					$('#purchase-error-message').text('Failed to place order');
				}
			});
		});
	});
});