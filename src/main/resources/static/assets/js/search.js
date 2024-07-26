loadQuery();
function loadQuery() {
	var urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('query');
	if (query) {
		queryCharacterData(query);
		queryProfileData(query);
	}
	$('#searchInput').on('keypress', function(event) {
		if (event.key === 'Enter') {
			const query = event.target.value.trim();
			if (query) {
				window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
			}
		}
	});
}
function profileCircleHtml(name) {
	return `
         <div style = "
			align-items: center;
			justify-content: center;
			padding-right: 1%;
			font-size: 5em;
			color: #535355;">
			<i class="fa-solid fa-circle-user responsive-icon w-auto pr-1 pt-1" alt="profile icon"></i>
    		<h3 class = "text-center">${name}</h3>
		</div> 
   `;
}
function queryCharacterData(query) {
	$.getJSON('/chatters', function(characterData) {
		const filteredData = characterData.filter(character =>
			character.name.toLowerCase().includes(query.toLowerCase()) ||
			character.username.toLowerCase().includes(query.toLowerCase()) ||
			character.blurb.toLowerCase().includes(query.toLowerCase()) ||
			character.description.toLowerCase().includes(query.toLowerCase()) ||
			character.category.some(c => c.toLowerCase().includes(query))
		);
		const container = $('.character-card-container');
		container.empty();
		// Display filtered data
		$.get('chattercard.html', function(template) {
			if (filteredData.length === 0) {
				$('#no-data-message').text('No Chatters found');
			} else {
				filteredData.forEach(character => {
					const populatedCard = populateCard(template, character);
					container.append(populatedCard);
				});
			}
		}).fail(function() {
			$('#no-data-message').text('No Chatters found');
		});
	}).fail(function() {
		$('#no-data-message').text('No Chatters found');
	});
}

function queryProfileData(query) {
	$.getJSON('/profiles', function(profileData) {
		const filteredData = profileData.filter(profile =>
			profile.name.toLowerCase().includes(query.toLowerCase()) ||
			profile.username.toLowerCase().includes(query.toLowerCase())
		);
		const container = $('.profiles-container');
		container.empty();
		$.get('chattercircle.html', function(template) {
			if (filteredData.length === 0) {
				$('#no-data-message').text('No Profiles found');
			} else {
				filteredData.forEach(profile => {
					var profileHtml = profileCircleHtml(profile.name);
            		container.append(profileHtml);
				});
			}
		})
	});
}
