// GLOBAL FUNCTIONS

// prints a received button according to a string with its name.
// also calls storeDataInButton() at the end.

// creates and returns a button according to a button name
function createButton(btnName) {
	// trims the white space before and after the button name
	btnName = btnName.trim();

	// prepends button on the DOM
	var newBtn = $('<button>');
	newBtn.addClass('giphy-button btn btn-primary')
		.text(btnName)
		.attr('value', btnName.replace(/\s+/g, '+')); // value equals btnName with spaces replaced by +'s

	return newBtn;
}

// prints button to the DOM
function printButton(btn) {	
	btn.prependTo('#buttons-list');
}

// this function makes an ajax request and stores giphy API response data onto the DOM button itself
function storeDataInButton(thisBtn) {
	// sets queryTerm as the value of the received button argument, i.e. the button name
	var queryTerm = thisBtn.val();	
	var giphyApiKey = 'dc6zaTOxFJmzC';

	// query URL for the giphy API
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + queryTerm 
					+ '&api_key=' + giphyApiKey + '&limit=10';
	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		// the promise function simply stores the relevant response data directly onto 
		// the DOM element itself.
		thisBtn.data('giphies', r.data);
	});
}

// function for displaying giphies stored in an array of giphy objects
function displayGiphies (giphiesAry) {
	$('#giphy-results').empty();
	$('<p>').addClass('text-center')
			.text('Click on an image and see what happens!')
			.appendTo('#giphy-results');

	// loops through array of giphies
	$.each(giphiesAry, function(i){
		// for the sake of encapsulation
		var thisImg = giphiesAry[i].images;

		var giphyWrapper = $('<div>');
		giphyWrapper.addClass('giphy-wrapper');

		var ratingsText = $('<p>');
		ratingsText.text('Rating: ' + giphiesAry[i].rating)
				.appendTo(giphyWrapper);

		var giphyImg = $('<img>');
		giphyImg.attr('alt', giphiesAry[i].bitly_gif_url)
				.attr('src', thisImg.fixed_height_still.url)
				.addClass('giphy-img')
				.data('motion_state', thisImg.fixed_height.url)
				.data('still_state', thisImg.fixed_height_still.url)
				.data('current_state', 'still')
				.appendTo(giphyWrapper);

		$('#giphy-results').append(giphyWrapper);
	});	
}

// toggles the image state between still and in motion
function changeImgState(img) {
	// sets conditions for changing states
	if (img.data('current_state') === 'still') {
		img.attr('src', img.data('motion_state'))
			.data('current_state', 'motion');
	}
	else if (img.data('current_state') === 'motion') {
		img.attr('src', img.data('still_state'))
			.data('current_state', 'still');
	}	
}