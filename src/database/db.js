import mongoose from "mongoose";


const dbName = "idg-03";
const dbUrl = `mongodb://cadt-db:27017/${dbName}`;

export async function dbConnect(){

    mongoose.connection.on("connected" , () => {
        console.log(`Connected to MongoDB at ${dbUrl}`);
    })

    await mongoose.connect(dbUrl, {
        dbName
    })
}