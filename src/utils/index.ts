import { BASE16, BASE36, BASE58, BASE8 } from "./base"
import { CONSTANTS } from "./constants"
import { FUNCTIONS } from "./functions"
export default class UTILS {
    static CONSTANTS = CONSTANTS
    static FUNCTIONS = FUNCTIONS
    static BASE = {
        16: BASE16,
        8: BASE8,
        58: BASE58,
        36: BASE36
    }
}