//importing module from express
import express from "express";
//importing module from cors
import cors from "cors";
import { filterDestinations as filter } from "./Util/filters.js";
import { validateIt } from "./Util/validators.js";
import { getUnsplashPhoto } from "./Util/data_access.js";
//setting the express function to app
const app = express();
// telling the api to use cors() as middleware
app.use(cors());
app.use(express.json());

//allows heroku to port select
const PORT = process.env.PORT || 3000;
//allows a "deaf" api to listen to the selected port and logs that it is running
app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});
//Stand in Database
const destinationsDB = {
  123456: {
    destination: "Eiffel Tower",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    description: "",
  },
  345745: {
    destination: "Champs Elysees",
    location: "Paris",
    photo:
      "https://media.architecturaldigest.com/photos/6014561ff85279d83de80804/16:9/w_1775,h_998,c_limit/Screen%20Shot%202021-01-29%20at%201.37.53%20PM.png",
    description: "",
  },
  234567: {
    destination: "Big Ben",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    description: "",
  },
};
//Read(GET) request to respond witht he obj of the db
app.get("/destination", (req, res) => {
  const city = req.query.city;
  filter({ city, destinationsDB, res });
});

app.get("/destination/city/:cityName", (req, res) => {
  const city = req.params.cityName;
  filter({ city, destinationsDB, res });
});

//Create(POST)
app.post("/destination", validateIt, async (req, res) => {
  const { destination, location, description } = req.body;
  const photo = await getUnsplashPhoto({ destination, location });
  const randId = Math.floor(Math.random() * 999999);
  destinationsDB[randId] = { destination, location, photo, description };
  res.status(200).json({ status: 200, response: destinationsDB });
});

//Update(PUT)

//Delete(DELETE)
