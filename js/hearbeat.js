var crime_report;
var heartbeaturl =  'https://safe-city-backend-test.herokuapp.com/curPosition/heartbeat';

var protectedUrl = 'https://safe-city-backend-test.herokuapp.com/liveTracking/';
var long ,lat;
getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    //x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
    long = position.coords.longitude;
    lat = position.coords.latitude;
    console.log(position.coords.longitude+" "+position.coords.latitude);
}
function share_heartbeat()
{
    
/// every 2 sec heartbeat
window.setInterval(function() {
    console.log("Sending the message now  :P");
    let response = fetch(heartbeaturl , {
    method: 'POST',
    body: JSON.stringify({
        "long":  19.015659 ,
        "lat": 72.861394
    }),
    // mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtZXlAeHl6LmNvbSIsInVzZXJJZCI6IjVlMjFlMzUwMjg2NjQxM2JmOGNiYzhhOSIsImlhdCI6MTU3OTI3OTIyOSwiZXhwIjoxNTc5NzExMjI5fQ.77qZG8FujawQ0IbQaQIpv_k_z2PRgzAxg3BYCNMUfgE"
    }
    }).then(function(res){
    res.json().then(function(resData){
        console.log(resData);
        
    });
    console.log("res: ", res);
    }).catch(function(err){
    console.log("err: ", err);
    });

}, 2000);

}