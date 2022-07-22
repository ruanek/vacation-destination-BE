//importing module from express
import express from "express";
import cors from "cors";
import { destRouter } from "./Routes/destinations.js";
//setting the express function to app
const app = express();
// telling the api to use cors() as middleware
app.use(cors());
app.use(express.json());

app.use("/destination", destRouter);

//allows heroku to port select
const PORT = process.env.PORT || 3000;
//allows a "deaf" api to listen to the selected port and logs that it is running
app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});
