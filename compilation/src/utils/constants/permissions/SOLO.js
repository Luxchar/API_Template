"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLO = void 0;
const SOLO = (User) => {
    return {
        admin: {
            user_id: [],
            roles_id: []
        },
        view: {
            user_id: [User.user_id],
            roles_id: []
        },
        message: {
            send: {
                user_id: [User.user_id],
                roles_id: []
            },
            send_files: {
                user_id: [User.user_id],
                roles_id: []
            },
            mentions: {
                user_id: [User.user_id],
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
exports.SOLO = SOLO;
