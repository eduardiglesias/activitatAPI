import {
  getSwapiData,
  getSwapiData2,
  getWeatherData,
  filterAndModifyData,
  addCity,
  updateCity,
  deleteCity,
} from "./swapi.js";

async function main() {
  try {
    const data = await getSwapiData();
    console.log(data);

    const modifiedData = filterAndModifyData(data);
    console.log(modifiedData);

    // Llegir ciutats
    const cities = await getSwapiData2();
    console.log("Cities:", cities);

    // // Afegir nova ciutat
    //ESTÀ COMENTAT PERQUÈ NO SURT DEL BUCLE!!!
    // const newCity = {
    //   id: "5",
    //   name: "Sant Vicenç De Torelló",
    //   temperature: 24,
    //   description: "Cloudy",
    // };
    // const addedCity = await addCity(newCity);
    // console.log("Added City:", addedCity);

    // // Actualitzar ciutat
    //ESTÀ COMENTAT PERQUÈ NO SURT DEL BUCLE!!!
    // const updatedCity = await updateCity(1, { id: 1, name: "Barcelona", temperature: 27, description: "Sunny" });
    // console.log("Updated City:", updatedCity);

    // // Eliminar ciutat
    //ESTÀ COMENTAT PERQUÈ NO SURT DEL BUCLE!!!
    // const deletedCity = await deleteCity(4);
    // console.log("Deleted City:", deletedCity);
  } catch (error) {
    console.error(error);
  }
}

// Execute the main function when the page loads
main();

// Add an event listener to the button
const weatherButton = document.getElementById("weatherButton");
weatherButton.addEventListener("click", async () => {
  try {
    // Call the getWeatherData function when the button is clicked
    await getWeatherData();
  } catch (error) {
    console.error(error);
  }
});
