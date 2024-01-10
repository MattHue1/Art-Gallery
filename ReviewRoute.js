import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.put("/", addReview);
router.delete("/", deleteReview);
router.use((req, res, next) => {
  res.status(404).send('Not Found');
});

//review route
async function deleteReview(req, res){
    let id = req.body;
    console.log(id);
    let query = {"_id": new ObjectId(id)};
    let result = await req.app.locals.reviewCollection.deleteOne(query);
    console.log(result);
    if(result.acknowledged){
        console.log("success");
        res.status(201).send("successdul");
    }else{
        console.log("failed");
        res.status(500);
    }
}

async function addReview(req, res){
    let data = req.body;
        data.from = req.session.user.username;
        console.log(data);
        let art = await req.app.locals.galleryCollection.findOne({"_id": new ObjectId(data.art)});
        console.log(art)
        if(art.Artist === req.session.user.username){
            res.status(500).send("You can't like your own art work!!");
            return ;
        }
        let result = await req.app.locals.reviewCollection.insertOne(data);
        if(result.acknowledged){
            console.log("success");
            res.status(201).send("successdul");
        }else{
            console.log("failed on submitting reviews");
            res.status(500);
        }

}


export default router;