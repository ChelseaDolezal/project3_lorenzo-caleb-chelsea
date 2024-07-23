  In this analysis we used data from the National Highway Traffic Safety Administration (NHTSA), specifically the Fatality Analysis Reporting System (FARS) for the year 2022. We examined variables such as time, location, and day of the week. We set out to answer what times of day are crashes most prevalent, which state has a higher rate of fatal car crashes, does weather impact fatal accidents in the US and other correlations we may find interesting. 
  When it comes to privacy, The NHSA anonymizes and aggregates personal data of individuals involved in crashes, ensuring privacy and confidentiality. The NHSA fosters transparency by providing documentation on their data collection methodologies and sources, enabling publicly accessible data to support databases, policymakers, and researchers. We ensured not to use sensitive data in the analysis to mitigate the risk of bias and ensure a fair analysis.
  Instructions on how to use and interact with the project:
To run our data open 2 terminals at the folder labled project3_lorenzo-caleb-chelsea. The two commands you'll always want to run in terminal (in the project folder) for you to connect to the server and api:
  In the first open terminal type “python hello_app.py  “ this runs flask server to enable navigation to API endpoint (to access this data in JSON format type in this URL in your browser: http://localhost:9000/api/accidents)
  In the second open terminal type “python -m http.server 8000 ”  This serves html file using local server that contains CSS and JS files (to view, type this URL in your browser: http://localhost:8000/templates/)

Resources:
https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/2022/
Link to PowerPoint:
https://docs.google.com/presentation/d/1Ow60k1MvdXkYQT_4HWOxaBpx-fne5jDbOHeKmdBG7yQ/edit#slide=id.gc6f980f91_0_33

2022 state population estimate data is adapted from the Census (American Community Survey) data: 
  It can be accessed via API with the following link: https://api.census.gov/data/2022/acs/acs1?get=group(B01003)&ucgid=pseudo(0100000US$0400000) 
  Normal weblink to table: https://data.census.gov/table/ACSDT1Y2022.B01003?q=United%20States&t=Population%20Total:Populations%20and%20People&g=010XX00US,$0400000,$04000S0_040XX00US01,02,55&y=2022&moe=false&tp=true

State borders geoJSON data from Leaflet 
https://leafletjs.com/examples/choropleth/us-states.js (direct link to data)
https://leafletjs.com/examples/choropleth/ (link to page, data can be found under the "Data Source" header)
