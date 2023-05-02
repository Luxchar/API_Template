import { setBearer } from "./bearer.utils"
import deleteSocket from "./delete.utils"
import { getSocketToken } from "./token.utils"
import verifySocket from "./verify.utils"

export const utils = {
    delete: deleteSocket,
    verify: verifySocket,
    get: {
        token: getSocketToken
    },
    set: {
        bearer: setBearer
    }
}