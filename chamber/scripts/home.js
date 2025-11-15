// === Your API Key ===
const apiKey = "6c90a14d67b81dbbfef6e755e5f8f890";

// === Bulawayo Coordinates ===
const lat = -20.06;
const lon = 28.52;

// === Fetch Weather Data ===
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // ---- CURRENT WEATHER ----
    const current = data.list[0];
    const description = current.weather[0].description;
    const temp = Math.round(current.main.temp);

    document.getElementById("current-weather").innerHTML = `
      <p><strong>${description.toUpperCase()}</strong></p>
      <p>${temp}°C</p>
    `;

    // ---- 3-DAY FORECAST ----
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    // OpenWeather gives data every 3 hours → 8 entries per day
    const indices = [8, 16, 24]; // roughly next 3 days

    indices.forEach(i => {
      const day = data.list[i];
      const dayTemp = Math.round(day.main.temp);
      const dayDesc = day.weather[0].description;
      const date = new Date(day.dt_txt).toLocaleDateString();

      forecastDiv.innerHTML += `
        <p><strong>${date}</strong>: ${dayTemp}°C, ${dayDesc}</p>
      `;
    });

  } catch (err) {
    console.error("Weather fetch error:", err);
    document.getElementById("current-weather").innerHTML =
      "<p>Weather data unavailable.</p>";
  }
}

// === Load Spotlight Members ===
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const goldSilver = members.filter(
      m => m.membershipLevel === 2 || m.membershipLevel === 3
    );

    const spotlights = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";

    spotlights.forEach(member => {
      const card = document.createElement("section");
      card.classList.add("member-card");

      // Add membership level class for CSS styling
      card.classList.add(`member-level-${member.membershipLevel}`);

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership: ${member.membershipLevel === 3 ? "Gold" : "Silver"}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Spotlight error:", err);
  }
}

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Make sure the class matches your CSS (base.css uses .active)
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// === Initialize page ===
getWeather();
loadSpotlights();
