import axios from "axios";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});

const URL = "https://api.kanye.rest";
app.get("/quotes", async (req, res) => {
  try {
    const response = await axios(URL);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

// app.get("/", (req, res) => {
//   res.send("Hello Kyle");
// });
