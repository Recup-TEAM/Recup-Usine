fs = require('fs');

module.exports = function (){
    function refreshDatabase() {
        let suppliers = [];
        let suppliersFileString = "", dailyProdFileString = "";
        fs.readFile('./back/dataScript/suppliers.txt', 'utf8', function (err,dataSuppliers) {
            if (err) {
                return console.log(err);
            }

            fs.readFile('./back/dataScript/data_daily_prod.txt', 'utf8', function (err,dataDailyProd) {
                if (err) {
                    return console.log(err);
                }
                suppliersFileString = dataSuppliers;
                dailyProdFileString = dataDailyProd;

                suppliersFileString = segmentStringFromFileSuppliers(suppliersFileString);
                dailyProdFileString = segmentStringFromFileDailyProd(dailyProdFileString);

                for (let i = 0; i < suppliersFileString.length; i++){
                    let supplier = convertStringInfosIntoObject(suppliersFileString[i], suppliers.length);
                    for (let j = 0; j < supplier.falls.length; j++){
                        supplier.falls[j].quantity = updateFallsQuantityFromDailyProd(supplier.falls[j], dailyProdFileString);
                    }
                    suppliers.push(supplier);
                }

                //convertSuppliersIntoJson(suppliers);

            });
        });

        return 0;
    }

    function segmentStringFromFileSuppliers(fileString){
        fileString = fileString.split('\\\\');
        return fileString;
    }

    function segmentStringFromFileDailyProd(fileString){
        fileString = fileString.split(/\r?\n/);
        for (let i = 0; i < fileString.length; i++){
            fileString[i] = fileString[i].split(' ');
        }
        return fileString;
    }

    function convertStringInfosIntoObject(string, id){
        string = string.split(/\r?\n/);

        for (let i = 0; i < string.length; i++){
            string[i] = string[i].split(': ');
        }

        for(let i = 0; i < string.length; i++){
            if (string[i][0] === '') {
                string.splice(i, 1);
            }
        }

        let supplier = {
            name: string[0][1],
            id: id,
            falls: string[1][1]
        }

        //Segment products String Into Objects
        supplier.falls = segmentStringIntoFallsObjects(supplier.falls);

        return supplier;
    }

    function segmentStringIntoFallsObjects(string){
        let allFalls = [];
        let tempString = string.split(", ");

        for (let i = 0; i < tempString.length; i++){
            tempString[i] = tempString[i].split('|');
            let tempObj = {
                originalProduct: tempString[i][0],
                material: tempString[i][1],
                dimensions: tempString[i][2],
                quantity: tempString[i][3],
                state: tempString[i][4]
            }
            allFalls.push(tempObj);
        }

        return allFalls;
    }

    function updateFallsQuantityFromDailyProd(fallObj, dailyProdTabString){
        let quantity = 0;

        //console.log(dailyProdTabString, fallObj);

        let originalQuantityInt = parseInt(fallObj.quantity);
        for (let i = 0; i < dailyProdTabString.length; i++){
            if (dailyProdTabString[i][0] === fallObj.originalProduct){
                quantity = originalQuantityInt * parseInt(dailyProdTabString[i][1]);
                break;
            }
        }

        return quantity;
    }

    function convertSuppliersIntoJson(suppliers){
        let jsonData = JSON.stringify(suppliers, null, 2);
        fs.writeFile('./back/dataScript/data_falls.json', jsonData, (err) => {
            if (err) throw err;
            console.log("Suppliers Data Written to file");
        });
    }

    return{
        loveData:setInterval(function () {refreshDatabase()}, 5*60*1000)
    }
}