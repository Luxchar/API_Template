"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROUP = void 0;
const GROUP = (User, Friend_1, Friend_2) => {
    return {
        admin: {
            user_id: [],
            roles_id: []
        },
        view: {
            user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
            roles_id: []
        },
        message: {
            send: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            },
            send_files: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            },
            mentions: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            }
        },
        member: {
            invite: {
                user_id: [User.user_id, Friend_1.user_id, Friend_2.user_id],
                roles_id: []
            },
            remove: {
                user_id: [],
                roles_id: []
            }
        }
    };
};
exports.GROUP = GROUP;
