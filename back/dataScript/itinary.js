const db_query = require("./../db_config")().db_query;

module.exports = function () {
  const googleMapsClient = require("@google/maps").createClient({
    key: "AIzaSyDpzJoNtwfXIrCvgXPcGEIz9eiI5NhVJrs",
  });

  async function getArrayOfWaypoints() {
    let sql =
      "SELECT `adresse` FROM `entreprise` WHERE `need_collect`=1 OR `trash_quantity`>70";
    var rq = await db_query(sql);
    resultArray = Object.values(JSON.parse(JSON.stringify(rq)));
    // to ["93 Rue Félix Faure, 59110 La Madeleine",..]
    let arrayOfWaypoints = [];
    for (let i = 0; i < resultArray.length; i++) {
      arrayOfWaypoints.push(resultArray[i].adresse);
    }
    return arrayOfWaypoints;
  }

  function storeDataToDb(waypoint_order, url, totalDistance, totalDuration) {
    // totalDuration in second to 3h34
    totalDurationInHourMinuteSecond = secondsToDhms(totalDuration);

    let sql =
      "INSERT INTO `itinary` (`id_itinary`, `id_collector`, `list_waypoints`, `map_link`, `duration`, `distance`)" +
      "VALUES (NULL, '9', '" +
      waypoint_order.split("'").join(" ")+
      "', '" +
      url +
      "', '" +
      totalDurationInHourMinuteSecond +
      "', '" +
      totalDistance +
      "')";
      console.log(sql);
    db_query(sql);
  }

  function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? "h" : "h") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "m" : "m") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  function createUrl(listWaypoints) {
    url =
      "https://www.google.com/maps/dir/?api=1&origin=ISEN+Lille%2CFrance&destination=ISEN+Lille%2CFrance&travelmode=driving&waypoints=";

    for (var i = 0; i < listWaypoints.length; i++) {
      point = listWaypoints[i];
      url += point.split("'").join(" ").split(" ").join("+");
      url += "%2CFrance%7C";
    }
    url = url.slice(0, -3);
    return url;
  }

  async function calcRoute() {
    waypoints = await getArrayOfWaypoints();

    var directionsRoute = {
      origin: "ISEN Lille, Lille",
      destination: "ISEN Lille, Lille",
      waypoints: waypoints,
      optimize: true,
    };

    await googleMapsClient.directions(
      directionsRoute,
      function (err, response) {
        if (err) {
          console.log(err);
        } else {
          // get total distance and duration from response.json.routes[0].legs object
          var totalDistance = 0;
          var totalDuration = 0;
          response.json.routes[0].legs.forEach(function (leg) {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
          });
          var waypoint_order = response.json.routes[0].waypoint_order;
          waypoint_sort = [];
          for (var i = 0; i < waypoint_order.length; i++) {
            waypoint_sort.push(waypoints[waypoint_order[i]]);
          }
          url = createUrl(waypoint_sort);
          //join waypoint_sort to string by ,
          waypoint_order = waypoint_sort.join(",");

          storeDataToDb(waypoint_order, url, totalDistance, totalDuration);
        }
      }
    );
  }

  return {
    makeItinary: async () => {
      await calcRoute();
    },
  };
};
