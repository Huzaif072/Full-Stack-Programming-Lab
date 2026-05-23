# Lab 13 - RESTful APIs (Weather and News)

## Setup
1. Install dependencies:
   npm install
2. Create a .env file based on .env.example and add your API keys (Tomorrow.io + NewsAPI).
3. Start the server:
   npm run dev

## Endpoints
- GET /api/weather/:city (Tomorrow.io)
  Returns city name, temperature, condition, and humidity.

- GET /api/news/:country
  Returns top headlines for a 2-letter country code.

## Example Requests
- http://localhost:3000/api/weather/Lahore
- http://localhost:3000/api/news/us
