// Create the map object
let myMap = L.map("map", {
  center: [37.5, -95], // Sets the initial center of the map (latitude, longitude)
  zoom: 4 // Sets the initial zoom level of the map
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap); // Adds the tile layer to the map

// Load the data
d3.csv('/mnt/data/accident.csv').then(data => {
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
              severity: d.Severity,
              date: d.Start_Time,
              city: d.City,
              state: d.State,
              description: d.Description,
              temperature: d.Temperature,
              visibility: d.Visibility,
              weather: d.Weather_Condition,
              wind_speed: d.Wind_Speed,
              day_of_week: new Date(d.Start_Time).getDay(),
              time_of_day: new Date(d.Start_Time).getHours()
          }
      }))
  };