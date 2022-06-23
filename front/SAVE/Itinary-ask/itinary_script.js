const db_query = require("../db_config")().db_query;

module.exports = function () {
    async function getWaypointList(){
        let sql = "SELECT * FROM `entreprise` WHERE `need_collect`= 1 OR `trash_quantity`>70";
        rq = await db_query(sql);
        if (rq.length == 0){
            return false;
        }
        else{
            return rq;
        }
    }

    async function makeItinary(){
        let myPosition = "ISEN Lille, Lille";

        console.log(await getWaypointList());
    }

    return{
        makeItinary: async() => await makeItinary(),
    }
};