function initMap() {
    const start_end = { lat: 50.6341809, lng: 3.0487116 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: start_end,
    });
    const marker = new google.maps.Marker({
      position: start_end,
      map: map,
    });
  }
  
  window.initMap = initMap;