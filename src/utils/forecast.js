const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/cc3a97a0d4006e66f0ddc38c275acca0/${longitude},${latitude}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect weather service!");
        } else if (response.body.error) {
            callback("Unable to find location");
        } else {
            callback(
                undefined,
                `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is ${response.body.currently.precipProbability}% chances of rain`
            );
        }
    });
};

module.exports = forecast;
