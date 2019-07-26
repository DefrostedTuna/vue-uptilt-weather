# Uptilt Weather

Uptilt Weather is a simple and lightweight weather forecast and radar app. It uses Google Maps and a radar tileserver courtesy of [Iowa State University](https://mesonet.agron.iastate.edu) to provide a quick look at any incoming fronts. Alongside this is a seven day weather forecast provided by the [Dark Sky](https://darksky.net) weather API.

### [Check it out here](https://weather.uptilt.io)

## Development

There are two ways to run this application on a development machine. 

The first is to use Docker, a reverse proxy, and the accompanying `docker-compose` file. This is the preferred method when working with a complete Docker environment and will bind the application to the host name specified in the environment file (this is what the reverse proxy is for). If you are unsure how to set up the reverse proxy, check out [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy).

The second method is to simply use Vue's built-in development server. This is a great option to spin up the application to make a quick change or test something out without having to set up Docker or a reverse proxy. When using Vue's built-in development server, the application will simply be hosted at `http://localhost:8080` by default.

### Setting Things Up

Clone the repository

```
git clone git@github.com:DefrostedTuna/vue-uptilt-weather.git && cd vue-uptilt-weather
```

Install the dependencies

```
yarn install
```

Copy the `.env.example` and set the API keys

```
cp .env.example .env
```


#### Using Docker

Spin up the container with `docker-compose`

```
docker-compose up
```

**Note**: Make sure that the desired hostname is present in `hosts`.

#### Using Vue

Start the development server

```
yarn serve
```