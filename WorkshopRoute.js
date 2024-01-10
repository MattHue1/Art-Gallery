import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.get("/:workshopId", workshop);
router.get("/", workshopList);
router.post("/",checkUserSession, addWorkshop);
router.put("/",checkUserSession, enroll);
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
async function workshopList(req, res){
    let result = await req.app.locals.workshopsCollection.find().toArray();
    res.render("./workshopList", {"workshops":result});
}

async function workshop(req, res){
    try{let query = {"_id": new ObjectId(req.params.workshopId)}
    let result = await req.app.locals.workshopsCollection.findOne(query);
    res.render("./workshop", {"workshop":result});}catch{
        res.status(404).send('Not Found');
    }
}


async function enroll(req, res){
    let query = {"_id": new ObjectId(req.body.workshop)};
    let result1 = await req.app.locals.workshopsCollection.findOne(query);
    if(result1.artist === req.session.user.username){
        res.status(500).send("You can't enroll in your own workshop!!");
        return ;
    }
    let updateData = {$push: {"students": {"name": req.session.user.username}}};
    let result = await req.app.locals.workshopsCollection.updateOne(query, updateData);
    if(result.acknowledged){
        res.status(201).send("You have succesfully enroll into the workshop!!");
    }else{
        res.status(500).send("Error has occur!\n Please try again!!");
    }
}

async function addWorkshop(req, res){
    let data = req.body;
    data.artist = req.session.user.username;
    data.students = [];
    let result = await req.app.locals.workshopsCollection.insertOne(data);
    if(result.acknowledged){
        let query = {"name": data.artist};
        let updateData = {$push: {notification: {"type": "workshop", "id": result.insertedId}}};
        await req.app.locals.followCollection.updateMany(query, updateData);
        console.log("id: " + result.insertedId)
        res.status(201).send(result.insertedId);
    }else{
        res.status(500).send("Error has occur!\n Please try again!!");
    }
}


export default router;