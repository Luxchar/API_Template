import { PASSWORD } from "./PASSWORD";
import { PROFILE_PICTURE } from "./PROFILE_PICTURE";
import { TOKEN } from "./TOKEN";
import { USERNAME } from "./USERNAME";
import { ID } from "./ID";
export class USER_PROPERTIES {
    static PASSWORD = PASSWORD;
    static USERNAME = USERNAME;
    static TOKEN = TOKEN;
    static PROFILE_PICTURE = PROFILE_PICTURE;
    static ID = ID;
    static MAX_SERVERS = 100;
    static CHANNELS = {
        MAX_LENGTH: 100,
        MIN_LENGTH: 0
    };
    static SERVERS = {
        MAX_LENGTH: 100,
        MIN_LENGTH: 0
    }
    static STATUS = ["online", "idle", "dnd", "offline"]
}

