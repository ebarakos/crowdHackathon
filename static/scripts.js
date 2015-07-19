// jshint devel:true


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {

  var stance1 = new google.maps.LatLng(-25.363882,131.044922);
  var stance2 = new google.maps.LatLng(-25.363882,131.044922);
  var stance3 = new google.maps.LatLng(-25.363882,131.044922);

  directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
    center: new google.maps.LatLng(37.980, 23.712),
    zoom: 10,
    mapType: 'roadmap'
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);

  var marker1 = new google.maps.Marker({
      position: stance1,
      map: map,
      // title: 'Hello World!'
  });

  // var marker2 = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map,
  //     title: 'Hello World!'
  // });

  // var marker3 = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map,
  //     title: 'Hello World!'
  // });


  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input-1'));


  var origin = (document.getElementById('origin'));
  var destination = (document.getElementById('destination'));;

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });





  console.log('loaded');




  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete();
    });
  }
}

function calcRoute(e) {
  // e.preventDefault();
  console.log(e);

  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.TRANSIT
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}


$('form').submit(function(e){
  e.preventDefault();
  console.log(e);
});

google.maps.event.addDomListener(window, 'load', initialize);



    $(document).ready(function() {
      $.ajax({
        url: "http://172.16.177.201:5000/api/v1.0/route/names"
      }).then(function(data) {
       $('.name').append(data.id);
       $('.name').append(data.route_short_name);
       // $('.greeting-content').append(data.content);
     });
    });