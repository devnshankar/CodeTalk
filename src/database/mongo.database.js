import mongoose from 'mongoose';

export const mongoConnect  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(
            () => {
                console.log("Connect to Mongo DB Successfully")
            }
        )
    } catch (error) {
        console.log(error)
    }
}