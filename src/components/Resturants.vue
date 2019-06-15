<template>
    <div>
        <b-list-group>
                <b-list-group-item button v-on:click="zoomIn()" variant="info"> Zoom In </b-list-group-item>
                <b-list-group-item button v-on:click="zoomOut()" variant="info"> Zoom Out </b-list-group-item>
                <b-list-group-item button v-on:click="sortByRating()" variant="info"> SortByRating </b-list-group-item>
                <b-list-group-item button v-on:click="sortByDist()" variant="info"> SortByDist </b-list-group-item>
                <b-list-group-item button v-on:click="deleteMarkers()" variant="info"> Delete Marker </b-list-group-item>
                <b-list-group-item button v-on:click="Center()" variant="info"> Back To Position </b-list-group-item>
                <b-list-group-item 
                     class="flex-column align-items-start"
                     variant="light"
                     v-for='(resturant, index) in localResturantsList'
                    :key='index' 
                     button
                     v-on:click="showDetail(resturant)"
                >
                 <p>{{ resturant.name }}</p>
                 </b-list-group-item>
         </b-list-group>
    </div>     
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import {calcCrow,getRestaurants,getRadius} from '@/utils/func' ;

export default {
    name:"Resturants",
    computed:{
        ...mapState([
            'resturantsList',
            'map',
            'location'
        ])
    },
    data(){
        return {
            localResturantsList:[],
            markers:[]
        }
    },
    methods:{
        ...mapMutations([
            'setResturantsList'
        ]),
        showDetail(place){
            console.log('Lat :',place.geometry.location.lat())
 			let price = this.createPrice(place.price_level);
 			let content = ` 
 							<h4>${place.name}</h3>
 							<h6>${place.vicinity}</h4>
 							<h6>
 								Price: ${price} <br/>
 								Rating: ${place.rating}
                            </h6>`;
            console.log(content);

             var marker = new google.maps.Marker({
 				position: place.geometry.location,
 				map: this.map,
 				title: place.name
             });
             this.markers.push(marker);

             // create a infoWindow object
 			var infowindow = new google.maps.InfoWindow({
 				content: content
             });
             infowindow.open(this.map, marker);

             marker.addListener('click', function() {
										infowindow.setContent(content);
										infowindow.open(this.map, marker);
					  });


        },
        deleteMarkers(){
            for (var i=0; i<this.markers.length; i++){
                console.log(this.markers[i])
                this.markers[i].setMap(null);
            }
            this.markers=[];
        },
        createPrice(level){
            if(level != "" && level != null){
                let out = "";
                for (var x=0; x< level; x++){
                    out +="$";
                }
                return out;
            } else {
                return "?";
            }
        },
        sortByRating(){
            console.log('List before: ',this.localResturantsList);
            this.localResturantsList.sort((a,b)=>b.rating - a.rating);
            console.log('List After:', this.localResturantsList)
        },
        sortByDist(){
            this.localResturantsList = this.resturantsList.map(x=>{
                                                                x.dist = calcCrow(x.geometry.location.lat(), x.geometry.location.lng(), this.location.lat, this.location.long);
                                                                
                                                                return x
                                                              });
            this.localResturantsList.sort((a,b)=>a.dist-b.dist);
        },
        zoomIn(){
            var r = getRadius(this.map);
            let oldZoom = this.map.getZoom();
            let atferZoom = this.map.setZoom(oldZoom+1);
            r = getRadius(this.map);
            getRestaurants(this.location, r, this.map, this.setResturantsList)
        },
        zoomOut(){
            var r = getRadius(this.map);
            let oldZoom = this.map.getZoom();
            let atferZoom = this.map.setZoom(oldZoom-1);
            r = getRadius(this.map);
            getRestaurants(this.location, r, this.map, this.setResturantsList);
        },
        Center(){
            this.map.setCenter(new google.maps.LatLng(this.location.lat, this.location.long));
        }
    },
    watch:
        {resturantsList(){
        this.localResturantsList = [...this.resturantsList];
        var marker = new google.maps.Marker({
 				position: {lat: this.location.lat, lng: this.location.long},
 				map: this.map,
 				icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
             });
    }}
    
}
</script>

<style>

</style>
