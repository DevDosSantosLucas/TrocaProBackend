// import multer from 'multer';
// import path from 'path';

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


import multer, { Options } from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
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
} as Options;