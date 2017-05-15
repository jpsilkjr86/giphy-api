// ********************************************** PSEUDO-CODE **********************************************
/* 

Pseudo-Code: First Draft of Pseudo-Code

TITLE: Giphy Generator

	I. DOM
		a. Page header
		b. panel with buttons
		c. panel with form for adding buttons
		d. empty div at the bottom for appending giphies
	II. Declare variables
		a. buttonNameArray
	III. App flow
		a. webpage loads
			-displays initial HTML (header, button panel, form panel)
			-loop through buttonArray and call printButtons(buttonArray[i])
		b. addButtons()
			-when submit is clicked, calls addButtons()
				1) gets value of text input field, save as a variable
				2) adds to array
				3) calls printButtons()
		c. printButtons(btn)
			-ajax request
				1) sets queryURL according to button name (q=name)
				2) loops through results
					i) for each i, creates an object with properties name, rating, stillState,
					and motionState.
					ii) sets values equal to the corresponding data received from the ajax request
					iii) pushes onto an array called giphies[]
				3) stores giphies[] as data() on the button
					i) stores  in the button's data()
						*example: $(this).data('giphies', giphies);
					ii) the goal of this is that later on the program will be able to 
						reference the data like this:
							var selectedGiphies = $(this).data('giphies');
							selectedGiphies[0].stillState, selectedGiphies[0].rating... 
			-prepends button with CSS classes onto DOM
		d. displayGiphies(queryArg)
			-when button is clicked, loops through data to print each giphy
			-for each giphy image div created, sets data as follows:
				$(this).data('currentState', 'still-state')
					.data('stillState', selectedGiphies[i].stillState)
					.data('motionState', selectedGiphies[i].motionState);
				
		e. behavior of giphy divs
			-click event listener
			-conditions for toggling between stillState and motionState:
				if ($(this).data('currentState') === 'still-state') {
					$(this).attr('src', $(this).data('motionState'))
						.data('currentState', 'motion-state');
				}
				if ($(this).data('currentState') === 'motion-state') {
					$(this).attr('src', $(this).data('stillState'))
						.data('currentState', 'still-state');
				}
	
*/  //END OF PSEUDOCODE

// GLOBAL VARIABLES


// GLOBAL FUNCTIONS

function printButton(btnName) {
	// trims the white space before and after the button name
	btnName = btnName.trim();

	// appends button on the DOM
	var newBtn = $('<button>');
	newBtn.addClass('giphy-button btn btn-primary')
		.text(btnName)
		.attr('value', btnName.replace(/\s+/g, '+')) // value equals btnName with spaces replaced by +'s
		.appendTo('#buttons-list');

	// sends the button to storeDataInButton() to store giphy data onto it
	storeDataInButton(newBtn);
}

// this function makes an ajax request and stores the response data onto the DOM button itself
function storeDataInButton(thisBtn) {
	// sets queryTerm as the value of the received button argument, i.e. the button name
	var queryTerm = thisBtn.val();	
	var giphyApiKey = 'dc6zaTOxFJmzC';

	var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + queryTerm 
					+ '&api_key=' + giphyApiKey + '&limit=2';
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

function displayGiphies (giphiesAry) {
	console.log(giphiesAry);

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



$(document).ready(function(){

	var buttonNameArray = ['Bernie Sanders', 'Ostriches'];

	// loops through array and prints each button
	$.each(buttonNameArray, function(i){
		printButton(buttonNameArray[i]);
	});

	$(document).on('click', '.giphy-button', function(){
		// calls function and sends it giphy data
		displayGiphies($(this).data().giphies);
	});

	$(document).on('click', '.giphy-img', function(){
		// calls function and sends it this clicked image
		changeImgState($(this));
	});


}); // end of document ready