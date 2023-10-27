import express from "express";
import bcrypt from "bcrypt"
import User from "../../../database/models/User"
import UTILS from "../../../utils"
import Logger from "../../../logger"

export default {
    name: "/user/auth/register",
    description: "Register a new user",
    method: "POST",
    run: async (req: express.Request, res: express.Response) => {
        try {
            // Get the username and password from the request body
            const username = req.body.username;
            const password = req.body.password;

            // if username or password badly formatted
            if(!username || !password) throw "Badly formatted"

            // check if the user exists
            const user = await User.findOne({username: username})

            // check if the user exists
            if(user) throw "An error occured"

            // create the user
            const newUser = await User.create({
                username: username,
                password: await bcrypt.hash(password, 10),

                user_id: username,
                token: UTILS.GENERATE.USER.default.TOKEN,
            })

            Logger.info(`User ${newUser.username} has been created !`)

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