
module.exports = function(query) {

    return {
        /***************
         * Entreprise  *
         ***************/

        /* GET */
        // Get all entreprise
        getAllEntreprises: async () => {
            let sql = "SELECT * FROM entreprise";
            var rq = await query(sql);
            resultArray = Object.values(JSON.parse(JSON.stringify(rq)))
            return rq;
        },

        // Get entreprise by id (TODO : test)
        getEntrepriseById: async (id) => {
            let sql = "SELECT * FROM entreprise WHERE id='" + id + "'";
            var rq = await query(sql);
            return rq;
        },

        // Get all entreprise by user (TODO : test)
        getAllEntreprisesByUser: async (userId) => {
            let sql = "SELECT * FROM entreprise WHERE id_user='" + userId + "'";
            var rq = await query(sql);
            return rq;
        },

       

        /* POST */
        // Ajouter une entreprise
        addEntreprise: async (dataEntreprise) => {
            let sql = "INSERT INTO `entreprise` (`id_entreprise`, `name`, `id_dirigeant`, `adresse`)" +
                        "VALUES (NULL, '" + dataEntreprise.name + "', '" + dataEntreprise.id_dirigeant + "', '" + dataEntreprise.adresse + "');"
            var rq = await query(sql);
            return rq;
        },
        
    }
};