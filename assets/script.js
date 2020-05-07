var searchCity = "";
var previousCity = [];
var today = (moment().format("MM/DD/YYY"));

//searches saved to local storage will appear
getPreviousCities();

//folowing will search the city when button is clicked
$(".search").click(function (event){
    event.preventDefault();
    document.getElementById("main-card").className = "card visible";
    document.getElementById("theForcast").className = "mt-4 visible";
    searchCity = $("#searchedCity").val();
    console.log(searchCity);
    if(searchCity !== ""){
        previousCity.push(searchCity);
        localStorage.setItem("previousCity", JSON.stringify(previousCity));
        $("#current-city").empty();
        $("#current-weather").empty();
        getWeather();
        getPreviousCities();
        getForcast();
    }
});

$(document).on("click", ".theWeather", function(event){
    event.preventDefault();
    searchCity = $(this).text();
    console.log(searchCity);
    $("#current-city").empty();
    $("#current-weather").empty();
    getWeather();
    getForcast();
});

function getWeather(){
    document.getElementById("main-card").className = "card visible";
    document.getElementById("theForcast").className = "mt-4 visible";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchCity + "&appid=b6abfbc0defc42a4c3f19f39c6849e83",
        method: "GET"
    }).then(function (response){
        var temp = Number(response.main.temp);
        var tempFahren = parseInt(1.8 * (temp - 273) + 32);
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var icon = response.weather[0].icon;
        var iconURL = "https://openweathermaporg/img/w/" + icon + ".png";
        var cityName = response.name;
        var cityHeading = cityName + " " + currentDay;

        $ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=42.46&lon=-71.06&appid=b6abfbc0defc42a4c3f19f39c6849e83",
            method: "GET"
        }).then(function (response){
            uvIndex = response.current.uvi;
            $("#current-city").append(`${cityHeading}`);
            $("#current-city").append(`<img src="${iconURL}">`);
            $("#current-weather").append(`<p>Temperature: ${tempFahren}&deg;F</p>`);
            $("#current-weather").append(`<p>Humidity: ${humidity}%</p>`);
            $("#current-weather").append(`<p>Wind Speed: ${windSpeed}MPH</p>`);
            $("#current-weather").append(`<p>UV Index: ${UVindex}</p>`);
        });

    });
}

function getForcast(){
$(".card-deck").empty();
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=b6abfbc0defc42a4c3f19f39c6849e83",
    method: "GET"
}).then(function (response){
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=42.46&lon=-71.06&appid=b6abfbc0defc42a4c3f19f39c6849e83",
        method: "GET"
    }).then(function (response){
        console.log(response);
        for (let i=0; i<5; i++) {
            var icon = response.daily[i].weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
            var temp = Number(response.daily[i].temp.day);
            var tempFahren = parseInt(1.8 * (temp-273) +32);
            var humidity = response.daily[i].humidity;
            var day = moment().add((i+1), "days").format("MM/DD/YYYY");
            console.log(day);
            console.log("icon: " + icon);
            console.log("F: " + tempFahren);
            console.log("humidity: " + humidity);
            var forecastCard = $('<div class="card bg-primary text-white"></div>');
            var cardBody = $("<div>").addClass("card-body");
            cardBody.append(`<p>${day}</p>`);
            cardBody.append(`<img class="w-100" src="${iconURL}">`);
            cardBody.append(`<p>Temp: ${tempFahren}&deg;F</p>`);
            cardBody.append(`<p>Humidity: ${humidity}%</p>`);
            forecastCard.append(cardBody);
            $(".card-deck").append(forecastCard);
        }
    });
});
}
function getPreviousCities() {
    var storedSearches = JSON.parse(localStorage.getItem("previousCity"));

    if (storedSearches !== null) {
        previousCity = storedSearches;
        renderSearchHistory();
    }
}

function renderSearchHistory() {
    $(".list-group").empty();
    for (let i = 0; i < previousCity.length; i++) {

        $(".list-group").prepend(`<button type="button" class="list-group-item list-group-item-action saved-stuff-to-show">${previousCity[i]}</button)`);
        console.log(i + " times run");
    }
}