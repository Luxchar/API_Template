import User from "../../../database/models/User"
import bcrypt from "bcrypt"
import UTILS from "../../../utils"
import Logger from "../../../logger"

export default {
    name: "register",
    description: "Register a new user",
    run: async (socket: any, data: any) => {
        if(!data) return socket.emit("register", "Please provide a username and a password")
        if(!data.username) return socket.emit("register", "Please provide a username")
        if(!data.password) return socket.emit("register", "Please provide a password")
        
        const asciiUsername = data.username

        const user = await User.findOne({username: asciiUsername})

        if(user) return socket.emit("register", "This username is already taken")

        const newUser = await User.create({
            username: asciiUsername,
            password: await bcrypt.hash(data.password, 10),
            user_id: asciiUsername,
            token: UTILS.GENERATE.USER.default.TOKEN,
        })

        socket.storage.logged = true
        socket.storage.user = newUser

        Logger.info(`User ${newUser.username} has been created !`)

        socket.emit("register", "Your account has been created !")

        return socket
    }
}