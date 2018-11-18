// Initial array of animals
var animals = ["sea turtle", "gorrila", "giraffe", "lion"];
console.log("hello");
// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {
  var animal = $(this).attr("data-name");
  var querURL = "https://api.giphy.com/v1/gifs/search?q=" + animals[0] + "&api_key=r4kLq0ZCkfyI1sAFvi9gjuywoNSDkGbq&limit=10&rating=pg";
  $.ajax({
    url: queryURL,
    method: "GET"
  }); 
}


// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=r4kLq0ZCkfyI1sAFvi9gjuywoNSDkGbq&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });