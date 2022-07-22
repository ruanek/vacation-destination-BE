export function validateIt(req, res, next) {
  const { destination, location } = req.body;

  if (!destination || !location) {
    return res.status(400).send({ error: "Destination and Location Required" });
  }

  if (typeof destination !== "string" || typeof location !== "string") {
    return res
      .status(400)
      .send({ error: "Destination and Location have to be valid text" });
  }
  next();
}
