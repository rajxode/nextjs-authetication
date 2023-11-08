
// import mongoose
import mongoose from "mongoose";

// function to connect with Database
export async function  connect(){
    try {
        // connecting to DB
        mongoose.connect(process.env.MONGODB_URL!);
        // connection
        const connection = mongoose.connection;

        // if connection is successfull
        connection.on('connected',() => {
            console.log('MongoDB connected successfully');
        })
        // in case there is an error in connection
        connection.on('error', (err) => {
            console.log('Error in connecting to DB ' + err );
            process.exit();
        })
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}