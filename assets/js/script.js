
// let weatherHead = document.createElement("div");
// weatherHead.classList.add('card', 'width');
// weatherHead.appendChild

// let weatherCard = document.createElement("div");
// weatherCard.classList.add('card', 'width');

// let weatherBody = document.createElement("div");
// weatherBody.classList.add('card');

// let fiveDayEl = document.createElement('div');
// // fiveDayEl.textContent = insert city name

let cityText = document.querySelector('#city-text');

// 
let citySubmitBtn = document.querySelector('#city-submit');
citySubmitBtn.addEventListener('click', searchSubmit);

// Hooking into user input
function searchSubmit (event) {
    event.preventDefault();
    console.log("This is the searchSubmit Test");
    let userCity = document.querySelector("#city-text").value;
    if (!userCity) {
      console.error('Please enter a location to search');
      return;
    }
   citySearch(userCity);
  }
console.log(cityText);
// Function call for weather api

function citySearch (userCity) {
    let cityCoords = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=f85be298446b14abaf2660208bb00bf7`;

    fetch(cityCoords)
      .then(function (response) {
        return response.json();
      })
      .then(function (fiveDayData) {
          console.log("This is the openWeather fetch.")
          console.log(fiveDayData);
          oneCall(fiveDayData);
          // fiveDayWeather(fiveDayData);
      });
    };
    
    function oneCall(fiveDayData) {
        let cityLon = fiveDayData.coord.lon;
        let cityLat = fiveDayData.coord.lat;
        let oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,minutely&appid=f85be298446b14abaf2660208bb00bf7`;
        fetch(oneCall)
          .then(function (response) {
            console.log('One call API fetch commenced...')
            return response.json();
          })
          .then(function (oneCallData) {
            console.log("Fetch and return successful. This is the oneCall data parsed from JSON.");
            console.log(oneCallData);
            currentWeatherCard(oneCallData);
          })
    };

// Uses oneCallData to populate the current weather card.
function currentWeatherCard(oneCallData) {
    console.log("This is the oneCallData being called from the currentWeatherCard function.");
    console.log("This function is creating the header card for the city, and populating it with data.");
        let dayTemp = oneCallData.current.temp;
        console.log(dayTemp);
        let dayWind = oneCallData.current.wind_speed;
        console.log(dayWind);
        let dayHumidity = oneCallData.current.humidity;
        console.log(dayHumidity);
        let dayCard = document.querySelector('#day-card');
        let h5 = dayCard.querySelector('h5');
        userCity = document.querySelector("#city-text").value;
        h5.textContent = userCity;
        let ul = document.createElement('ul');
        header.appendChild(ul);



        // oneCallFiveDay(dayHumidity);
    };

// function oneCallWeather(oneCallData) {
//     console.log("This is the oneCallData being called from the oneCallWeather function.");
//     console.log(oneCallData);
//     console.log("This function is creating the cards with relevent weather information");
//     for (let i = 0; i < daily.length; i++) {
//         let dayTemp = oneCallData.daily[i].temp.day;
//         let dayWind = oneCallData.daily[i].wind_speed;
//         let dayHumidity = oneCallData.daily[i].humidity
        
//     }
// };

