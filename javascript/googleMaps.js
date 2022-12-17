// Function for google maps
function Map() {
    // Variable that stores latitude and longitude
    var location = {
        lat: 59.260554083311135,
        lng: 11.107230400640757
    };
    // Variable for changing zoom level and where the center of the map view is
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: location
    });
    // Variable for where the marker on the map should be
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}