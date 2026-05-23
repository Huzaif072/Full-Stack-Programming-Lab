const express = require("express");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Lab 13 API is running",
    endpoints: {
      weather: "/api/weather/:city",
      news: "/api/news/:country"
    }
  });
});

const WEATHER_CODE_MAP = {
  1000: "clear",
  1100: "mostly clear",
  1101: "partly cloudy",
  1102: "mostly cloudy",
  1001: "cloudy",
  2000: "fog",
  2100: "light fog",
  4000: "drizzle",
  4001: "rain",
  4200: "light rain",
  4201: "heavy rain",
  5000: "snow",
  5001: "flurries",
  5100: "light snow",
  5101: "heavy snow",
  6000: "freezing drizzle",
  6001: "freezing rain",
  6200: "light freezing rain",
  6201: "heavy freezing rain",
  7000: "ice pellets",
  7101: "heavy ice pellets",
  7102: "light ice pellets",
  8000: "thunderstorm"
};

const getConditionFromCode = (code) => {
  if (typeof code !== "number") {
    return "unknown";
  }

  return WEATHER_CODE_MAP[code] || "unknown";
};

app.get("/api/weather/:city", async (req, res) => {
  const city = (req.params.city || "").trim();

  if (!city) {
    return res.status(400).json({ error: "City name is required." });
  }

  if (!process.env.WEATHER_API_KEY) {
    return res.status(500).json({ error: "Missing WEATHER_API_KEY." });
  }

  try {
    const response = await axios.get(
      "https://api.tomorrow.io/v4/weather/realtime",
      {
        params: {
          location: city,
          apikey: process.env.WEATHER_API_KEY,
          units: "metric"
        },
        timeout: 10000
      }
    );

    const payload = response.data || {};
    const values = payload.data ? payload.data.values : null;
    const locationName =
      payload.location && payload.location.name
        ? payload.location.name
        : city;

    res.json({
      city: locationName,
      temperature: values ? values.temperature : null,
      condition: values ? getConditionFromCode(values.weatherCode) : "unknown",
      humidity: values ? values.humidity : null
    });
  } catch (error) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      return res.status(404).json({ error: "City not found." });
    }

    if (error.response) {
      const message =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to fetch weather data.";

      const status = error.response.status >= 500 ? 502 : error.response.status;
      return res.status(status).json({ error: message });
    }

    res.status(502).json({ error: "Failed to fetch weather data." });
  }
});

app.get("/api/news/:country", async (req, res) => {
  const country = (req.params.country || "").trim().toLowerCase();

  if (!/^[a-z]{2}$/.test(country)) {
    return res
      .status(400)
      .json({ error: "Country code must be a 2-letter ISO code." });
  }

  if (!process.env.NEWS_API_KEY) {
    return res.status(500).json({ error: "Missing NEWS_API_KEY." });
  }

  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country,
          apiKey: process.env.NEWS_API_KEY,
          pageSize: 10
        },
        timeout: 10000
      }
    );

    const articles = Array.isArray(response.data.articles)
      ? response.data.articles
      : [];

    const items = articles.slice(0, 10).map((article) => ({
      title: article.title,
      source: article.source && article.source.name ? article.source.name : "Unknown",
      url: article.url,
      publishedAt: article.publishedAt
    }));

    res.json({
      country,
      totalResults: items.length,
      articles: items
    });
  } catch (error) {
    if (error.response) {
      const message =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : "News API error.";

      const status = error.response.status === 401 || error.response.status === 429
        ? error.response.status
        : 502;

      return res.status(status).json({ error: message });
    }

    res.status(502).json({ error: "Failed to fetch news data." });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
