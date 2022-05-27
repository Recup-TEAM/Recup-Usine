function checkUserConnected(req, res) {
    if (!req.session.email) {
        res.json({"err": "Vous n'êtes pas connecté !", "code": 0});
        return false
    }
    else {
        return true
    }

}
module.exports =  () => {
    return {
        //function check if user connected
        checkUserConnected(req, res) {
            return checkUserConnected(req, res)
            
        },

        //function check if user is admin
        checkUserAdmin(req, res) {
            //check if user is connected
            if (!checkUserConnected(req, res)) {
                return false
            }
            if (req.session.compteLevel!=0) {
                res.json({"err": "Vous n'êtes pas administrateur !", "code": 0});
                return false
            }
            else {
                return true
            }
        }
    }

}