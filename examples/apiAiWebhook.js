// npm install express body-parser accuweather-simple
// needs accukeyfile.json with "apikey" and/or "language" json properties
// for deveplopment you can use ngrok to obtain a public url
const express = require("express");
const accuConfig = require("./accukeyfile");
const accuweatherSimple = require("accuweather-simple")(accuConfig);
const app = express();

app.use(require("body-parser").json());

const helloHttp = (req, res) => {
  const body = req.body;
  if (body.result.action == "weather") {
    const location = body.result.parameters.location.city;
    res.setHeader("Content-Type", "application/json"); //Requires application/json MIME type
    accuweatherSimple.getWeather(location).then(data =>
      res.send(
        JSON.stringify({
          speech: data,
          displayText: data
        })
      )
    );
  } else res.send(500);
};

app.post("/action", helloHttp);

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
