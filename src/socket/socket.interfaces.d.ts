import { IChannelModel } from "../database/models/Channel";
import { IServerModel } from "../database/models/Server";
import { IUserModel } from "../database/models/User";

export interface ISocketUser extends IUserModel {
    channels: Array<IChannelModel>;
    servers: Array<IServerModel>
}

export interface ISocketUsers {
    [key: string]: ISocketUser;
}
