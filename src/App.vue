<template>
  <div id="app">
    <h1>Map Test</h1>
    <b-container class="bv-example-row" fluid>
      <b-row>
          <b-col><Resturants/></b-col>
          <b-col cols="10"	><MapLoader/></b-col>
       </b-row>
    </b-container>
  </div>
</template>

<script>
import MapLoader from './components/MapLoader.vue'
import Resturants from './components/Resturants.vue'

export default {
  name: 'app',
  components: {
    MapLoader,
    Resturants
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width:100%;
}
b-container {
  width:100%;
}
</style>
