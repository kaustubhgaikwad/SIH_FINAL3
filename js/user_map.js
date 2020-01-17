mapboxgl.accessToken = 'pk.eyJ1IjoiemFya21pbGVzIiwiYSI6ImNrNWRzeGJuOTBkcmozbG8zMHl0MGpvdjgifQ.lnOMpSFfT3sqUxp0UuWFhw';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11',
center: [-96, 37.8], // starting position
zoom: 3 // starting zoom
});
 
// Add geolocate control to the map.
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
);