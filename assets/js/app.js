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
		a. buttonArray
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



$(document).ready(function(){







}); // end of document ready