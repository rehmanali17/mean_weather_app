const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 5000;
const ApiKey = "LaFkTpyRm4YbqKqUw1KAwFYwjJq2T8Zw"

const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

// app.get("/", (req, res) => {
//   res.json({ message: "Success" });
// });

app.get("/:location", async (req, res) => {
  try {
    let queryParams = {
      params: {
        location: req.params.location,
        fields: [
          "weatherCode",
          "temperatureApparent",
          "humidity",
          "sunriseTime",
          "sunsetTime",
          "visibility",
          "windSpeed",
          "cloudCover",
          "temperatureMax",
          "temperatureMin"
        ],
        timesteps: "1d",
        units: "imperial",
        apikey: ApiKey,
      },
    };
    
    const response = await axios.get(
      "https://api.tomorrow.io/v4/timelines",
      queryParams
    );

    if (typeof response.data === "object") {
      let { intervals } = response.data.data.timelines[0]
      let report = intervals.map(interval => {
        let day = new Date(interval.startTime).getDay()
        let date = new Date(interval.startTime).getDate()
        let month = new Date(interval.startTime).getMonth()
        let year = new Date(interval.startTime).getFullYear()
        let formattedDate = `${days[day]}, ${date} ${months[month]} ${year}`
          return {
            date: formattedDate,
            weatherCode: interval.values.weatherCode,
            temperatureMax: interval.values.temperatureMax,
            temperatureMin: interval.values.temperatureMin,
            windSpeed: interval.values.windSpeed,
          }
      })
      res.status(200).json({rawResults: response.data.data, formattedResults:report});
    } else {
      res.status(400).json({ message: "Error" });
    }

  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
});

// app.get('/third',())

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
