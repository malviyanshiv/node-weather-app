const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoibWFsdml5YW5zaGl2IiwiYSI6ImNrYWtscW51ZjAzMmsycm12bW13a3A5bmQifQ.w1w8-YoCrfw_7iCs0qFxLA";
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!");
        } else if (response.body.features.length === 0) {
            callback("Unable to find location. Try another search");
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
