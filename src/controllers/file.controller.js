import fileModel from "../models/file.model.js";

export const uploadSingleFile = async (req,res) =>{
     const file = req.file;

     const newFile = new fileModel(
        file
     );
     await newFile.save();
     res.json(file);
}

export const uploadMultipleFiles = async (req,res) =>{
    const files = req.files;
    const newFiles = files.map(file => new fileModel(file));
    await fileModel.insertMany(newFiles);
    res.json(files);
}

export const getFileById = async (req,res) =>{
    const fileId = req.params.id;
    const file = await fileModel.findById(fileId);
    const fileStream = await minioClient.getObject(file.bucket, file.filename);
   res.set({
        'Content-Type': file.mimetype,
        'Content-Disposition': `attachment; filename="${file.originalName}"`
   });
    return fileStream.pipe(res);
}