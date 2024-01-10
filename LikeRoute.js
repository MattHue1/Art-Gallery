import { ObjectId } from 'mongodb';
import express from 'express';

const router = express.Router();

router.put("/",addLike);
router.delete("/", removeLike);
router.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// like route
async function addLike(req, res){
    let data = req.body;
    console.log(data.art);
        let query = {"_id": new ObjectId(data.art)};
        let art = await req.app.locals.galleryCollection.findOne(query);
        let query1 = {"artId": new ObjectId(data.art), "from": req.session.user.username, "title": art.Title};
        let result = await req.app.locals.likeCollection.findOne(query1);
        if(art.Artist === req.session.user.username){
            res.status(500).send("You can't like your own art work!!");
            return ;
        }
        if(!result){
            let like = await req.app.locals.likeCollection.insertOne(query1);
            res.status(201).send("successFul");
        }else{
            res.status(500).send("You already like this art work!!");
        }
}

async function removeLike(req, res){
    let data = req.body;
    console.log(data.id);
        let query = {"_id": new ObjectId(data.id)};
        let art = await req.app.locals.likeCollection.deleteOne(query);
        if(art.acknowledged){
            res.status(201).send("successFul");
        }else{
            res.status(500).send("Error occur!!\n Please try again!!");
        }
   
}


export default router;