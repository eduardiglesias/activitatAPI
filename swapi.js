const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "aef9c398358a5ed79ee96e6aae1afcf4";
const lat = "";
const cityInput = document.getElementById("cityInput").value;


const url = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`;

const city = "Torelló";
const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getSwapiData() {
  const res = await fetch(`${apiURL}`);
  const data = await res.json();
  return data;
}

function filterAndModifyData(data) {
  // Filtrar ciutats amb temperatura superior a 25°C
  const filteredData = data.main.temp > 10;

  // Modificar les dades: convertir temperatura de Kelvin a Celsius
  const modifiedData = {
    city: data.name,
    temperature: data.main.temp - 273.15, // Convertir de Kelvin a Celsius
    description: data.weather[0].description,
    // Afegir-ne més modificacions segons necessitat
  };

  return modifiedData;
}

function getWeatherData() {
  // Obtenir la clau d'accés de l'usuari (registra't a OpenWeatherMap per obtenir una)
  const apiKey = "aef9c398358a5ed79ee96e6aae1afcf4";
  const cityInput = document.getElementById("cityInput").value;
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherResultDiv = document.getElementById("weatherResult");
      weatherResultDiv.innerHTML = "";

      const cityName = data.name;
      const temperature = data.main.temp - 273.15;
      const description = data.weather[0].description;

      const resultString = `<p>City: ${cityName}</p>
                            <p>Temperature: ${temperature} °C</p>
                            <p>Description: ${description}</p>`;

      weatherResultDiv.innerHTML = resultString;
    })
    .catch((error) => {
      console.error("Error en obtenir les dades meteorològiques:", error);
      const weatherResultDiv = document.getElementById("weatherResult");
      weatherResultDiv.innerHTML =
        "<p>Error en obtenir les dades meteorològiques. Comprova la consola per més detalls.</p>";
    });
}
const localAPI = "http://localhost:3001"; // Canviar si és necessari

async function getSwapiData2(cityId) {
  const apiUrl = cityId ? `${localAPI}/cities/${cityId}` : `${localAPI}/cities`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}


async function addCity(cityData) {
  const res = await fetch(`${localAPI}/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cityData),
  });
  return res.json();
}

async function updateCity(cityId, cityData) {
  try {
    const res = await fetch(`${localAPI}/cities/${cityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cityData),
    });
    console.log(res);  // Afegeix aquesta línia
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in updateCity:", error);
    throw error;
  }
}

async function deleteCity(cityId) {
  try {
    const res = await fetch(`${localAPI}/cities/${cityId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in deleteCity:", error);
    throw error;
  }
}



export { getSwapiData, getSwapiData2, getWeatherData, filterAndModifyData, addCity, updateCity, deleteCity };
