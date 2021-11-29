let cityText = document.querySelector('#city-text');

// 
let citySubmitBtn = document.querySelector('#city-submit');
citySubmitBtn.addEventListener('click', searchSubmit);

let userCity = document.querySelector("#city-text").value;

// Hooking into user input
function searchSubmit (event) {
    event.preventDefault();
    console.log("Search button function pressed. Checking to ensure search box contains a city.");
    // let userCity = document.querySelector("#city-text").value;
    console.log("Set userCity equal to search box string.")
    if (!userCity) {
      console.error('Please enter a location to search');
      return;
    }
    citySearch(userCity);
    console.log("Search input is valid. Passing userCity paremeter to citySearch function (5 day forecast API) to fetch coordinates.")
  }
console.log(cityText);
// Function call for weather api

function citySearch (userCity) {
    let cityCoords = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=f85be298446b14abaf2660208bb00bf7`;

    fetch(cityCoords)
      .then(function (response) {
        console.log("Five day forecast fetch commenced...")
        return response.json();
      })
      .then(function (fiveDayData) {
          console.log("City coordinates obtained from citySearch function (5 day forecast API). Console logging below...");
          console.log(fiveDayData);
          oneCall(fiveDayData);
          console.log("Passing fiveDayData parameter into oneCall function to allow use of coordinates in fetch.")
          // fiveDayWeather(fiveDayData);
      });
    };
    
    function oneCall(fiveDayData) {
        let cityLon = fiveDayData.coord.lon;
        let cityLat = fiveDayData.coord.lat;
        let oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,minutely&units=imperial&appid=f85be298446b14abaf2660208bb00bf7`;
        fetch(oneCall)
          .then(function (response) {
            console.log('One call API fetch commenced...')
            return response.json();
          })
          .then(function (oneCallData) {
            console.log(oneCallData);
            console.log("Passing oneCallData into currentWeatherCard function to populate the current weather card.");
            currentWeatherCard(oneCallData);
            console.log("Passing oneCallData into fiveDayWeather function to populate the forecast weather cards.");
            fiveDayWeather(oneCallData);
          })
    };




// Uses oneCallData to populate the current weather card.
function currentWeatherCard(oneCallData) {
    console.log("Calling currentWeatherCard function. This function creates the header card for the city, and populates it with data.");
        let dayTemp = oneCallData.current.temp;
        // console.log(dayTemp);
        let dayWind = oneCallData.current.wind_speed;
        // console.log(dayWind);
        let dayHumidity = oneCallData.current.humidity;
        // console.log(dayHumidity);
        let dayUV = oneCallData.current.uvi;

// Creates div for current day weather
        let currentDayCard = document.createElement('div');
        document.querySelector('#current-card-sec').appendChild(currentDayCard);
        currentDayCard.setAttribute('id', 'current-day-card-div');
        currentDayCard.setAttribute('class', 'card');
        currentDayCard.setAttribute('style', 'width: 18rem');

// Creates header inside the div
        let dayCard = document.createElement('header');
        document.querySelector('#current-day-card-div').appendChild(dayCard);
        currentDayCard.setAttribute('id', 'current-day-card-header');
        currentDayCard.setAttribute('class', 'd-flex card-body mh-20 justify-content-center');

// Creates h5 inside of the header
        let cardHeaderText = document.createElement('h5');
        cardHeaderText.setAttribute('style', 'text-align: center');
        dayCard.appendChild(cardHeaderText);
        cardHeaderText.textContent = userCity;

// Populates current weather card temperature
        let pTemp = document.createElement('p');
        dayCard.appendChild(pTemp);
        pTemp.setAttribute('id', 'current-weather-temp');
        document.querySelector('#current-weather-temp').textContent = "Temp: " + dayTemp + "°F";

// Populates current weather card wind speed
        let pWind = document.createElement('p');
        dayCard.appendChild(pWind);
        pWind.setAttribute('id', 'current-weather-wind');
        document.querySelector('#current-weather-wind').textContent = "Wind: " + dayWind + " MPH";

// Populates current weather card humidity
        let pHumidity = document.createElement('p');
        dayCard.appendChild(pHumidity);
        pHumidity.setAttribute('id', 'current-weather-humidity');
        document.querySelector('#current-weather-humidity').textContent = "Humidity: " + dayHumidity + "%";

// Populates current weather card UV index
        let pUV = document.createElement('p');
        dayCard.appendChild(pUV);
        pUV.setAttribute('id', 'current-weather-UV');
        document.querySelector('#current-weather-UV').textContent = "UV index: " + dayUV;
      };





function fiveDayWeather(oneCallData) {
  console.log("Calling fiveDayWeather function. This function creates the cards for the city, and populates it with five day forecast data.");
  for (let oneCallIndex = 0; oneCallIndex < 5; oneCallIndex++) {
    console.log("Looping to populate card " + oneCallIndex + ".");
  // Uses oneCallData to populate the current weather card.
    let dayTemp = oneCallData.daily[oneCallIndex].temp.day;
  // console.log(dayTemp);
    let dayWind = oneCallData.daily[oneCallIndex].wind_speed;
  // console.log(dayWind);
    let dayHumidity = oneCallData.daily[oneCallIndex].humidity;
  // console.log(dayHumidity);
  
    let humanDateFormat;

  function unixConvert(oneCallData) {
    let unixTimestamp = oneCallData.daily[oneCallIndex].dt;
    let milliseconds = unixTimestamp * 1000;
    let dateObject = new Date(milliseconds);

    humanMonthFormat = dateObject.toLocaleString("en-US", {month: "numeric"});
    humanDayFormat = dateObject.toLocaleString("en-US", {day: "numeric"});
    humanYearFormat = dateObject.toLocaleString("en-US", {year: "numeric"});

    humanDateFormat = `${humanMonthFormat}/${humanDayFormat}/${humanYearFormat}`;
    console.log(humanDateFormat);
  };

  unixConvert(oneCallData);

    // Creates div for five day weather
      let fiveDayCardDiv = document.createElement('div');
      document.querySelector('#fiveDay-card-sec').appendChild(fiveDayCardDiv);
      fiveDayCardDiv.setAttribute('id', 'five-day-card-div-' + oneCallIndex);
      fiveDayCardDiv.setAttribute('class', 'card');
      fiveDayCardDiv.setAttribute('style', 'width: 18rem');
    
    // Creates header inside the div
      let fiveDayCard = document.createElement('header');
      document.querySelector('#five-day-card-div-' + oneCallIndex).appendChild(fiveDayCard);
      fiveDayCard.setAttribute('class', 'd-flex card-body mh-20 justify-content-center');
      fiveDayCard.textContent = "1 day from now.";

    // Creates h5 inside of the header
      let cardHeaderText = document.createElement('h5');
      cardHeaderText.setAttribute('style', 'text-align: center');
      fiveDayCard.appendChild(cardHeaderText);
      cardHeaderText.textContent = humanDateFormat;

    // Populates five-day weather card temperature
      let pTemp = document.createElement('p');
      fiveDayCard.appendChild(pTemp);
      pTemp.textContent = "Temp: " + dayTemp + "°F";
      
    // Populates five-day weather card wind speed
      let pWind = document.createElement('p');
      fiveDayCard.appendChild(pWind);
      pWind.textContent = "Wind: " + dayWind + " MPH";
      
    // Populates five-day weather card humidity
      let pHumidity = document.createElement('p');
      fiveDayCard.appendChild(pHumidity);
      pHumidity.textContent = "Humidity: " + dayHumidity + "%";
      
    }
  };


