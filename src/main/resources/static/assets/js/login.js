$(document).ready(function() {
	// Load navbar and activate profile icon
	$('#navbar-placeholder').load('navbar.html', function() {
		$('.profile-icon').addClass('active');
	});

	login();
	loadCreateAccount();
});
function login() {
	$('#login-form').on('submit', function(e) {
		e.preventDefault();

		const formData = {
			username: $('#username').val(),
			password: $('#password').val()
		};

		$.ajax({
			type: 'POST',
			url: '/login',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				window.location.href = 'profilepage.html';
			},
			error: function(error) {
				$('#error-message').text('Invalid username or password');
			}
		});
	});
}
function logout() {
	$.ajax({
		type: 'POST',
		url: '/logout',
		success: function() {
			// Redirect to login page after successful logout
			window.location.href = 'login.html';
		},

	});
}
function loadCreateAccount() {
	$('#create-account-form').on('submit', function(e) {
		e.preventDefault();

		const formData = {
			name: $('#name').val(),
			username: $('#username').val(),
			email: $('#email').val(),
			password: $('#password').val()
		};
		$.ajax({
			type: 'POST',
			url: '/createAccount',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				window.location.href = 'profilepage.html';
			},
			error: function(error) {
				if (error.status === 409) {
					$('#error-message').text('Username already exists!');
				} else {
					$('#error-message').text('Error occurred. Please try again.');
				}
			}
		});
	});
}