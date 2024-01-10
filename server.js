import express from 'express';
//import itemRoute from './itemsRoute.js';
const app = express();
import mongoose from "mongoose";
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import reviewRoute from './ReviewRoute.js';
import likeRoute from './LikeRoute.js';
import userRoute from './UserRoute.js';
import followRoute from './FollowRoute.js';
import galleryeRoute from './GalleryRoute.js';
import artistRoute from './ArtistRoute.js';
import workshopRoute from './WorkshopRoute.js';
const MongoDBStore = ConnectMongoDBSession(session);

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/a5',
    collection: 'sessiondata'
});

app.use(session({
    secret: 'some secret key here',
    resave: true,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    console.log(req.session);
    next();
});


app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "pug"); 

//print request send to server
app.use(function(req,res,next){
	console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	console.log(req.get("Content-Type"));
	next();
});

function checkUserSession(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized: User not logged in');
  }

  // If req.session.user is defined, proceed to the next middleware or route
  next();
}

// Main server
app.get("/", homePage);
app.get("/login", loginPage);
app.get("/createAcc", createAccPage);
app.get("/search", searchPage);
app.post("/search", search);
app.get("/addArt", addArtPage);
app.get("/addWorkshop", addWorkshopPage)

// routes
app.use("/review",checkUserSession, reviewRoute);
app.use("/like",checkUserSession, likeRoute);
app.use("/user", userRoute);
app.use("/gallery", galleryeRoute);
app.use("/artists", artistRoute);
app.use("/follow",checkUserSession, followRoute);
app.use("/workshop", workshopRoute);
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

//Main server
function addWorkshopPage(req,res){
    res.render("./addWorkshop");
}
function addArtPage(req,res){
    res.render("./addArt");
}

function homePage(req, res){
    res.render("./Home");
}

function loginPage(req, res){
    res.render("./login");
}

function createAccPage(req, res){
    res.render("./createAccount");
}

async function searchPage(req,res){
    let category = {};
    let medium = {};
    let arts = await app.locals.galleryCollection.find().toArray();

    //get different kind of category and medium
    for(let i in arts){
        medium[arts[i].Medium] = arts[i].Medium;
        category[arts[i].Category] = arts[i].Category;
    }
    console.log(medium);
    console.log(category);
    res.render("./search", {"mediums": medium, "categories": category});
}

async function search(req, res){
    let request = req.body;
    let page = req.query.page;
    if(request.type === "art"){
        const art = await req.app.locals.galleryCollection.find(request.search).toArray();
        let data = []
        if(art[0] != undefined){
            console.log((page+1)*3)
            for(let i = parseInt(page)*3; i < (parseInt(page)+1)*3 && i <  art.length; i++){
                data.push(art[i]);
                console.log(i);
            }
            console.log(data);
            res.status(200).json(data);
        }else{
            res.status(500).json(data);
        }
    }else{
        const workshop = await req.app.locals.workshopsCollection.find(request.search).toArray();
        let data = []
        if(workshop[0] != undefined){
            for(let i = page*3; i < (page)*3 + 3&& i <  workshop.length; i++){
                data.push(workshop[i]);
            }
            res.status(200).json(data);
        }else{
            res.status(500).json(data)
        }
    }
}

const databaseUrl = 'mongodb://localhost:27017/a5';

import { MongoClient, ObjectId } from "mongodb";

// uri - MongoDB deployment's connection 
const uri = "mongodb://127.0.0.1:27017/";
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);
let db = client.db("a5");
app.locals.galleryCollection = db.collection("gallery");
app.locals.userCollection = db.collection("user");
app.locals.reviewCollection = db.collection("review");
app.locals.artistCollection = db.collection("artist");
app.locals.likeCollection = db.collection("like");
app.locals.followCollection = db.collection("follow");
app.locals.workshopsCollection = db.collection("workshop");

async function run() {
	try {
		
	} finally {
		console.log("Server listening at http://localhost:3000");
		app.listen(3000);

	}
}
// Run the function and handle any errors
run().catch(console.dir);