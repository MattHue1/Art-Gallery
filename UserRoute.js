import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.get("/", profile);
router.put("/", user);
router.post("/", checkUserLogin, addUser);
router.post("/logout", logout)
router.put("/change",checkUserSession, typeChange);
router.use((req, res, next) => {
  res.status(404).send('Not Found');
});

function checkUserSession(req, res, next) {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized: User not logged in');
    }
    next();
}

function checkUserLogin(req, res, next) {
  if (req.session.user) {
        return res.status(401).send('Unauthorized: User is already logged in');
    }
    next();
}

//User Route
async function typeChange(req, res){
        if(req.session.user.type === "artist"){
            console.log(1)
            let query = {"username": req.session.user.username}
            let result = await req.app.locals.userCollection.updateOne(query, {$set:{"type": "patrons"}})
            if(result.modifiedCount === 1){
                req.session.user.type = "patrons";
                res.status(201).send("successful");
            }else{
                res.status(500).send("failed");
            }
        }else{
            let query = {"Artist": req.session.user.username}
            let result = await req.app.locals.galleryCollection.findOne(query);
            if(result != undefined){
                let query1 = {"username": req.session.user.username};
                let result = await req.app.locals.userCollection.updateOne(query1, {$set: {"type": "artist"}});
                if(result.modifiedCount === 1){ 
                    req.session.user.type = "artist";
                    res.status(201).send("sucess");
                }else{
                    res.status(500).send("failed");
                }
            }else{
                res.status(500).send("sucess");
            }
        }
    
}

//user route

async function profile(req, res){
    if(req.session.user == undefined){
        let review = {};
        let result = {"username": "Not avilable", "type": "Not avilable", "follow": {}};
        res.status(201).render("./user", {"user":result, "reviews": review, "artists": {}, "likes": {}});
    }else{
        let user = await req.app.locals.userCollection.findOne({"username": req.session.user.username});
        let review = await req.app.locals.reviewCollection.find({"from": req.session.user.username}).toArray();
        let artists = await req.app.locals.followCollection.find({"from": req.session.user.username}).toArray();
        let likes = await req.app.locals.likeCollection.find({"from": req.session.user.username}).toArray();
        if(user){
                res.status(201).render("./user", {"user":user, "reviews": review, "artists": artists, "likes": likes});
        }else{
            res.status(500).send("Error: Page does not exist!!");
        }
    }
}


async function logout(req, res){
    if(req.session.user == undefined){
        res.status(500).send("You are not login!!!");
    }else{
        req.session.user = undefined;
        req.session.save();
        res.status(201).send("You have logged out");
    }
}

async function user(req, res){
    let data = {"pValid": false, "uValid": false, "id": undefined, 'login': false};
    if(req.session.user != undefined){
        data.login = true;
        res.status(500).json(data);
    }else{
        let user = req.body.username;
        let pass = req.body.password;
        let query = {"username": user}
        let result = await req.app.locals.userCollection.findOne(query);

        if(result){
            data["uValid"] == true;
            if(result.password === pass){
                data["pValid"] == true;
                data.login = true;
                data["id"] = result._id;
                req.session.user = result;
                req.session.save();
                res.status(201).json(data);
            }
        }else{
            res.status(500).json(data);
        }
    }
}

async function addUser(req, res){
    let user = req.body.username;
    let pass = req.body.password;
    let result = await req.app.locals.userCollection.findOne({"username": user});
    if(result){
        res.status(500).send("User already exist!!");
    }else{
        if(req.session.user != undefined){
            res.status(500).send("You are currently login to a account!!");
        }else{
            req.session.save();
            let newUser = await req.app.locals.userCollection.insertOne({"username": user, "password": pass, "type": "patrons"});
            req.session.user = {"username": user, "password": pass, "type": "patrons"};
            res.status(201).json({"id": new ObjectId(newUser.insertedId)})
        }
    }
}


export default router;