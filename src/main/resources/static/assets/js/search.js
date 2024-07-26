loadQuery();
function loadQuery() {
	var urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('query');
	if (query) {
		queryCharacterData(query);
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
		container.empty();
		$.get('chattercard.html', function(template) {
			if (filteredData.length === 0) {
				$('#no-data-message').text('No Chatters found');
			}
			filteredData.forEach(character => {
				const populatedCard = populateCard(template, character);
				container.append(populatedCard);
			});
		}).fail(function() {
			$('#no-data-message').text('No Chatters found');
		});
	}).fail(function() {
		$('#no-data-message').text('No Chatters found');
	});
}