// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { players?: mongoDB.Collection } = {}

// Initialize Connection

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb+srv://bch4n:2rPBFZpzKiNiMhNI@cluster0.duecilj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            
    await client.connect();
        
    const db: mongoDB.Db = client.db("Pickelo");
   
    const playersCollection: mongoDB.Collection = db.collection("Players");
 
  collections.players = playersCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${playersCollection.collectionName}`);
 }