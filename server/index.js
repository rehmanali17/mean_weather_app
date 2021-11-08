const express = require("express");
const axios = require("axios");
const cors = require('cors')
const config = require('config')

const app = express();
app.use(cors())

const PORT = process.env.PORT || 5000;
const ApiKey = config.get('ApiKey')

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

      let dailyReport = intervals.map(interval => {
        let day = new Date(interval.startTime).getDay()
        let date = new Date(interval.startTime).getDate()
        let month = new Date(interval.startTime).getMonth()
        let year = new Date(interval.startTime).getFullYear()
        let formattedDate = `${days[day]}, ${date} ${months[month]} ${year}`

        let formattedSunriseTime = new Date(interval.values.sunriseTime).getHours() + ":" + new Date(interval.values.sunriseTime).getMinutes() + ":" + new Date(interval.values.sunriseTime).getSeconds()
        let formattedSunsetTime = new Date(interval.values.sunsetTime).getHours() + ":" + new Date(interval.values.sunsetTime).getMinutes() + ":" + new Date(interval.values.sunsetTime).getSeconds()
        
          return {
            date: formattedDate,
            weatherCode: interval.values.weatherCode,
            temperatureMax: interval.values.temperatureMax,
            temperatureMin: interval.values.temperatureMin,
            temperatureApparent: interval.values.temperatureApparent,
            sunriseTime: formattedSunriseTime,
            sunsetTime: formattedSunsetTime,
            humidity: interval.values.humidity,
            windSpeed: interval.values.windSpeed,
            visibility: interval.values.visibility,
            cloudCover: interval.values.cloudCover
          }
      })

      res.status(200).json({rawResults: dailyReport, formattedResults:report});
    } else {
      res.status(400).json({ message: "Error" });
    }

  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
});

// app.get('/third',())

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
