<template>
    <div
      class="google-map"
      id="googleMap"
    >
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import { mapMutations } from 'vuex' ;
// {} is necessary if we are importing a function
import {getRestaurants,getRadius} from '@/utils/func';

export default {
  data() {
    return {
      google: null,
      map: null,
      location:{}
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ['places','geometry'],
      apiKey: "AIzaSyCIMk1yUw3YRRn6u4qO7h0kAHCs1RHzJCA"
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods:{
    ...mapMutations([
        'setResturantsList'
    ]),
    initializeMap() {
      navigator.geolocation.getCurrentPosition(pos=>{
		this.location.lat = pos.coords.latitude;
        this.location.long = pos.coords.longitude;
		this.map = new this.google.maps.Map(document.getElementById('googleMap'),{
			center:{lat:this.location.lat, lng:this.location.long},
			zoom:15
        });
		getRestaurants(this.location, "500", this.map, this.setResturantsList);
     })
    // setMap(this.location,this.map,15,"2500",this.setResturantsList)
    }
  }
};

</script>

<style scoped>
.google-map {
  width: 100%;
  height: 800px;
}
</style>