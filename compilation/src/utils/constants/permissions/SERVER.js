"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER = void 0;
const SERVER = (User) => {
    return {
        admin: {
            user_id: [],
            roles_id: []
        },
        view: {
            user_id: [],
            roles_id: []
        },
        message: {
            send: {
                user_id: [],
                roles_id: []
            },
            send_files: {
                user_id: [],
                roles_id: []
            },
            mentions: {
                user_id: [],
                roles_id: []
            }
        },
        member: {
            invite: {
                user_id: [],
                roles_id: []
            },
            remove: {
                user_id: [],
                roles_id: []
            }
        }
    };
};
exports.SERVER = SERVER;
