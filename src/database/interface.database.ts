import { FilterQuery, QueryOptions, QueryWithHelpers, Types } from "mongoose"
import { IUser, IUserModel } from "./models/User"

export interface IDatabase {
    users: {
        create: (user: IUser) => Promise<IUser>
        exist: (query: FilterQuery<IUser>, options?: QueryOptions) => Promise<boolean>
        log: (user: IUser) => Promise<IUser>
        get: {
            one: (query: FilterQuery<IUser>, options?: QueryOptions) => Promise<null | QueryWithHelpers<any, any>>
            all: (query: FilterQuery<IUser>, options?: QueryOptions) => Promise<null | QueryWithHelpers<any, any>>
        }
        find: {
            username: (username: string) => Promise<null | QueryWithHelpers<any, any>>
            token: (token: string) => Promise<null | QueryWithHelpers<any, any>>
            id: (ID: number) => Promise<(IUserModel & {_id: Types.ObjectId;}) | null>
        },
        connect: ({username, password} : {username: string, password: string}) => Promise<boolean>
    }
}