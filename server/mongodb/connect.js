import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log("Error occured while connecting to mongodb", err);
    });
}

export default connectDB;