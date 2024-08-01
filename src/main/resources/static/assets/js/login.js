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
				Cookies.set('profile', JSON.stringify(response), { path: '/' }); 
				window.location.href = 'profilepage.html';
			},
			error: function(error) {
				$('#error-message').text('Invalid username or password');
			}
		});
	});
}
function logout() {
	const username = JSON.parse(Cookies.get('profile')).username;
	$.ajax({
		type: 'POST',
		url: '/logout',
		data: JSON.stringify({ username: username }),
		contentType: 'application/json',
		success: function() {
			Cookies.set('profile', null, { path: '/' }); 
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
				Cookies.set('profile', JSON.stringify(response), { path: '/' }); 
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

