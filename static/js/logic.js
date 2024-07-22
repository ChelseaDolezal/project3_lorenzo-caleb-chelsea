// Create the map object
let myMap = L.map("map", {
  center: [37.5, -95], // Sets the initial center of the map (latitude, longitude)
  zoom: 4 // Sets the initial zoom level of the map
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap); // Adds the tile layer to the map

// Load the data from the Flask API
fetch('http://localhost:9000/api/accidents')
  .then(response => response.json())
  .then(data => {
      // Convert data to GeoJSON format
      let geoData = {
          type: 'FeatureCollection',
          features: data.map(d => ({
              type: 'Feature',
              geometry: {
                  type: 'Point',
                  coordinates: [parseFloat(d.Longitude), parseFloat(d.Latitude)]
              },
              properties: {
                  state: d.State,
                  stateName: d.StateName,
                  caseID: d.CaseID,
                  pedestrians: d.Pedestrians,
                  personsNotInMotorVehicle: d.PersonsNotInMotorVehicle,
                  totalVehicles: d.TotalVehicles,
                  vehicleForms: d.VehicleForms,
                  personsInvolved: d.PersonsInvolved,
                  personsKilled: d.PersonsKilled,
                  city: d.City,
                  cityName: d.CityName,
                  month: d.Month,
                  monthName: d.MonthName,
                  day: d.Day,
                  dayName: d.DayName,
                  dayOfWeek: d.DayOfWeek,
                  dayOfWeekName: d.DayOfWeekName,
                  year: d.Year,
                  hour: d.Hour,
                  hourName: d.HourName,
                  minute: d.Minute,
                  minuteName: d.MinuteName,
                  latitude: d.Latitude,
                  longitude: d.Longitude,
                  harmfulEvent: d.HarmfulEvent,
                  harmfulEventName: d.HarmfulEventName,
                  weather: d.Weather,
                  weatherName: d.WeatherName,
                  fatalities: d.Fatalities
              }
          }))
      };
    })

