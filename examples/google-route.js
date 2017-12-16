'user strict'

var my = {
  markers: [],
  directionsRenderer: null,
  directionsService: null
}

var initMap = () => {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.85, lng: -87.65},
    zoom: 7,
    mapTypeControl: false
  });

  my.directionsRenderer = new google.maps.DirectionsRenderer({map: map});
  my.directionsService = new google.maps.DirectionsService();
  
  listenMapEvents(map);
}

function listenMapEvents(map) {
  var from = map.center;
  my.markers.push( placeMarker(map.center, map) );

  map.addListener('click', (e) => {
    my.markers.push( placeMarker(e.latLng, map) );
    drawRoute(from, e.latLng, map);
    from = e.latLng;
  });
}

function placeMarker(position, map) {
  return new google.maps.Marker({
    position: position,
    map: map
  });
}

function drawRoute(from, to, map) {
  my.directionsService.route({
    origin: from,
    destination: to,
    travelMode: "WALKING"

  }, (res, status) => {
    if(status == 'OK') {
      my.directionsRenderer.setDirections(res);
      my.markers.forEach(marker => marker.setMap(null));
    }
  });
}
