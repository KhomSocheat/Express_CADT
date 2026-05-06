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