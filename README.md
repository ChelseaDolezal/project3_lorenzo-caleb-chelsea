  In this analysis we used data from the National Highway Traffic Safety Administration (NHTSA), specifically the Fatality Analysis Reporting System (FARS) for the year 2022. We examined variables such as time, location, and day of the week. We set out to answer what times of day are crashes most prevalent, which state has a higher rate of fatal car crashes, does weather impact fatal accidents in the US and other correlations we may find interesting. 
  When it comes to privacy, The NHSA anonymizes and aggregates personal data of individuals involved in crashes, ensuring privacy and confidentiality. The NHSA fosters transparency by providing documentation on their data collection methodologies and sources, enabling publicly accessible data to support databases, policymakers, and researchers. We ensured not to use sensitive data in the analysis to mitigate the risk of bias and ensure a fair analysis.
  Instructions on how to use and interact with the project:
To run our data open 2 terminals at the folder labled project3_lorenzo-caleb-chelsea. The two commands you'll always want to run in terminal (in the project folder) for you to connect to the server and api:
  In the first open terminal type “python hello_app.py  “ this runs flask server to enable navigation to API endpoint (to access this data in JSON format type in this URL in your browser: http://localhost:9000/api/accidents)
  In the second open terminal type “python -m http.server 8000 ”  This serves html file using local server that contains CSS and JS files (to view, type this URL in your browser: http://localhost:8000/templates/)

Resources:
https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/2022/



