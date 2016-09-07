//array of adjectives to append to 'cat' when querying the Giphy API
var adjectives = ['Happy', 'Funny', 'Angry', 'Sad', 'Crazy', 'Sleepy', 'Cute', 'Sneaky', 'Cuddly', 'Hyper', 'Lazy', 'Fast'];
var cats = [];

//function that updates the HTML with GIFs of the cats searched
function addCats() {
	$('#cats').empty();
	cats = [];
	var adj = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + adj + "+cat&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		for (i=0;i<10;i++) {
			cats.push(response.data[i]);
			$('#cats').append("<div><img class='cat' data-val='"+i+"' data-img='still' src='" + response.data[i].images.original_still.url + "'></div>");
		}
	});

}

//function that appends buttons for the emotions array
function renderButtons() {
	$('#buttons').empty();

	for (var i=0;i<adjectives.length;i++) {
		var button = $("<button class='catButton' data-name='" + adjectives[i] + "'>" + adjectives[i]+ "</button>");
		$('#buttons').append(button);
	}
}

//adds a new button
$('#addCats').on('click', function(){
	var duplicateCheck = false;
	for (var i=0; i<adjectives.length;i++) {
		if ($('#user-input').val() == adjectives[i]) {
			duplicateCheck = true;
		}
	}
	if ($('#user-input').val() == '') {
		alert("Please enter a word!");
	}
	else if (duplicateCheck == true) {
		alert("That word already exists, please enter another word!");
		$('#user-input').val('');
	}
	else {
		var adjective = $('#user-input').val().trim();
		adjectives.push(adjective);
		$('#user-input').val('');
		renderButtons();
	}

	return false;
});

//runs addCats when a button is pressed
$(document).on('click', '.catButton', addCats);

//runs when a picture of a cat is pressed, either animates the GIF or stops animation
$(document).on('click', '.cat', function() {
	var catClicked = $(this).data('val');
	var imgTypeClicked = $(this).attr('data-img');

	if (imgTypeClicked == 'still') {
		$(this).attr('src', cats[catClicked].images.original.url);
		$(this).attr('data-img', 'gif');
	}
	else if (imgTypeClicked == 'gif') {
		$(this).attr('src', cats[catClicked].images.original_still.url);
		$(this).attr('data-img', 'still');
	}
});

renderButtons();