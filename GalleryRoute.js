import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.get("/:artId", art);
router.get("/", artList);
router.post("/",checkUserSession, addGallery);
router.use((req, res, next) => {
  res.status(404).send('Not Found');
});

function checkUserSession(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized: User not logged in');
    }
    next();
}

//Art route
async function artList(req, res){
    let result = await req.app.locals.galleryCollection.find().toArray();
    res.render("./artList", {"arts":result});
}

async function art(req, res){
    try{
        let query = {"_id": new ObjectId(req.params.artId)}
        let art = await req.app.locals.galleryCollection.findOne(query);
        let query1 = {"art": art._id.toString()};
        let reviews = await req.app.locals.reviewCollection.find(query1).toArray();
        let query2 = {"name": art.Artist};
        let artist = await req.app.locals.artistCollection.findOne(query2);
        let query3 = {"artId": art._id};
        let like = await req.app.locals.likeCollection.find(query3).toArray();
        res.render("./art", {"art":art, "reviews":  reviews, "artist": artist._id, "like": like.length});
    }catch{
        res.status(404).send('Not Found');
    }
   
}


async function addGallery(req, res){
    let data = req.body;
    let query = {"Title": data.Title};
    const title = await req.app.locals.galleryCollection.findOne(query);
    if(title != undefined){
        res.status(500).send("There exist a artwork that share the same title");
        return;
    }
    data.Artist = req.session.user.username;
    query = data
    let result = await req.app.locals.galleryCollection.insertOne(query);
    if(result.acknowledged){
        let query1 = {"name": req.session.user.username};
        const artist1 = await req.app.locals.artistCollection.findOne(query1);
        if(!artist1){
            let artist = await req.app.locals.artistCollection.insertOne(query1);
        }
        //add to notifcation to those that follow the artist
        let updateData = {$push: {"notification": {"type": "art", "id": result.insertedId}}};
        query1 = {"name": req.session.user.username};
        let result2 = await req.app.locals.followCollection.updateMany(query1, updateData);
        console.log(result2)
        console.log("id: " + result.insertedId)
        res.status(201).send(result.insertedId);
    }else{
        res.status(500).send("Error has occur!\n Please try again!!");
    }
}


export default router;