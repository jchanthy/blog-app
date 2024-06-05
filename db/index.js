import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}>@cluster0.dmbxrtn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

async function connectToDb() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}

connectToDb().catch(console.dir);

export default connectToDb;