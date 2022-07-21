//importing module from express
import express from "express";
//importing module from cors
import cors from "cors";
//setting the express function to app
const app = express();
// telling the api to use cors() as middleware
app.use(cors());
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
  },
  234567: {
    destination: "Big Ben",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
};
//Read(GET) request to respond witht he obj of the db
app.get("/destination", (req, res) => {
  res.send(destinationsDB);
});

//Create(POST)

//Update(PUT)

//Delete(DELETE)
