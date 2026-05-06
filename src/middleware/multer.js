import multer from "multer";
import {Client} from 'minio';
import {MinioStorageEngine} from '@namatery/multer-minio';
import { use } from "react";


const minioClient = new Client({
    port: 9000,
    endPoint: file_server,
    accessKey: process.env.MINIO_ROOT_USER,
    secretKey: process.env.MINIO_ROOT_PASSWORD,
    useSSL: false,
});
const options = {
    path: '/',
    region: 'us-east-1',
    bucket: {
        init: true,
        versioning: false,
        forceDelete: false,
    },
    object: {
        name: (req, file) => {
            return `${Date.now()}-${file.originalname}`;
        },
        useOriginalFilename: false,
    },
};
const storage = new MinioStorageEngine(minioClient, 'cadt-file',options);

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    }
}).single("files")

export const uploads = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024, // 5MB
    }
}).array("files", 10)