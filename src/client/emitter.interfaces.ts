import { IUserModel } from "../database/models/User";
import { Types } from "mongoose";

export interface Friend extends IUserModel  {
    _id: Types.ObjectId;
} 

export interface User extends IUserModel {}

export interface UserReady {
    user: User;
}

export interface FriendAdd {
    user: User;
    friend: Friend;
}

export interface FriendRemove {
    user: User;
    friend: Friend;
}

export interface PresenceUpdate {
    user: User;
}

export interface UserUpdate {
    user: User;
}

export interface VoiceStateUpdate {
    user: User;
}
