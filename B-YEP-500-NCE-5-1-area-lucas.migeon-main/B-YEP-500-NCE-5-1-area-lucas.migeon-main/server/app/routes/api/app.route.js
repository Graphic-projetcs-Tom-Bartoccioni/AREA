const router = require('express').Router();
const db = require('../../models');
const jwt_decode = require('jwt-decode');

router.post('/', (req, res) => {
    const userId = jwt_decode(req.headers['authorization'].substring(7))['sub'];
    console.log(req.body);

    db.mongo.user.findOne({ userId: new RegExp('^' + userId + '$', 'i') })
        .exec((err, doc) => {
            if (err) return () => {
                res.status(400).json('ko');
                return;
            }
            if (doc === null) {
                doc = new db.mongo.user({ userId });
            }
            req.body.userId = userId;
            db.mongo.data.create(req.body, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(400).json('ko');
                    return;
                }

                doc.area.push(data._id);
                doc.save((err, _) => {
                    if (err) {
                        res.status(400).json('ko');
                        return;
                    }
                    res.json('ok');
                });
            });
        });
});

router.get('/', (req, res) => {
    const userId = jwt_decode(req.headers['authorization'].substring(7))['sub'];

    db.mongo.user.findOne({ userId: new RegExp('^' + userId + '$', "i") })
        .exec((err, doc) => {
            if (err) return () => {
                res.status(400).send('ko');
                return;
            }

            if (doc === null) {
                res.json([]);
            }
            else {
                db.mongo.data.find({
                    '_id': {
                        $in: doc.area
                    }
                })
                    .exec((err, data) => {
                        if (err) return () => {
                            res.status(400).json('ko');
                            return;
                        }
                        res.json(data);
                    });
            }
        });
});

router.delete('/:title', (req, res) => {
    const userId = jwt_decode(req.headers['authorization'].substring(7))['sub'];

    db.mongo.user.findOne({ userId: new RegExp('^' + userId + '$', "i") })
        .exec((err, doc) => {
            if (err) return () => {
                res.status(400).json('ko');
                return;
            }

            if (doc === null) {
                res.json([]);
            }
            else {
                db.mongo.data.deleteOne({
                    '_id': {
                        $in: doc.area
                    }
                }).where('title').equals(req.params.title)
                    .exec((err, data) => {
                        if (err) return () => {
                            res.status(400).json('ko');
                            return;
                        }

                        res.json('ok');
                    });
            }
        });
});

module.exports = router;