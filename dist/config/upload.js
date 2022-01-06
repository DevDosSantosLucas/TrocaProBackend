"use strict";
// import multer from 'multer';
// import path from 'path';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default {
//   storage: multer.diskStorage({
//     destination: path.join(__dirname, '..', '..', 'uploads'),
//     //função de callback é dar um nome para o arquivo, 
//     //para que evita uma sob escriva de arquivos
//     filename: (request, file, cb) => { 
//       const fileName = `${Date.now()}-${file.originalname}`;
//       cb(null, fileName);
//     },
//   })
// }
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.default.join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const mimeTypes = [
            'image/jpeg',
            'image/png'
        ];
        if (!mimeTypes.includes(file.mimetype)) {
            return cb(null, false);
        }
        cb(null, true);
    },
};
