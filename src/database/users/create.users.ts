import User, {IUser} from "../models/User";
import Logger from "../../client/logger.client";

export async function UserCreate(user: IUser) {
    try {
        return User.create(user);
    }
    catch(err) {
        Logger.error(err);
    }
}