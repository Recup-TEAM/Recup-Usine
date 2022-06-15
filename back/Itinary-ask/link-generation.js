// But de la fonction : générer le lien d'un itinéraire maps à partir d'une liste de waypoints

// Forme du lien :
// https://www.google.com/maps/dir/?api=1&origin=Paris%2CFrance&destination=Cherbourg%2CFrance&travelmode=driving&
// waypoints=Adresse-1%2CPays-1%7CAdresse-2%2CCPays-2

var Stop1 = "89 Cours de Vincennes 75020 Paris";
var Stop2 = "11 Rue d'Ateuil 75016 Paris";
var Stop3 = "IUT Paris-14, avenue de Versailles 75016 Paris";
var Stop4 = "11 Rue Pierre et Marie Curie 75005 Paris";
var listWaypoints = [Stop1, Stop2, Stop3];

function createUrl(listWaypoints) {
    url = "https://www.google.com/maps/dir/?api=1&origin=Paris+gare+du+nord%2CFrance&destination=Paris+gare+du+nord%2CFrance&travelmode=driving&waypoints="
    console.log(listWaypoints.length); 
    for(i=0; i<listWaypoints.length; i++) {
        url += listWaypoints[i].replaceAll(" ","+");
        url += "%2CFrance%7C";
        console.log(url);
    } 
    url = url.slice(0, -3);
    return url
    }

console.log(createUrl(listWaypoints));
