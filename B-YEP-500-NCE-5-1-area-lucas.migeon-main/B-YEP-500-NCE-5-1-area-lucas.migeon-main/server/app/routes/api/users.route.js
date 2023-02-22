const router = require('express').Router();
const jwt_decode = require('jwt-decode');
const manApi = require('../../services/auth0_management.service');

router.post('/', (req, res) => {
    manApi.createUser(req.body).then((user) => {
        res.json('ok');
    }).catch((err) => {
        res.status(400).json('ko');
    });
});

router.get('/', (req, res) => {
    manApi.listUsers().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.status(400).json('ko');
    });
});

router.put('/', (req, res) => {
    const addRole = manApi.roles[req.body['role']];
    const delRole = manApi.roles[req.body['role'] == 'god' ? 'plebs' : 'god'];
    const user = req.body['user'];

    if (addRole == null || user == null) res.status(400).json('ko');

    manApi.deleteUserRole(user, delRole).then((_) => {
        manApi.addUserRole(user, addRole).then((_) => {
            res.json('ok');
        }).catch((err) => {
            res.status(400).json('ko');
        });
    }).catch((err) => {
        res.status(400).json('ko');
    });
});

router.delete('/:userId', (req, res) => {
    manApi.deleteUser(req.params.userId).then((_) => {
        res.json('ok');
    }).catch((err) => {
        res.status(400).json('ko');
    });
});

module.exports = router;