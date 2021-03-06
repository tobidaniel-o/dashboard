fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => response.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(../defaultBackImage.jpeg)`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;

    document.getElementById("crypto").innerHTML += `
            <p>π―: $${data.market_data.current_price.usd}</p>
            <p>π: $${data.market_data.high_24h.usd}</p>
            <p>π: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => console.error(err));

setInterval(function getCurrentTime() {
  const date = new Date();

  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-US",
    {
      timeStyle: "short",
    }
  );
}, 1000);

// Fetching the weather information and geo-location coordinates
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric `
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p class="">${Math.round(data.main.temp)}ΒΊ</p>
        <p class="weather-city">${data.name}</p>
      `;
    })
    .catch((err) => console.error(err));
});
