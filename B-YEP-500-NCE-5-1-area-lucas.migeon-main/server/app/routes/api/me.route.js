const router = require('express').Router();
const db = require('../../models');
const jwt_decode = require('jwt-decode');

router.post('/', (req, res) => {
    const userId = jwt_decode(req.headers['authorization'].substring(7))['sub'];
    
    db.mongo.user.findOne({ userId: new RegExp('^' + userId + '$', 'i') }, (err, doc) => {
        if (err) return () => {
            console.error("KO", err);
            res.status(500);
            return;
        }
        if (doc === null) {
            doc = new db.mongo.user({ userId });
        }

        console.log(req.body);
        db.mongo.data.create(req.body, (err, data) => {
            if (err) {
                console.error(err);
                res.status(422).send(err);
                return;
            }
            
            doc.area.push(data._id);
            doc.save((err, _) => {
                if (err) {
                    console.error(err);
                    res.status(422).send(err);
                    return;
                }
                console.log("done");
                res.status(200);
            });
        });
    });
});

router.get('/', (req, res) => {
    const userId = jwt_decode(req.headers['authorization'].substring(7))['sub'];
    
    db.mongo.user.findOne({ userId: new RegExp('^' + userId + '$', "i") }, (err, doc) => {
        if (err) return () => {
            console.error("KO", err);
            res.status(500);
            return;
        }

        console.log("OK", doc);
        if (doc === null) {
            res.json("[]");
        }
        else {
            res.send(doc.area);
        }
    });
});

module.exports = router;