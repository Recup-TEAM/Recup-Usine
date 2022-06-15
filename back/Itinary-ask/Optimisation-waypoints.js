// But du programme : créer le trajet le plus optimiser
// Comment : on calcul la distance entre l'origine et tout les points
// on se place à au point le plus proche puis on recalcul la distance avec les points restants
// on se place au plus proche et ainsi de suite.

var origins = "ISEN Lille, Lille";

var waypoint1 = "20 rue Claude Debussy, 59780, Baisieux";
var waypoint2 = "Lille Grand palais, Lille";
var waypoint3 = "Zoo de Lille, Lille";
var waypoint4 = "267 Rue de l'echoppette, 62400, Locon";
var waypoint5 = "Gare Lille Flandres, Lille";

var listWaypoints = [waypoint1, waypoint2, waypoint3, waypoint4, waypoint5];

var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = 'Greenwich, England';
var destinationA = 'Stockholm, Sweden';
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: google.maps.TravelMode.DRIVING, 
    unitSystem:  google.maps.UnitSystem.METRIC,
  }, callback);

function callback(response, status) {
  // See Parsing the Results for
  // the basics of a callback function.
}
