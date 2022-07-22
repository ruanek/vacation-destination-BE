export function validateIt(req, res, next) {
  const { destination, location } = req.body;

  if (
    !isValidateRequiredField(location) ||
    !isValidateRequiredField(destination)
  ) {
    return res
      .status(400)
      .send({
        error:
          "Location and destination are BOTH reqired and have to be valid text",
      });
  }

  next();
}

export function isValidateRequiredField(field) {
  if (!field || typeof field !== "string") {
    return false;
  }
  return true;
}
