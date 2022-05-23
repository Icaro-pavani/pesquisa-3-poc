import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

await mongoClient.connect();

const db = mongoClient.db("pesquisa-3");

export default db;
