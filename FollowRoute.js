import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.put("/", addFollow);
router.delete("/", deleteFollow);
router.use((req, res, next) => {
  res.status(404).send('Not Found');
});


//Follow route
async function addFollow(req, res){
        let artist = req.body.artist;
        let result = await req.app.locals.artistCollection.findOne({"_id": new ObjectId(artist)});
        let query1 = {"artist": new ObjectId(artist), "from": req.session.user.username, "name": result.name};
        let result1 = await req.app.locals.followCollection.findOne(query1);
        if(!result1){
            query1.notification = [];
            let result1 = await req.app.locals.followCollection.insertOne(query1);        
            if(result1.acknowledged){
                res.status(201).send("You have succesfully follow this artist!");
            }else{
                res.status(500).send("Please try again!");
            }
        }else{
            res.status(500).send("You have follow this artist already!");
        }
}

async function deleteFollow(req, res){
    let artist = req.body.id;
    let query = {"_id": new ObjectId(artist), "from": req.session.user.username}
    let result = await req.app.locals.followCollection.deleteOne(query);
    if(result.deletedCount >0){
        res.status(201).send("You have succesfully unfollow this artist!");
    }else{
        res.status(500).send("failed");
    }
}

export default router;