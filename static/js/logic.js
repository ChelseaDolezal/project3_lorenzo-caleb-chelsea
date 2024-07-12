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
fetch('http://localhost:5000/api/accidents')
  .then(response => response.json())
  .then(data => {
      // Log the data to the console for verification
      console.log(data);

      // Check if data is loaded correctly
      if (data.length > 0) {
          console.log("Data loaded successfully!");
      } else {
          console.error("No data loaded.");
      }

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

      // Create a layer for the points
      let markers = L.markerClusterGroup();

      // Loop through a subset of the data to add markers (for example, the first 10 data points)
      geoData.features.slice(0, 10).forEach(feature => {
          let coords = feature.geometry.coordinates;
          let properties = feature.properties;

          if (coords[0] && coords[1]) {
              let marker = L.marker([coords[1], coords[0]])
                  .bindPopup(`<h3>${properties.city}, ${properties.state}</h3><hr><p>${properties.description}</p><p>Severity: ${properties.severity}</p><p>Temperature: ${properties.temperature}°F</p><p>Visibility: ${properties.visibility} miles</p><p>Weather: ${properties.weather}</p><p>Wind Speed: ${properties.wind_speed} mph</p>`);
              markers.addLayer(marker);
          }
      });

      myMap.addLayer(markers);
  })
  .catch(error => {
      console.error('Error loading data:', error);
  });