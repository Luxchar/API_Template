import express from "express";
import User from "../../../database/models/User"
import Logger from "../../../logger"

export default {
    name: "/user/auth/connect",
    description: "Connect a user",
    method: "POST",
    run: async (req: express.Request, res: express.Response) => {
        try {
            // Get the token from the request header
            const token = req.headers["authorization"]; // the token is in the authorization header
            // const token = req.body.token; // the token is in the request body

            // if token or user_id badly formatted
            if(!token) throw "Badly formatted"

            var user = await User.findOne({token: token})
            if(user) { // if user token is valid
                Logger.info(`User ${user.username} has been logged in !`)
                res.status(200)
                res.send(user)
            }
            throw "An error occured"
        }
        
        catch(err) {
            res.status(400)
            res.send("An error occured");
        }
    }
}