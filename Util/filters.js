function filterObj({ objToFilter: obj, filterValue }) {
  const filtered = {};

  for (const prop in obj) {
    if (obj[prop].location.toLowerCase() === filterValue.toLowerCase()) {
      filtered[prop] = obj[prop];
    }
  }
  return filtered;
}

export function filterDestinations({ city, destinationsDB, res }) {
  if (city !== undefined) {
    const filteredDest = filterObj({
      objToFilter: destinationsDB,
      filterValue: city,
    });
    return res.send(filteredDest);
  }
  return res.send(destinationsDB);
}
