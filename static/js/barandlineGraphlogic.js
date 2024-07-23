// Load the data from the Flask API
fetch('http://localhost:9000/api/accidents')
  .then(response => response.json())
  .then(data => {
      // Convert data to GeoJSON format for mapping
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

      // Monthly accident- count number of accidents per month
      let accidentCounts = Array(12).fill(0);
      data.forEach(d => {
          const month = d.Month - 1;
          accidentCounts[month]++;
      });

      // Create the monthly line chart
      const ctxMonthly = document.getElementById('accidentChart').getContext('2d');
      new Chart(ctxMonthly, {
          type: 'line',
          data: {
              labels: [
                  'January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'
              ],
              datasets: [{
                  label: 'Number of Accidents',
                  data: accidentCounts,
                  borderColor: 'blue',
                  backgroundColor: 'lightblue',
                  borderWidth: 2,
                  fill: true
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      display: true,
                      position: 'top'
                  },
                  title: {
                      display: true,
                      text: 'Accidents Throughout the Year'
                  }
              },
              scales: {
                x: {
                  title: {
                      display: true,
                      text: 'Month of the year'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Number of Accidents',
                      padding: 20
                  },
                      beginAtZero: true
                  }
              }
          }
      });

      // Hourly accident counts- bar chart
      let hourlyCounts = Array(24).fill(0);
      data.forEach(d => {
          const hour = d.Hour;
          hourlyCounts[hour]++;
      });

      // Create the hourly bar chart
      const ctxHourly = document.getElementById('hourlyAccidentChart').getContext('2d');
      new Chart(ctxHourly, {
          type: 'bar',
          data: {
              labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),//24 is hours in the day,i is the index of the current element in the array being created. and the 00 represents the minutes in the hour
              datasets: [{
                  label: 'Number of Accidents by Hour',
                  data: hourlyCounts,
                  backgroundColor: 'red',
                  borderColor: 'darkred',
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      display: true,
                      position: 'top'
                  },
                  title: {
                      display: true,
                      text: 'Accidents by Hour of the Day'
                  }
              },
              scales: {
                x: {
                  title: {
                      display: true,
                      text: 'Time of day using the 24 hour clock'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Number of Accidents',
                      padding: 20
                  },
                      beginAtZero: true
                  }
              }
          }
      });

      // Daily accident counts- count accidents for each day of the week
      let dailyCounts = Array(7).fill(0);
      data.forEach(d => {
          const dayOfWeek = Number(d.DayOfWeek);
          if (!isNaN(dayOfWeek) && dayOfWeek >= 1 && dayOfWeek <= 7) {
              dailyCounts[dayOfWeek-1]++;
          }
      });

      // Create the daily bar chart
      const ctxDaily = document.getElementById('dailyAccidentChart').getContext('2d');
      new Chart(ctxDaily, {
          type: 'bar',
          data: {
              labels: [
                  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                  'Thursday', 'Friday', 'Saturday'
              ],
              datasets: [{
                  label: 'Accidents by Day of the Week',
                  data: dailyCounts,
                  backgroundColor: 'green',
                  borderColor: 'darkgreen',
                  x: 'day',
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: {
                      display: true,
                      position: 'top'
                  },
                  title: {
                      display: true,
                      text: 'Accidents by Day of the Week'
                  }
              },
              scales: {
                x: {
                  title: {
                      display: true,
                      text: 'Day of the Week'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Number of Accidents',
                      padding: 20
                  },
                
                      beginAtZero: true
                  }
              }
          }
      });
  })
  .catch(error => console.error('Error fetching data:', error));