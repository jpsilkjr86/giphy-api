$(document).ready(function(){

	var topics = ['Princess Bride', 'Fresh Prince', 'Robin Williams', 'Bill Murray', 'Zoolander',
	'Key and Peele'];

	// loops through array, creates each button, prints it on the DOM and stores data onto it
	$.each(topics, function(i){
		var newButton = createButton(topics[i]);
		printButton(newButton);
		storeDataInButton(newButton);
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
		topics.push(userInpBtnName);

		// creates a button with userInpBtnName
		var newUserBtn = createButton(userInpBtnName);

		// calls printButton to put button on DOM and also to stores giphy api data onto it 
		printButton(newUserBtn);
		storeDataInButton(newUserBtn);
	});

}); // end of document ready