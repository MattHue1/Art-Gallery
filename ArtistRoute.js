import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.get("/:artistId", artist);
router.get("/", artistList);
router.use((req, res, next) => {
  res.status(404).send('Not Found');
});


//Artist route
async function artistList(req, res){
    let result = await req.app.locals.artistCollection.find().toArray();
    console.log(result)
    res.render("./artistList", {"artists":result});
}

async function artist(req, res){
    try{
        let query = {"_id": new ObjectId(req.params.artistId)}
        let result = await req.app.locals.artistCollection.findOne(query);
        console.log(result)
        query = {"Artist": result.name}
        let result2 = await req.app.locals.galleryCollection.find(query).toArray();
        query = {"artist": result.name}
        let workshops = await req.app.locals.workshopsCollection.find(query).toArray();
        res.render("./artist", {"artist":result, "arts":  result2, "workshops": workshops});
    }catch{
        res.status(404).send('Not Found');
    }
}

export default router;