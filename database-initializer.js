import gallery from './gallery.json'assert { type: 'json' };;
let temp = {};
let user = [];
let artists = [];



import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017/";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect to the "a5" database and access its "gallery" collection
    const database = client.db("a5");
    const galleryCollection = database.collection("gallery");
    const userCollection = database.collection("user");
    const reviewCollection = database.collection("review");
    const artistCollection = database.collection("artist");
    const likeCollection = database.collection("like");
    const workshopCollection = database.collection("workshop");
    const followCollection = database.collection("follow");
    const sessionCollection = database.collection("sessiondata");

    const resultG1 = await galleryCollection.drop();
    const resultU1 = await userCollection.drop();
    const resultR1 = await reviewCollection.drop();
    const resultA1 = await artistCollection.drop();
    const resultL1 = await likeCollection.drop();
    const resultW1 = await workshopCollection.drop();
    const resultF1 = await followCollection.drop();
    const resultS1 = await sessionCollection.drop();

    if(resultL1){
      console.log("like collection has been dropped.")
    }
    if(resultG1){
      console.log("Gallery collection has been dropped.")
    }
    if(resultU1){
      console.log("User collection has been dropped.")
    }
    if(resultR1){
      console.log("Review collection has been dropped.")
    }
    if(resultA1){
      console.log("Artist collection has been dropped.")
    }
    if(resultW1){
      console.log("Workshop collection has been dropped.")
    }
      
    initGallery();

    // Insert the defined document into the "cards" collection
    const resultG = await galleryCollection.insertMany(gallery);
    const resultA = await artistCollection.insertMany(artists);
    const resultU = await userCollection.insertMany(user);

    console.log("Successfuly inserted " + resultG.insertedCount + " art.");
    console.log("Successfuly inserted " + resultA.insertedCount + " artist.");
    console.log("Successfuly inserted " + resultU.insertedCount + " users.");
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Run the function and handle any errors
run().catch(console.dir);

//Init like and reviews for gallery
function initGallery(){
  for(let art in gallery){
    let name = gallery[art].Artist;
    temp[name] = name;
  }

  for(let artist in temp){
    artists.push({"name": artist});
    user.push({"username": artist, "password": "artist", "type": "artist"})
  }
  
}