$(document).ready(function() {
	$(document).on('click', '#check-icon', function() {
		$(this).toggleClass("fa-square fa-square-check");
	});
	// Event listener for trash
	$(document).on('click', '.fa-trash', function() {
		var chatterName = $(this).attr('id');
		removeFromCart(chatterName);
	});
	loadCartPopup();
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
// Frontend for cart popup
function cartItemHtml(item) {
	return `
         <div class="d-flex flex-column w-100 overflow-hidden mb-3">
              <div class="d-flex flex-row align-items-center justify-content-end">
                   <img class="chatter-image object-fit-cover rounded-3 w-50" src="assets/img/${item.name.replace(/\s+/g, '')}Rectangle.jpg" style="height: 20vh;">
                   <div class="flex-column w-30 p-2">
                       <h3 class="chatter-name m-0 p-0">${item.name}</h3>
                       <h5 class="chatter-username mt-0 mb-5">${item.username}</h5>
                       <h5 class="chatter-price mb-0">$${item.price}</h5>
                   </div>
                   <div class="d-flex flex-column align-items-end justify-content-end flex-grow-1" style="margin-top: 70px;">
                   		<a href="#"><img class="m-0 p-0" style="width: 25px;" src="assets/img/AIchatlogo.jpg" alt="Logo"></a>
					    <i id="${item.name}" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-solid fa-trash m-1"></i>
					    <!-- <i id="check-icon" class="d-flex justify-content-center pt-2 w-25 fs-3 cursor-pointer fa-regular fa-square-check"></i> -->
					</div>
              </div>
         </div>
   `;
}

function loadCartPopup() {
	var cartPopupOpen = false;
	// Open the cart popup
	function openCartPopup() {
		if (!cartPopupOpen) {
			$('#cartPopupOverlay').removeClass('d-none').fadeIn();
			fetchCartPopup();
			cartPopupOpen = true;
		}
	}
	// Close the cart popup
	function closeCartPopup() {
		$('#cartPopupOverlay').addClass('d-none').fadeOut();
		cartPopupOpen = false;
	}
	// Event listener for the icon click to open the popup and add to cart
	$('.openCartPopupIcon').on('click', function(event) {
		// Fetch and display cart items
		updateCheckoutButton();
		openCartPopup();
		event.stopPropagation(); // Prevent event propagation
	});
	// Close the cart popup when clicking outside
	$(document).on('click', function(event) {
		if (cartPopupOpen && !$(event.target).closest('#cartPopupContent').length && !$(event.target).hasClass('fa-trash')) {
			closeCartPopup();
		}
	});
}

function fetchCartPopup() {
    let cart = initializeCart();
    $('#cartItemsContainer').empty(); // Clear existing items
    if (cart.length > 0) {
        $('#empty-cart-message').hide();
        cart.forEach(function(item) {
            var itemHtml = cartItemHtml(item);
            $('#cartItemsContainer').append(itemHtml);
        });
    } else {
        $('#empty-cart-message').show();
        $('#empty-cart-message').text('Cart is empty');
    }
    getPrice(cart);
    $('#cartPopupOverlay').fadeIn();
}


function updateCheckoutButton() {
		let cartItems = fetchCart();
		// Check if there are items in the cart
		let profile = Cookies.get('profile');
		if (profile) {
			try {
				profile = JSON.parse(Cookies.get('profile'));
			} catch (e) {
				
			}
		} 
		if (cartItems.length > 0 && profile) {
			// Cart has items: Make button pink and enable click to go to purchase page
			$('#checkoutButton')
				.css({
					'color': '#FF206E',
					'border-color': '#FF206E',
					'cursor': 'pointer'
				})
				.removeAttr('disabled')
				.click(function() {
					window.location.href = 'purchasepage.html'; 
				});
		} else {
			// Cart is empty: Make button grey and disable click
			$('#checkoutButton')
				.css({
					'color': 'grey',
					'border-color': 'grey',
					'cursor': 'not-allowed'
				})
				.attr('disabled', 'disabled')
				.click(function(event) {
					event.preventDefault(); 
				});
		}

}
function getPrice(cartItems) {
	var subtotal = cartItems.reduce((total, item) => total + item.price, 0);
	var tax = subtotal * 0.1;
	var total = subtotal + tax;
	$('.cart-subtotal').text('$' + subtotal.toFixed(2));
	$('.cart-tax').text('$' + tax.toFixed(2));
	$('.cart-total').text('$' + total.toFixed(2));
}
// Cart functionalities
function addToCart(character) {
    let cart = initializeCart();
    // Check if the character is already in the cart
    const characterExists = cart.some(item => item.name.replace(/\s+/g, '') === character.name.replace(/\s+/g, ''));
    if (!characterExists) {
        cart.push(character);
        saveCart(cart);
    }
    updateCheckoutButton();
    fetchCartPopup();
}

function removeFromCart(name) {
    let cart = initializeCart();
    cart = cart.filter(item => item.name.replace(/\s+/g, '') !== name.replace(/\s+/g, ''));
    saveCart(cart);
    fetchCartPopup();
    updateCheckoutButton();
    if($('#profile-page').length) {
		    fetchCartCards();
	}
}
