loadQuery();
function loadQuery() {
	var urlParams = new URLSearchParams(window.location.search);
	var query = urlParams.get('query');
	if (query) {
		Promise.all([
            queryCharacterData(query),
            queryProfileData(query)
        ]).then(([charDataExists, profDataExists]) => {
            if (!charDataExists && !profDataExists) {
                $('#no-data-message').text('No data found');
            }
        }).catch((error) => {
            console.error('Error fetching data:', error);
            $('#no-data-message').text('No data found');
        });
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
function profileCircleHtml(profile) {
	return `
		<a href="searchprofile.html" onclick='saveProfileData(${JSON.stringify(profile)})'>
         <div style = "
         	display: flex;
         	flex-direction: column;
			padding-right: 2rem;
			font-size: 7rem;
			color: #535355;">
			<i class="fa-solid fa-circle-user responsive-icon w-auto pr-1 pb-2" alt="profile icon"></i>
    		<h3 class = "align-items-start text-center">${profile.name}</h3>
		</div> 
		</a>
   `;
}
function saveProfileData(profile) {
	localStorage.setItem('selectedProfile', JSON.stringify(profile));
}
function queryCharacterData(query) {
	return new Promise((resolve, reject) => {
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
            $.get('chattercard.html', function(template) {
                if (filteredData.length === 0) {
                    resolve(false);
                } else {
                    filteredData.forEach(character => {
                        const populatedCard = populateCard(template, character);
                        container.append(populatedCard);
                    });
                    resolve(true);
                }
            }).fail(() => resolve(false));
        }).fail(() => resolve(false));
    });
}

function queryProfileData(query) {
	return new Promise((resolve, reject) => {
        $.getJSON('/profiles', function(profileData) {
            let filteredData = profileData.filter(profile =>
                profile.name.toLowerCase().includes(query.toLowerCase()) ||
                profile.username.toLowerCase().includes(query.toLowerCase())
            );
            const username = Cookies.get('username');
            if (!(username == 'someuser' || !username || username == null)) {
				filteredData = filteredData.filter(profile =>
					profile.username !== username);
			} 
            const container = $('.profiles-container');
            container.empty();
            $.get('chattercircle.html', function() {
                if (filteredData.length === 0) {
                    resolve(false);
                } else {
                    filteredData.forEach(profile => {
                        var profileHtml = profileCircleHtml(profile);
                        container.append(profileHtml);
                    });
                    resolve(true);
                }
            }).fail(() => resolve(false));
        }).fail(() => resolve(false));
    });
}
