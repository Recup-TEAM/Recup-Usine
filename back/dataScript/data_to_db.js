fs = require("fs");
const db_query = require("../db_config")().db_query;

module.exports = function () {
  /*
for all product in data_falls.json 
check if name entreprise in database in /back/db_config.js
if not add new entreprise and get the id then add product with this id
else get the id of the entreprise, check if product already exist with name
    if not add the product
    else update quantity

*/
  // function to check if entreprise already exist in database
  async function check_entreprise(name) {
    let sql = "SELECT * FROM entreprise WHERE name = '" + name + "'";
    rq = await db_query(sql);
    if (rq.length == 0) {
      return false;
    } else {
      return rq[0].id_entreprise;
    }
  }

  // function to check if product already exist in database
  async function check_product(name, id_entreprise, material, state, dimensions) {
    let sql =
      "SELECT * FROM product WHERE name = '" +
      name +
      "' AND id_entreprise = " +
      id_entreprise +
      " AND material = '" +
      material +
      "' AND state = '" +
      state +
      "' AND dimensions = '" +
      dimensions +
      "'";
    rq = await db_query(sql);
    if (rq.length == 0) {
      return false;
    } else {
      return rq[0].id_product;
    }
  }

  // function to add new entreprise
  async function add_entreprise(name) {
    let sql = "INSERT INTO entreprise (name) VALUES ('" + name + "')";
    rq = await db_query(sql);
    return rq.insertId;
  }

  // function to add new product
  async function add_product(name, id_entreprise, quantity, state, material, dimensions) {
    //INSERT INTO `product` (`id_product`, `id_entreprise`, `quantity`, `state`, `material`, `dimensions`, `name`) VALUES (NULL, '2', '234', 'good', 'metal', '14x1324x123', 'truc');
    let sql =
      "INSERT INTO product (id_entreprise, quantity, state, material, dimensions, name) VALUES (" +
      id_entreprise +
      ", " +
      quantity +
      ", '" +
      state +
      "', '" +
      material +
      "', '" +
      dimensions +
      "', '" +
      name +
      "')";
    rq = await db_query(sql);
    return rq.insertId;
  }

  // function to update product
  async function update_product(id_product, quantity) {
    let sql = "UPDATE product SET quantity = " + quantity + " WHERE id_product = " + id_product;
    rq = await db_query(sql);
  }

  async function main() {
    console.log("Refresh data from file to database");
    // read file and do the main function
    fs.readFile("./back/dataScript/data_falls.json", "utf8", async function (err, data) {
      // check if  entreprise already exist in database
      let entreprises = JSON.parse(data);
      for (let i = 0; i < entreprises.length; i++) {
        let id_entreprise = await check_entreprise(entreprises[i].name);
        if (id_entreprise == false) {
          id_entreprise = await add_entreprise(entreprises[i].name);
        }
        // check if product already exist in database
        for (let j = 0; j < entreprises[i].falls.length; j++) {
          let id_product = await check_product(
            entreprises[i].falls[j].originalProduct,
            id_entreprise,
            entreprises[i].falls[j].material,
            entreprises[i].falls[j].state,
            entreprises[i].falls[j].dimensions
          );
          if (id_product == false) {
            id_product = await add_product(
              entreprises[i].falls[j].originalProduct,
              id_entreprise,
              entreprises[i].falls[j].quantity,
              entreprises[i].falls[j].state,
              entreprises[i].falls[j].material,
              entreprises[i].falls[j].dimensions
            );
          }
          // update product
          else {
            await update_product(id_product, entreprises[i].falls[j].quantity);
          }
        }
      }
    });
  }

  return {
    add_into_db: async () => await main(),
  };
};
