import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    fileName: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)

    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(new Error('Only JPEG, PNG, and JPG files are allowed'), false);
    }   
}

export const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024},
})