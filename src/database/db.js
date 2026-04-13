import mongoose from "mongoose";

// Database name
const dbName = "idg-03";

// MongoDB URL (using Docker service name "cadt-db")
const dbUrl = `mongodb://cadt-db:27017/${dbName}`;

export async function dbConnect() {

    try {
        // Event: when MongoDB connects successfully
        mongoose.connection.on("connected", () => {
            console.log(`Connected to MongoDB at ${dbUrl}`);
        });

        // Event: when MongoDB connection error happens
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

        // Connect to MongoDB
        await mongoose.connect(dbUrl, {
            dbName
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // stop app if DB fails
    }
}