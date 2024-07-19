// Create US map; set center and default zoom
let myMap = L.map("map", {
  center: [37.5, -95],
  zoom: 4
});

// Add the tile layer for US map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);

// Create layer groups of map
let markers = L.markerClusterGroup();
let circleMarkers = L.layerGroup().addTo(myMap);
let heat = L.heatLayer([], {
  radius: 25,
  blur: 15,
  maxZoom: 17, // Max zoom for clusters to display
  gradient: { // color gradient for heatmap
    '0.05': 'blue',
    '0.15': 'green',
    '0.25': 'yellow',
    '0.35': 'orange',
    '0.5': 'red'
  }
}).addTo(myMap);

// Load data from Flask API
fetch('http://localhost:9000/api/accidents')
  .then(response => {
    return response.json();
  })
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
        properties: { // Add all properties from the data
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

    // Loop through data and add to layers
    geoData.features.forEach(feature => {
      let coords = feature.geometry.coordinates;
      let properties = feature.properties;

      // Create location marker with detailed info popup
      let marker = L.marker([coords[1], coords[0]])
        .bindPopup(`<h3>${properties.cityName}, ${properties.stateName}</h3><hr><p>Case ID: ${properties.caseID}</p><p>Pedestrians: ${properties.pedestrians}</p><p>Persons Not In Motor Vehicle: ${properties.personsNotInMotorVehicle}</p><p>Total Vehicles: ${properties.totalVehicles}</p><p>Persons Involved: ${properties.personsInvolved}</p><p>Persons Killed: ${properties.personsKilled}</p><p>Harmful Event: ${properties.harmfulEventName}</p><p>Weather: ${properties.weatherName}</p>`);
      markers.addLayer(marker);

      // Add coordinates to heatmap
      heat.addLatLng([coords[1], coords[0], properties.personsKilled]);

      // Create circle marker with color based on number of persons killed
      let circleMarker = L.circle([coords[1], coords[0]], {
        color: getColor(properties.personsKilled),
        fillColor: getColor(properties.personsKilled),
        fillOpacity: 0.75,
        radius: properties.personsKilled * 1000 // Radius proportional to number of persons killed
      }).bindPopup(`<h3>${properties.cityName}, ${properties.stateName}</h3><hr><p>Persons Killed: ${properties.personsKilled}</p>`);
      circleMarkers.addLayer(circleMarker);
    });

    // Layer controls to switch between layers
    L.control.layers({
      "Markers": markers,
      "Heatmap": heat,
      "Circle Markers": circleMarkers
    }, null, { collapsed: false }).addTo(myMap);

    // Create and add a legend for the heatmap
    let gradientLegend = L.control({ position: 'bottomright' });
    gradientLegend.onAdd = function (map) {
      let div = L.DomUtil.create('div', 'info legend');
      let grades = [0, 1, 2, 3, 4, 11, 21, 31, 41];
      let labels = [];
      let from, to;
    
      // Set legend ranges
      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        if (i < grades.length - 1) {
          to = (grades[i + 1] - 1);
          if (from + 1 === grades[i + 1]) {
            labels.push('<i style="background:' + getColor(from) + '"></i> ' + from);
          } else {
            labels.push('<i style="background:' + getColor(from) + '"></i> ' + from + '-' + to);
          }
        } else {
          // Last range print as 41+
          labels.push('<i style="background:' + getColor(from) + '"></i> ' + from + '+');
        }
      }
    
      div.innerHTML += labels.join('<br>'); // Add labels to the legend
      return div;
    };
    gradientLegend.addTo(myMap);
  })

// Function to get color based on value
function getColor(d) {
  return d > 40 ? 'crimson' :      
         d > 30 ? 'red' :    
         d > 20 ? 'darkorange' :         
         d > 10 ? 'orange' :  
         d > 5 ? 'gold' :   
         d > 3 ? 'deepSkyBlue' :     
         d > 2 ? 'aqua' :
         d > 1 ? 'lime' :      
         d > 0 ? 'lightgreen' :     
                 'gainsboro'; // Default color
}







      


