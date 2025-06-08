const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Carrega variáveis de ambiente
dotenv.config({ path: '.env' });

const app = express();
const PORT = 3001;

// Adicione no topo do arquivo server.js
const NodeCache = require('node-cache');
const weatherCache = new NodeCache({ stdTTL: 600 }); // Cache de 10 minutos

// Modifique a rota /weather
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  
  // Validação básica
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Parâmetros lat e lon são obrigatórios' });
  }

  // Chave de cache baseada na localização
  const cacheKey = `${lat},${lon}`;
  const cachedData = weatherCache.get(cacheKey);
  
  if (cachedData) {
    console.log(`Retornando dados do cache para ${cacheKey}`);
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`,
      { timeout: 5000 }
    );

    const weatherData = {
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      wind: response.data.wind.speed,
      pressure: response.data.main.pressure
    };

    // Armazena no cache
    weatherCache.set(cacheKey, weatherData);
    
    res.json(weatherData);
  } catch (error) {
    console.error('Erro na API OpenWeather:', error.response?.data || error.message);
    
    let errorMessage = 'Erro ao buscar dados meteorológicos';
    if (error.response?.data?.message) {
      errorMessage += `: ${error.response.data.message}`;
    }
    
    res.status(500).json({ error: errorMessage });
  }
});


app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  

  if(!lat || !lon) {
    return res.status(400).json({ error: 'Parâmetros lat e lon são obrigatórios' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`,
      { timeout: 5000 }
    );

    const weatherData = {
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      wind: response.data.wind.speed,
      pressure: response.data.main.pressure
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Erro na API OpenWeather:', error.response?.data || error.message);
    

    let errorMessage = 'Erro ao buscar dados meteorológicos';
    if(error.response?.data?.message) {
      errorMessage += `: ${error.response.data.message}`;
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});