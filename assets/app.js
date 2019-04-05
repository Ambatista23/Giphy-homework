var queryURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=1YGny3z7BKEKS0AGwmXVtf3GlZELlMy3";
var userSearch;

var topics = ["soccer", "videogames", "music"]

function ajaxCall(search){
    $.ajax({
        url: queryURL + apiKey + "&q=" + search + "&limit=10" + "&rating",
        method: "GET"
    }).then(function(giphy){
        // console.log(giphy.data[0]);

        var gifResults = giphy.data;

        for (var i = 0; i < gifResults.length; i++){

            // create div to hold <img> and <p>
            var gifForDiv = $("<div>");

            var gif = $("<img>").attr("src", gifResults[i].images.downsized_still.url)
            gif.attr("data-still",  gifResults[i].images.downsized_still.url)
            gif.attr("data-animate", gifResults[i].images.downsized.url)
            gif.attr("data-state", "still")
            gif.attr("class", "gif")

            // put the image tag inside gifDiv
            gifForDiv.append(gif);
            
            // create a <p> for rating
            var rating  = $("<p>").text("Rating: " + gifResults[i].rating);

            gifForDiv.append(rating);

            $(".gifsDiv").prepend(gifForDiv);
            
       


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

//creating a .on "click to change static to animated gifs 
$(".gifsDiv").on("click", ".gif", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log();
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


// What I am missing so far:
// 1. add rating to each gif presented
// 2. make gifs appear static, click to make dynamic, re-click to make static
// 3. add a favorites

