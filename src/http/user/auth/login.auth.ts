import express from "express";
import bcrypt from "bcrypt"
import User from "../../../database/models/User"
import Logger from "../../../logger"

export default {
    name: "/user/auth/login",
    description: "Login a user",
    method: "POST",
    run: async (req: express.Request, res: express.Response) => {
        try {
            // Get the username and password from the request body
            const username = req.body.username;
            const password = req.body.password;

            // if username or password badly formatted
            if(!username || !password) throw "Badly formatted"

            // get the user
            const user = await User.findOne({username: username})

            // check if the user exists
            if(!user) throw "An error occured"

            // check if the password is correct
            if(!await bcrypt.compare(password, user.password)) throw "Invalid password"

            Logger.info(`User ${user.username} has been logged in !`)
            
            // send the user
            res.status(200)
            res.send(user)
        }

        catch(err) {
            res.status(400)
            res.send("An error occured");
        }
    }
}