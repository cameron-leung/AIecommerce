$(document).ready(function() {
	// Load navbar
	$('#navbar-placeholder').load('navbar.html', function() {
		$('.cart-icon').addClass('active');
	});

	fetchCartPurchase();

	$('#complete-purchase-btn').click(function(e) {
		e.preventDefault();

		if (!$('#purchase-form')[0].checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            $('#purchase-error-message').text('Please fill out all required fields.');
        } else {
		const cardholderName = $('#cardholder-name').val().trim();

			console.log("pass order in");
			const orderData = {
					name: JSON.parse(Cookies.get('profile')).name,
					username: Cookies.get('username'),
					cardholderName: cardholderName,
					orderItems: fetchCart()
				};
			console.log(orderData);
			// Send data to server
			$.ajax({
				type: 'POST',
				url: '/addOrder',
				contentType: 'application/json',
				data: JSON.stringify(orderData),
				success: function(response) {
					Cookies.remove('cart', { path: '/' });
					window.location.href = 'profilepage.html';
				},
				error: function(xhr, status, error) {
					console.log("Failed to place order");
					$('#purchase-error-message').text('Failed to place order');
				}
			});
		}
	});
});
// Frontend for purchase page cart
function purchaseItemHtml(item) {
	return `
        <!--  Cart item -->
        <div class="d-flex flex-column w-100 overflow-hidden mb-3">
            <div class="d-flex flex-row align-items-flex-start justify-content-start">
                <img class="chatter-image object-fit-cover rounded-3 w-50" src="assets/img/${item.name.replace(/\s+/g, '')}Rectangle.jpg" style="height: 20vh;">
                <div class="flex-column w-50 pl-1">
                    <h3 class="chatter-name m-0 p-0">${item.name}</h3>
                    <h5 class="chatter-username mt-0 mb-5">${item.username}</h5>
                    <div class="d-flex flex-row justify-content-between">
                        <h5 class="m-0 w-auto">Price</h5>
                        <h5 class="chatter-price w-auto mr-0 text-end">$${item.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function fetchCartPurchase() {
    let cart = initializeCart();
    //$('#purchaseItemsContainer').empty(); // Clear existing items
    if (cart.length > 0) {
        cart.forEach(function(item) {
            var itemHtml = purchaseItemHtml(item);
            $('#purchaseItemsContainer').append(itemHtml);
        });
    }
    getPrice(cart);
}