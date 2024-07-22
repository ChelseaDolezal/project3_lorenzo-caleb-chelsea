// Create the map object
let myMap2 = L.map("map2", {
  center: [37.5, -95], // Sets the initial center of the map (latitude, longitude)
  zoom: 4 // Sets the initial zoom level of the map
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap2); // Adds the tile layer to the map

// Load the data from the Flask API routes
let statePromise = d3.json('http://localhost:9000/api/states')
let populationPromise = d3.json('http://localhost:9000/api/populations')

Promise.all([statePromise, populationPromise])
  .then(data => { //response goes into "data" variable, then the below function gets ran
    console.log(data)
    // Create a choropleth layer based on the car accident data
    let geoJson = L.choropleth(statesData, {
      valueProperty: function(feature) {
        let stateName = feature.properties.name; //stateName = state names from our state lines data (statesData)

        //Calculating accidents per capita for each state
        // first matching the state names across API accident data and state border data (statesData)
        let stateAccidents = data[0].find( //data[0] to refer to statePromise data 
          (state) => state._id === stateName); //arrow function matching states
          console.log(stateAccidents);
        
        // then doing the same for the population API data and state border data (statesData)
        let statePopulation = data[1].find( //data[1] to refer to populationPromise data
          (popStates) => popStates.State === stateName); //arrow function matching states
          console.log(statePopulation);

        //console logging per capita accidents
        if (stateAccidents)
          percapitaAccidents = ((stateAccidents.CarAccidents)/(statePopulation.Population))*100000;
          console.log(percapitaAccidents)

          //Calculating accidents per capita
        if (stateAccidents)
          return ((stateAccidents.CarAccidents)/(statePopulation.Population)*100000);//conversion down here
        else 
          return 0;
      },
      
      // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      let stateName = feature.properties.name; //stateName = state names from our state lines data (statesData)

        //Calculating accidents per capita for each state
        // first matching the state names across API accident data and state border data (statesData)
        let stateAccidents = data[0].find( //data[0] to refer to statePromise data 
          (state) => state._id === stateName); //arrow function matching states
          console.log(stateAccidents);
        
        // then doing the same for the population API data and state border data (statesData)
        let statePopulation = data[1].find( //data[1] to refer to populationPromise data
          (popStates) => popStates.State === stateName); //arrow function matching states
          console.log(statePopulation);

        //console logging per capita accidents
        if (stateAccidents)
          percapitaAccidents = ((stateAccidents.CarAccidents)/(statePopulation.Population))*100000;
          console.log(percapitaAccidents)

          //Calculating accidents per capita
        if (stateAccidents)
          //formatting and populating popup
          layer.bindPopup("<h3>" + feature.properties.name + "</h3> <b> Total Number of Fatal Car Accidents in 2022: </b>" +  stateAccidents.CarAccidents + 
            "</br> <b> Accidents Per 100,000 People: </b>" + percapitaAccidents.toPrecision(4) +
            "</br> <b> Number of Vehicles Involved: </b>" + stateAccidents.TotalVehicles + 
            "</br> <b> Total Number of Persons Killed: </b>" + stateAccidents.PersonsKilled + "<br>");
      
    },
    scale: ['white', 'red'],
    steps: 5,
    mode: 'e',
    style: {
        color: '#000',
        weight: 0.5,
        fillOpacity: 0.7
      }
  }).addTo(myMap2);

  // Console logging colors and step limits 
  let colors = geoJson.options.colors;
  let limits = geoJson.options.limits;
  console.log(colors);
  console.log(limits);

  let colors2 = ["#ffbfbf","#ff7f7f","#ff3f3f","#ff0000"];
  let labels = ["0", "5.49", "10.99", "16.48", "21.98"];

  // Adding a legend control
  let legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
      let div = L.DomUtil.create('div', 'info legend');
      let legendInfo = "<h4>Accidents <br>per 100,000</h4>";

      for (let i = 0; i < colors2.length; i++) {
        div.innerHTML += 
            '<i style="background:' + colors2[i] + '"></i> ' +
            labels[i] + (labels[i + 1] ? '&ndash;' + labels[i + 1] + '<br>' : '+');
    }
    div.innerHTML =  legendInfo + div.innerHTML;
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap2);

}); 

