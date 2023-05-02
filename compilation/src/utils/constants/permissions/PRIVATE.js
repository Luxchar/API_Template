"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIVATE = void 0;
const PRIVATE = (User, Friend) => {
    return {
        admin: {
            user_id: [],
            roles_id: []
        },
        view: {
            user_id: [User.user_id, Friend.user_id],
            roles_id: []
        },
        message: {
            send: {
                user_id: [User.user_id, Friend.user_id],
                roles_id: []
            },
            send_files: {
                user_id: [User.user_id, Friend.user_id],
                roles_id: []
            },
            mentions: {
                user_id: [User.user_id, Friend.user_id],
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
exports.PRIVATE = PRIVATE;
