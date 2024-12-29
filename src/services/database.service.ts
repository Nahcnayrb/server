// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

// Global Variables
export const collections: { players?: mongoDB.Collection, duels?: mongoDB.Collection} = {}

export let containerClient: ContainerClient; 
// Initialize Connection

const containerName = "pfps";


export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
 
  const playersCollection: mongoDB.Collection = db.collection(process.env.PLAYERS_COLLECTION_NAME as string);
  const duelsCollection: mongoDB.Collection = db.collection(process.env.DUELS_COLLECTION_NAME as string);

  collections.players = playersCollection;
  collections.duels = duelsCollection;

  // connect to blob storage here too
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING as string);
  containerClient = blobServiceClient.getContainerClient(containerName);
  const exists = await containerClient.exists();

  // const blobClient = containerClient.getBlobClient('0353.jpg');
  // const exists = await blobClient.exists();

  // const response = await blobClient.download(0);
  // const contentType = response.contentType || 'image/jpeg';

  console.log(`successfully connected to pfp blob storage: ${exists}`);

  console.log(`Successfully connected to database: ${db.databaseName} and collections: ${playersCollection.collectionName} and ${duelsCollection.collectionName}`);
}