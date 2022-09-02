const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/docs/');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
       // cb(null, Date.now() + ext);
        cb(null, file.originalname);
    }
});


let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        cb(null, true);
    },
    limits: {
        filesize: 1024 * 12024 * 2
    }
});
module.exports = upload;
