// Initial array of animals
var animals = ["sea turtle", "gorrila", "giraffe", "lion"]
function displayAnimalInfo() {
// test giphy api key to make sure it works
var animal = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=r4kLq0ZCkfyI1sAFvi9gjuywoNSDkGbq&limit=10&rating=pg";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(data) {
// console.log("It works!" + data);

// create div to hold the animal
  var animalDiv = $("<div class= 'animal'>");

 // Storing the rating data
 var rating = data.data.Rated;

 // Creating an element to have the rating displayed
 var pOne = $("<p>").text("Rating: " + rating);

 // Displaying the rating
 animalDiv.append(pOne);

 // Storing the release year
 var released = data.data.Released;

 // Creating an element to hold the release year
 var pTwo = $("<p>").text("Released: " + released);

 // Displaying the release year
 animalDiv.append(pTwo);

 // Storing the plot
 var plot = data.data.Plot;

 // Creating an element to hold the plot
 var pThree = $("<p>").text("Plot: " + plot);

 // Appending the plot
 animalDiv.append(pThree);

 // Retrieving the URL for the image
 for (var i = 0; i < data.data.length; i++){
 var imgURL = data.data[i].images.original.url};

 // Creating an element to hold the image
 var image = $("<img>").attr("src", imgURL);

 // Appending the image
 animalDiv.append(image);

 // Putting the entire animal above the previous animals
 $("#animals-view").prepend(animalDiv);
})};



// Function for displaying animal data
function renderButtons() {

// Deleting the animals prior to adding new animals
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of animals
for (var i = 0; i < animals.length; i++) {

 // Then dynamicaly generating buttons for each animal in the array
 // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
 var a = $("<button>");
 // Adding a class of animal-btn to our button
 a.addClass("animal-btn");
 // Adding a data-attribute
 a.attr("data-name", animals[i]);
 // Providing the initial button text
 a.text(animals[i]);
 // Adding the button to the buttons-view div
 $("#buttons-view").append(a);
}
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
event.preventDefault();
// This line grabs the input from the textbox
var animal = $("#animal-input").val().trim();

// Adding animal from the textbox to our array
animals.push(animal);

// Calling renderButtons which handles the processing of our animal array
renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();





