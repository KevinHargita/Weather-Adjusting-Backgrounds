async function getWeatherData() {
  const ipinfo = await (await fetch('https://ipapi.co/json/')).json();

  const weatherZoneData = await (await fetch(`https://api.weather.gov/points/${ipinfo.latitude},${ipinfo.longitude}`)).json();

  const forecastData = await (await fetch(weatherZoneData.properties.forecastHourly)).json();
  const forecast = forecastData.properties.periods[0];

  return forecast;
}

function getPreferencKey() {
  for (let property in localStorage){
    if (property.startsWith('preferences')){
      return property;
    }
  }
}

const weatherData = getWeatherData().then((data) => {
  let meeteffectId = 184;
  console.log(data);

  if (data.temperature < 40){
    console.log('cold');
    meeteffectId = 236;
  }
  if (data.shortForecast.includes('Rain')) {
    console.log('rain');
    meeteffectId = 239;
  }

  if (JSON.parse(JSON.parse(localStorage.getItem(getPreferencKey())))[6] != `meeteffectid:${meeteffectId}`){
    localStorage.setItem(getPreferencKey(), `"[null,null,null,null,null,2,\\"meeteffectid:${meeteffectId}\\",null,null,null,null,null,null,null,[]]"`);
    location.reload();
  }
});

//239=rain, 236=snow, 184=sunny