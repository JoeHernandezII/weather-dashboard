//function to get city weather
function getCurrent(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=fa26494f744d903b68067a9947d31b33&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        //verify it is working
        console.log(response);

        // Constructing HTML containing the artist information
      var cityName = $("<h1>").text(response.name);
       //get icon for weather conditions
       var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      //display Temperature
      cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + response.main.temp + " &#8457;"));
      //display Humidity
      cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
      //display Wind Speed
      cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));

     
    });
}   

// Event handler for user clicking the select-city button
$("#select-city").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the city input
    var inputCity = $("#city-input").val().trim();

    // Running the getCurrent function(passing in the city as an argument)
    getCurrent(inputCity);
  });