// const cloudinary = require('../utils/cloudinary');
// const crypto = require('crypto')
// const path = require('path')
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
//
// const multer = require('multer');
//
// module.exports = multer
// //
// // const storage = new CloudinaryStorage({
// //     //cloudinary: cloudinary,
// //     folder: 'discovery',
// //     allowedFormats: ['jpeg' , 'jpg', 'png' , 'pdf'],
// //     filename: async (req, file , cb) => {
// //         let buf = crypto.randomBytes(16);
// //         buf = buf.toString('hex')
// //         let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png|\.pdf/ig , '')
// //         uniqFileName += buf;
// //         cb(undefined === uniqFileName)
// //     },
// //     public_id: (req, file) => 'computed-filename-using-request',
// //
// // });
// //
// // const parser = multer({ storage: storage });
