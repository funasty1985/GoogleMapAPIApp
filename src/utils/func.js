
function getRestaurants(location,radius,map,f) {
    var pyrmont = new google.maps.LatLng(location.lat,location.long);
    var request = {
        location: pyrmont,
        radius: radius,
        type:['restaurant']
    };
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,(results,status)=> status == google.maps.places.PlacesServiceStatus.OK && f({list:results,location:location,map:map}));
 }

 //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
 function calcCrow(lat1, lon1, lat2, lon2) 
 {
   var R = 6371; // km
   var dLat = toRad(lat2-lat1);
   var dLon = toRad(lon2-lon1);
   var lat1 = toRad(lat1);
   var lat2 = toRad(lat2);

   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   var d = R * c;
   return d;
 }

 // Converts numeric degrees to radians
 function toRad(Value) 
 {
     return Value * Math.PI / 180;
 }

 function getRadius(map){
    var bounds = map.getBounds();
    console.log('getRadius tell us the bounds is ',bounds)
    var center = map.getCenter();
    if (bounds && center) {
    var ne = bounds.getNorthEast();
    // Calculate radius (in meter).
    var radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
    console.log('getRadius tell us the radius is',radius);
    }
    return Math.round(radius).toString()
}


 export {getRestaurants,calcCrow,getRadius}

