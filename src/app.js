const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Shiv Shankar",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Shiv Shankar",
        helpMessage: "Help Content",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Shiv Shankar",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (!error) {
                forecast(longitude, latitude, (error, data) => {
                    if (!error) {
                        return res.send({
                            data,
                            location,
                            address: req.query.address,
                        });
                    } else {
                        return res.send({
                            error,
                        });
                    }
                });
            } else {
                return res.send({
                    error,
                });
            }
        }
    );
});

app.get("/help/*", (req, res) => {
    res.render("404NotFound", {
        title: "404",
        name: "Shiv Shankar",
        message: "Help Page Not Found",
    });
});

app.get("*", (req, res) => {
    res.render("404NotFound", {
        title: "404",
        name: "Shiv Shankar",
        message: "Page Not Found!",
    });
});

app.listen(port, () => {
    console.log("Server is running...");
});
