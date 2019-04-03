var queryURL = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=1YGny3z7BKEKS0AGwmXVtf3GlZELlMy3";
var userSearch;

function ajaxCall(search){
    $.ajax({
        url: queryURL + apiKey + "&q=" + search + "&limit=10",
        method: "GET"
    }).then(function(giphy){
        console.log(queryURL + apiKey + "&q=soccer")
        console.log(giphy.data[0]);
        for (var i = 0; i < giphy.data.length; i++){
            var gif = $("<img>").attr("src", giphy.data[i].images.downsized.url);
            $(".gifs").prepend(gif);
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


// What I am missing so far:
// 1. add rating to each gif presented
// 2. make gifs appear static, click to make dynamic, re-click to make static
// 3. add a favorites

