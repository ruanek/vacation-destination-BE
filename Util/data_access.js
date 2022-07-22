import fetch from "node-fetch";

export async function getUnsplashPhoto({ destination, location }) {
  const URL = `https://api.unsplash.com/search/photos?client_id=zPyO6m0ezgkOS-Tc0Co64-y6MqTXCULFL-TcXfxBrLc&query=${destination} ${location}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    const allPhotos = data.results;
    const randIdx = Math.floor(Math.random() * allPhotos.length);
    const randPhoto = allPhotos[randIdx];
    return randPhoto.urls.thumb;
  } catch (error) {
    console.log(error);
  }
}
