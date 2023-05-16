import { UserCreate, UserConnect, UserGetOne, UserGetMany, UserFindByUsername, UserFindByToken, UserFindByID } from './users'

export * from './interface.database'

export default {
    users: {
        create: UserCreate,
        log: UserConnect,
        get: {
            one: UserGetOne,
        },
        find: {
            username: UserFindByUsername,
            token: UserFindByToken,
            id: UserFindByID,
            many: UserGetMany
        },
        connect: UserConnect
    }
}

