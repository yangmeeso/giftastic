$(document).ready(function() {

	//Global arrays to start with
	var animals = ["Cat", "Dog", "Bird", "Bear", "skunk", "rabbit"];

	//Function to create new button(s)

	function renderButtons() {
		$("#animalButtons").empty();

		for (var j = 0; j < animals.length; j++) {

			var button = $("<button>");

			button.addClass("animal");

			button.attr("animalName", animals[j]);

			button.text(animals[j]);

			$("#animalButtons").append(button);

			console.log(animals[j]);

		}
	};

	renderButtons ();

	//Create the buttons when User's input submitted
	$("#animalFinder").on("click", function customButtons(evnet) {

		event.preventDefault();

		var userInput = $("#animalInput").val().trim();

		animals.push(userInput);

		renderButtons();

		displayAnimals();

	});

	//Function to display rating(s) and image(s) from GIPHY API
	function displayAnimals() {
	$("button").on("click", function() {

		var animals = $(this).attr("animalName");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals
		+ "&api_key=" + /* API Key is provided in the submission note section */;

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(queryURL);
			console.log(response);

			//Pending the loop until the button is clicked
			event.preventDefault();

			var result = response.data;

			for (var i = 0; i < result.length; i++) {

				var rating = result[i].rating;				
				
				var animalDiv = $("<div class='item'>");

				var animalP = $("<p>").text("Rating: " + rating);

				var animalImage = $("<img>");

				animalImage.attr("src", result[i].images.downsized_medium.url);

				animalDiv.append(animalP);
				animalDiv.append(animalImage);

				$("#animalGiphy").prepend(animalDiv);
			}

		})

	});

	};

	displayAnimals();

});






