import mongoose, {Document, Schema} from "mongoose";

export interface User {
    user_id: string; // the user id is a unique name that is used to identify the user
    token: string;

    username: string; // the username is the name that is displayed to the user
    password: string; // the password is the password that is used to login
}

export interface UserDocument extends User, Document {}

const UserSchema = new Schema({
    user_id: {type: String, required: true, unique: true},
    token: {type: String, required: true},

    username: {type: String, required: true},
    password: {type: String, required: true},
});

export default mongoose.model<UserDocument>("User", UserSchema);