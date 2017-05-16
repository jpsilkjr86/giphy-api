$(document).ready(function(){

	var topics = ['Bernie Sanders', 'Princess Bride'];

	// loops through array and prints each button
	$.each(topics, function(i){
		printButton(topics[i]);
	});

	// event listener for clicking on buttons
	$(document).on('click', '.giphy-button', function(){
		// calls function and sends it giphy data
		displayGiphies($(this).data().giphies);
	});

	// event listener for clicking on an image and changing its state
	$(document).on('click', '.giphy-img', function(){
		// calls function and sends it this clicked image
		changeImgState($(this));
	});

	// event listener clicking the submit button
	$('#submit-btn').on('click', function(e){
		//prevents page auto-refresh
		e.preventDefault();

		// declares string var equal to the input minus any trailing white space on either side
		var userInpBtnName = $('#topic-input').val().trim();

		// empties input text field
		$('#topic-input').val('');

		// pushes the new button onto the topics array. This isn't necessary for this program
		// at this point but it might be helpful later on to have a running list of topics.

		// calls printButton to put button on DOM and also to store giphy api data onto it 
		printButton(userInpBtnName);
	});

}); // end of document ready