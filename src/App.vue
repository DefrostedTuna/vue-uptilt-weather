<template>
<div id="app">
  <header>
    <nav>
      <div class="nav-wrapper blue">
        <form @submit.prevent="updateLocation()">
          <div class="input-field">
            <input id="search"
                   type="search"
                   v-model="location_search"
                   value="Louisville, KY"
                   required>
            <label class="label-icon" for="search"><i class="material-icons">location_on</i></label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  </header>
  <main>
    <div class="main-content">
      <div class="weather-panel--wrapper">
        <weather-panel v-if="weather" :weather="weather" :formatted-address="this.formatted_address"></weather-panel>
        <div v-if="!weather" class="loading-wrapper">
          <pulse-loader v-if="!weather" color="black"></pulse-loader>
        </div>
      </div>
      <div class="radar-panel--wrapper blue-grey lighten-2 map-column-wrapper">
        <div id="map"></div>
      </div>
    </div>
  </main>
  <footer class="page-footer blue-grey">
    <div class="footer-copyright">
      <div class="container center-align">
        <span>Crafted with &#x2764; by <a href="https://github.com/defrostedtuna" class="white-text">Rick Bennett</a></span>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
import axios from 'axios'
import initGoogleMaps from './core/GoogleMapsApi'
import PulseLoader from 'vue-spinner/src/PulseLoader'
import WeatherPanel from './components/WeatherPanel'

export default {
  name: 'app',
  components: {
    PulseLoader,
    WeatherPanel
  },

  data() {
    return {
      location_search: 'Louisville, KY',
      formatted_address: '',
      weather: null,
    }
  },

  methods: {
    updateLocation() {
      this.initMap();
      this.getWeatherForecast();

      document.getElementById('search').blur();
    },

    setup() {
      this.initMap();
      this.getWeatherForecast();
      
      setInterval(function() {
        this.initMap();
        this.getWeatherForecast();
      }.bind(this), (5 * 60) * 1000); // Every 5 minutes.
    },

    async getGoogleApi() {
      return await initGoogleMaps(appConfig.googleApiKey);
    },

    getGeocode(location) {
      return new Promise(async (resolve) => {
        let google = await this.getGoogleApi();
        let geocoder = new google.maps.Geocoder();
  
        geocoder.geocode({ address: location }, (results, status) => {
          if (status !== 'OK' || !results[0]) {
            throw new Error(status);
          }
  
          resolve(results[0]);
        });
      });
    },

    async initMap() {
      let geocode = await this.getGeocode(this.location_search);
      let google = await this.getGoogleApi();

      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: geocode.geometry.location.toJSON(),
        mapTypeId: google.maps.MapTypeId.HYBRID
      });

      new google.maps.Marker({
        position: geocode.geometry.location.toJSON(),
        map: map,
        title: 'You be hurr!'
      });

      let tileNEX = new google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            // We append (new Date()).getTime() to prevent browser caching of returned images.
            return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" +
                    zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime();
        },
        tileSize: new google.maps.Size(256, 256),
        opacity: 0.50,
        name : 'NEXRAD',
        isPng: true
      });

      map.overlayMapTypes.setAt("0", tileNEX);
    },

    async getWeatherForecast() {
      let geocode = await this.getGeocode(this.location_search);
      let location = geocode.geometry.location.toJSON();
      let url = `https://api.darksky.net/forecast/${appConfig.weatherApiKey}/${location.lat},${location.lng}`;
      
      this.formatted_address = geocode.formatted_address;
      
      axios.get(appConfig.corsProxy + url).then(response => {
        this.weather = response.data
      }).catch(errors => {
        Materialize.toast('Error fetching weather.', 5000)
        Materialize.toast(errors, 5000);
      });
    }
  },

  created() {
    this.setup();
  }
}
</script>