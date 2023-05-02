import Logger from "../../client/logger.client";
import { UserGetOne} from "./get.users";
import bcrypt from 'bcrypt';

export async function UserConnect({username, password} : {username: string, password: string}): Promise<boolean> {
    try {
        const userFound = await UserGetOne({ username })
        if (userFound ? 'password' in userFound : false) {
            if (await bcrypt.compare(password, userFound.password)) {
                return true;
            }
        }
    } catch (error) {
        Logger.error(error)
    }
    return false;
}