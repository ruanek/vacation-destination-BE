import express from "express";
import uniqueid from "uniquid";

import { filterDestinations as filter } from "../Util/filters.js";
import { validateIt, isValidateRequiredField } from "../Util/validators.js";
import { getUnsplashPhoto } from "../Util/data_access.js";
import { destinationsDB } from "../index.js";
export const destRouter = express.Router();

//Read(GET) request to respond witht he obj of the db
destRouter.get("/", (req, res) => {
  const city = req.query.city;
  filter({ city, destinationsDB, res });
});

destRouter.get("/city/:cityName", (req, res) => {
  const city = req.params.cityName;
  filter({ city, destinationsDB, res });
});

//Create(POST)
destRouter.post("/", validateIt, async (req, res) => {
  const { destination, location, description } = req.body;
  const photo = await getUnsplashPhoto({ destination, location });

  const newDest = {
    destination,
    location,
    photo,
    description: description ? description : "",
  };
  destinationsDB[uniqueid()] = newDest;
  res.send({ message: "success" });
});

//Update(PUT)
destRouter.put(
  "/:id",
  (req, res, next) => {
    const { destination, location } = req.body;
    if (destination !== undefined && !isValidateRequiredField(destination)) {
      return res
        .status(400)
        .send({ error: "destination is reqired and has to be valid text" });
    }
    if (location !== undefined && !isValidateRequiredField(location)) {
      return res
        .status(400)
        .send({ error: "location is reqired and has to be valid text" });
    }
    next();
  },
  async (req, res) => {
    const id = req.params.id;
    const { destination, location, description } = req.body;

    let hasDestOrLocChanged = false;

    if (destination) {
      hasDestOrLocChanged = true;
      destinationsDB[id].destination = destination;
    }
    if (location) {
      hasDestOrLocChanged = true;
      destinationsDB[id].location = location;
    }

    if (hasDestOrLocChanged) {
      const { destination, location } = destinationsDB[id];
      const photo = await getUnsplashPhoto(destination, location);
      destinationsDB[id].photo = photo;
    }

    if (description) {
      destinationsDB[id].description = description;
    }
    res.send({ message: "Success" });
  }
);
//Delete(DELETE)
destRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  delete destinationsDB[id];

  res.send({ message: "Successfully deleted" });
});
