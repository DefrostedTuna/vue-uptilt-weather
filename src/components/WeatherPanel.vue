<template>
<div class="weather-panel">
  <!-- Currently -->
  <h4>{{ formattedAddress }}</h4>
  <div class="current-temperature--wrapper">
    <span class="current-temperature">{{ Math.floor(weather.currently.temperature) + deg }}</span>
    <skycon :condition="weather.currently.icon" :width="100" :height="100"/>
  </div>
  <p class="current-summary">{{ weather.currently.summary }}</p>
  <p class="current-wind">Wind: {{ windDirection(weather.currently.windBearing) }}, {{ Math.floor(weather.currently.windSpeed) }}mph</p>

  <!-- Forecast -->
  <div class="daily-forecast--wrapper">
    <!-- Current Day -->
    <div class="daily-forecast">
      <h5 class="daily-forecast__day">Today</h5>
      <div class="daily-forecast__skycon--wrapper">
        <skycon :condition="weather.daily.data[0].icon" :width="50" :height="50"/>
      </div>
      <span class="daily-forecast__temperature--low">L: {{ Math.floor(weather.daily.data[0].temperatureMin) + deg }}</span>
      <span class="daily-forecast__temperature--high">H: {{ Math.floor(weather.daily.data[0].temperatureMax) + deg }}</span>
    </div>
    <!-- Projected Week -->
    <div v-for="(item, index) in sevenDayForecast" class="daily-forecast" :key="index">
      <h5 class="daily-forecast__day">{{ getReadableDay(item.time) }}</h5>
      <div class="daily-forecast__skycon--wrapper">
        <skycon :condition="item.icon" :width="50" :height="50"/>
      </div>
      <span class="daily-forecast__temperature--low">L: {{ Math.floor(item.temperatureMin) + deg }}</span>
      <span class="daily-forecast__temperature--high">H: {{ Math.floor(item.temperatureMax) + deg }}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'formatted-address',
    'weather'
  ],

  computed: {
    deg() {
      // For some reason, Vue doesn't like this being inline...
      return String.fromCharCode('176');
    },
    sevenDayForecast() {
      let short_array = this.weather.daily.data;
      short_array.shift();

      return short_array;
    }
  },

  methods: {
    windDirection(bearing) {
      var windDirections = {
        0: 'North',
        1: 'North East',
        2: 'East',
        3: 'South East',
        4: 'South',
        5: 'South West',
        6: 'West',
        7: 'North West',
        8: 'North'
      };
      let quad = Math.floor(Math.floor(bearing) / 40);

      return windDirections[quad];
    },
    getReadableDay(timestamp) {
      let date = new Date(timestamp * 1000);

      return date.toString().split(' ')[0];
    }
  }
}
</script>