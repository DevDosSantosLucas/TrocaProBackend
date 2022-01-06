"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(user) {
        return {
            user_id: user.user_id,
            name: user.name,
            city: user.city,
            uf: user.uf,
            // whatsapp: `https://api.whatsapp.com/send?phone=${user.whatsapp}`,
            whatsapp: user.whatsapp,
            // avatar: `http://192.168.15.7:3333/uploads/${user.avatar}`,
            // avatar: `http://192.168.15.10:3333/uploads/1.png`,
            avatar: user.avatar
        };
    },
};
