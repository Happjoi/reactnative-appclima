# 🌦️ Backend do App de Clima

Este é o servidor que fornece dados meteorológicos para o aplicativo móvel, atuando como intermediário entre o app e a API do OpenWeatherMap.

## Pré-requisitos
- Node.js (v18+)
- npm (v9+)
- Chave da API OpenWeatherMap

## Configuração

1. Instale as dependências:

npm install
Crie o arquivo .env na raiz do projeto:

env
OPENWEATHER_API_KEY=sua_chave_aqui
Execute o servidor:


node server.js
Endpoints
GET /weather
Retorna dados meteorológicos para uma localização

Parâmetros:

lat: Latitude (obrigatório)

lon: Longitude (obrigatório)

Exemplo de resposta:

json
{
  "temp": 25,
  "feels_like": 26,
  "humidity": 65,
  "description": "céu limpo",
  "icon": "01d",
  "city": "São Paulo",
  "wind": 3.5,
  "pressure": 1012
}
Estrutura do Projeto
text
backend/
├── server.js          # Ponto de entrada do servidor
├── .env               # Variáveis de ambiente
├── package.json       # Dependências e scripts
└── node_modules/      # Dependências instaladas

Variáveis de Ambiente

OPENWEATHER_API_KEY	Chave da API OpenWeatherMap
PORT	Porta do servidor (padrão: 3001)
