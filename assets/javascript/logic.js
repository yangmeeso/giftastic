$(document).ready(function() {

	//Global arrays to start with
	var animals = ["Cat", "Dog", "Bird", "Bear", "skunk", "rabbit"];

	//Create new button(s)
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

	//Create the button(s) based on User's input submitted
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
		+ "&api_key=" + "";

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

				var animalImage = $("<img>").attr({
					src: result[i].images.fixed_height.url,
					class: "gif",
					dataState: "still",
					dataStill: result[i].images.fixed_height_still.url,
					dataAnimiate: result[i].images.fixed_height.url,
				});

				animalImage.attr("src", result[i].images.fixed_height.url);

				animalDiv.append(animalP);
				animalDiv.append(animalImage);

				$("#animalGiphy").prepend(animalDiv);
			}

		})

	});

	};

	displayAnimals();

	//Swith pause and animate the GIF image(s)
	$("body").on("click", ".gif", function () {
		var state = $(this).attr("dataState");

		if (state === "still") {
			$(this).attr("src", $(this).attr("dataAnimiate"));
			$(this).attr("dataState", "animate");
		}

		else if (state === "animate") {
			$(this).attr("src", $(this).attr("dataStill"));
			$(this).attr("dataState", "still");
		}

	});

});






