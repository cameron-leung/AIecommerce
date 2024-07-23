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
					console.log('Order placed successfully:', response);
					// Add chatters to profile
					$.ajax({
						type: 'POST',
						url: '/addToMyChatters',
						contentType: 'application/json',
						data: JSON.stringify(cartItems),
						success: function(response) {
							console.log('Chatters added successfully:', response);
							// Optionally, clear cart or handle UI updates
							$.ajax({
								type: 'POST',
								url: '/clearCart',
								success: function(response) {
									console.log('Cart cleared successfully:', response);
									window.location.href = '/profilepage.html';
								},
								error: function(xhr, status, error) {
									console.error('Failed to clear cart:', error);
								}
							});
						},
						error: function(xhr, status, error) {
							console.error('Failed to add chatters:', error);
						}
					});
				},
				error: function(xhr, status, error) {
					console.error('Failed to place order:', error);
				}
			});
		});
	});
});