// Initial array of animals
var animals = ["sea turtle", "gorrila", "giraffe", "lion"]


// make a function that make a request to giphy
function makeAPICallToGiphy(queryItem) {
    var queryUrl = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "r4kLq0ZCkfyI1sAFvi9gjuywoNSDkGbq";
    var params = "?" + $.param({
        api_key: apiKey,
        q: queryItem,
        limit: 10,
        offset: 0,
        rating: "G",
        lang: "en"
    });
    
    var queryUrlWithParams = queryUrl + params;
    
    console.log("Our request url is " + queryUrlWithParams);
    
    // make a request to the giphy search API
    $.ajax({
        url: queryUrlWithParams,
        method: "GET"
    }).then(function(response){
        var imagesArr = response.data;
        console.log(imagesArr);
        // $("#gif-container").empty();
        // take all the fixed_height images from the response 
        // and display on the page
        for(var i = 0; i < imagesArr.length; i++) {
            var img = $("<img>");
            img.addClass("gif-image");
            img.attr("src", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-still", imagesArr[i].images.fixed_height_still.url);
            img.attr("data-animate", imagesArr[i].images.fixed_height.url);
            img.attr("data-state", "still");
            $("#gif-container").prepend(img);
            
        }
    });
}

// when I click on one 
// of the gifs it will go from still to animate 
// and from animate to still
$(document).on("click", ".gif-image", function(e) {
    e.preventDefault();
    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("data-animate");
    var stillUrl = $(this).attr("data-still");
    if(state === "still") {
        // lets animate the img
        // switch the src attribute to the value of data-animate
        $(this).attr("src", animateUrl);
        // set the data-state value to "animate"
        $(this).attr("data-state", "animate");
       
    } else {
        // lets make it still
        // switch the src attribute to the value of data-still
        $(this).attr("src", stillUrl);
        // set the data-state value to "still"
        $(this).attr("data-state", "still");
    }
});

makeAPICallToGiphy("");

$(document).on("click", ".gif-button", function(e){
    e.preventDefault();
    var btnValue = $(this).attr("data-name");
    makeAPICallToGiphy(btnValue);
});
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
  $(document).on("click", ".animal-btn", makeAPICallToGiphy);
  
  // Calling the renderButtons function to display the intial buttons
  renderButtons();