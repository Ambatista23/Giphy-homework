var queryURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=1YGny3z7BKEKS0AGwmXVtf3GlZELlMy3";
var userSearch;

var topics = ["soccer", "videogames", "music"]

function ajaxCall(search){
    $.ajax({
        url: queryURL + apiKey + "&q=" + search + "&limit=10",
        method: "GET"
    }).then(function(giphy){
        console.log(queryURL + apiKey + "&q=soccer")
        console.log(giphy.data[0]);
        for (var i = 0; i < giphy.data.length; i++){
            var gif = $("<img>").attr("src", giphy.data[i].images.downsized_still.url);
            $(".gifs").prepend(gif);

            var gifDiv = $("<div>");

            var p  = $("<p>").attr("Rating: " + giphy.data[i].rating);

            var gifImage = $("<img>");
            gifImage.attr("src", giphy.data[i].images.downsized_still.url);

            console.log(giphy.data[i].rating);

            var gifRating = giphy.data[i].rating;
            gifDiv.append(p);
            gifDiv.append(gifImage);

            $("#gifs").prepend(gifDiv);
            $("#gifs").text(gifRating);


        }
       
        
    });
    
}
function makeButton(name){
    var button = $("<button class='gifButtons' data-name=" + name + ">" + name + "</button>")
    $(".buttonDiv").prepend(button)

}
// create this for each button
$(".searchButton").on("click", function(event){
    // stop the page from reloading
    event.preventDefault()
    userSearch = $(".searchBar").val().trim()
    makeButton(userSearch);
})

// gif buttons on click
// focus more on this area **** dynamically created elements ****
$(".buttonDiv").on("click", ".gifButtons", function(){
    console.log($(this).data("name"))
    ajaxCall($(this).data("name"))
})

$(".gif").on("click", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log(this);
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


// What I am missing so far:
// 1. add rating to each gif presented
// 2. make gifs appear static, click to make dynamic, re-click to make static
// 3. add a favorites

